
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Razorpay } from 'npm:razorpay'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const razorpay = new Razorpay({
  key_id: Deno.env.get('RAZORPAY_KEY_ID')!,
  key_secret: Deno.env.get('RAZORPAY_KEY_SECRET')!,
})

const MAX_RETRIES = 3;
const RETRY_INTERVALS = [5, 15, 30]; // minutes

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const signature = req.headers.get('x-razorpay-signature');
    if (!signature) throw new Error('No signature found');

    const body = await req.text();
    const isValid = razorpay.webhooks.verifyWebhookSignature(
      body,
      signature,
      Deno.env.get('RAZORPAY_WEBHOOK_SECRET')!
    );

    if (!isValid) throw new Error('Invalid signature');

    const event = JSON.parse(body);
    const paymentId = event.payload.payment?.entity?.id;
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    switch (event.event) {
      case 'payment.captured':
        await supabase
          .from('payments')
          .update({ 
            status: 'completed',
            razorpay_payment_id: paymentId,
            updated_at: new Date().toISOString()
          })
          .eq('razorpay_order_id', event.payload.payment.entity.order_id);
        break;

      case 'payment.failed':
        const { data: payment } = await supabase
          .from('payments')
          .select('*')
          .eq('razorpay_order_id', event.payload.payment.entity.order_id)
          .single();

        if (!payment) throw new Error('Payment not found');

        // Check if we should retry
        if ((payment.metadata?.retry_count || 0) < MAX_RETRIES) {
          const retryCount = (payment.metadata?.retry_count || 0) + 1;
          const retryAfter = new Date();
          retryAfter.setMinutes(retryAfter.getMinutes() + RETRY_INTERVALS[retryCount - 1]);

          // Schedule retry by updating metadata
          await supabase
            .from('payments')
            .update({
              status: 'processing',
              metadata: {
                ...payment.metadata,
                retry_count: retryCount,
                retry_after: retryAfter.toISOString()
              },
              updated_at: new Date().toISOString()
            })
            .eq('id', payment.id);

          // Create new payment order for retry
          const order = await razorpay.orders.create({
            amount: payment.amount * 100, // Convert to paise
            currency: payment.currency,
            payment_capture: 1,
            notes: {
              original_payment_id: payment.id,
              retry_count: retryCount
            }
          });

          await supabase
            .from('payments')
            .update({ 
              razorpay_order_id: order.id,
              updated_at: new Date().toISOString()
            })
            .eq('id', payment.id);
        } else {
          // Mark as failed if max retries reached
          await supabase
            .from('payments')
            .update({ 
              status: 'failed',
              updated_at: new Date().toISOString()
            })
            .eq('id', payment.id);
        }
        break;
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});
