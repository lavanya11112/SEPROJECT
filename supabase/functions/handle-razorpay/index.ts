
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Razorpay from 'npm:razorpay@2.9.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, type, planId, userId, maxRetries } = await req.json()

    // Initialize Razorpay with environment variables
    const razorpay = new Razorpay({
      key_id: Deno.env.get('RAZORPAY_KEY_ID') || 'rzp_test_BHwVxgnFNSfosE', // Fallback to test key
      key_secret: Deno.env.get('RAZORPAY_KEY_SECRET') || 'secret_placeholder', // Fallback - replace with actual test secret in production
    })

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      payment_capture: 1,
      notes: {
        type,
        planId,
        userId,
      },
    })

    console.log("Razorpay order created:", order.id)

    // Create payment record
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        razorpay_order_id: order.id,
        amount: amount,
        payment_type: type,
        metadata: { planId },
      })

    if (paymentError) {
      console.error("Error inserting payment record:", paymentError)
      throw paymentError
    }

    console.log("Payment record created in database")

    return new Response(
      JSON.stringify({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error("Error in handle-razorpay:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
