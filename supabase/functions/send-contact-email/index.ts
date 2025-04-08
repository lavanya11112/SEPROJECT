
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { name, email, subject, message }: ContactFormData = await req.json();
    const adminEmail = 'nikhithamamillapalli99@gmail.com'; // Fixed admin email address
    
    // Store contact message in Supabase database
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        { 
          name, 
          email, 
          subject, 
          message,
          admin_email: adminEmail
        }
      ]);
    
    if (error) {
      console.error("Error storing contact message:", error);
      throw error;
    }
    
    console.log("Contact message stored successfully");

    // Send notification email to admin
    try {
      const client = new SmtpClient();
      
      // Log SMTP configuration for debugging
      console.log("Connecting to SMTP with:", {
        hostname: "smtp.gmail.com",
        port: 465,
        username: Deno.env.get("SMTP_USERNAME") ? "SMTP_USERNAME is set" : "SMTP_USERNAME is NOT set",
        password: Deno.env.get("SMTP_PASSWORD") ? "SMTP_PASSWORD is set" : "SMTP_PASSWORD is NOT set",
      });
      
      await client.connectTLS({
        hostname: "smtp.gmail.com",
        port: 465,
        username: Deno.env.get("SMTP_USERNAME") || "",
        password: Deno.env.get("SMTP_PASSWORD") || "",
      });
      
      const emailContent = `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-line;">${message}</p>
      `;
      
      await client.send({
        from: Deno.env.get("SMTP_USERNAME") || "noreply@flavoursofindia.com", 
        to: adminEmail,
        subject: `New Contact Form: ${subject}`,
        content: emailContent,
        html: emailContent,
      });
      
      await client.close();
      console.log("Email notification sent to admin successfully");
    } catch (emailError) {
      // Log the detailed error for debugging
      console.error("Error sending email notification:", emailError);
      console.error("Error details:", JSON.stringify(emailError, null, 2));
      // Don't throw here - we still want to return success for storing the message
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Contact message received successfully" 
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  } catch (error) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  }
});
