import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface RegistrationRequest {
  fullName: string;
  age: number;
  email: string;
  lessonTitle: string;
  lessonLanguage: string;
  lessonLevel: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { fullName, age, email, lessonTitle, lessonLanguage, lessonLevel }: RegistrationRequest = await req.json();

    // Validate inputs
    if (!fullName || !age || !email || !lessonTitle) {
      throw new Error("Missing required fields");
    }

    if (fullName.length > 100 || email.length > 255) {
      throw new Error("Input too long");
    }

    if (age < 14 || age > 100) {
      throw new Error("Invalid age");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    console.log(`New registration: ${fullName} (${age}) - ${email} for ${lessonTitle}`);

    const emailResponse = await resend.emails.send({
      from: "Uncode Society <onboarding@resend.dev>",
      to: ["w_draijer08@outlook.com"],
      subject: `Nieuwe Aanmelding: ${fullName} - ${lessonTitle}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="color: #1e293b; font-size: 24px; margin-bottom: 24px;">Nieuwe Les Aanmelding</h1>
          
          <div style="background: #f0f9ff; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <h2 style="color: #0ea5e9; font-size: 18px; margin: 0 0 16px 0;">Deelnemer Informatie</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Naam:</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: 600; font-size: 14px;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Leeftijd:</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: 600; font-size: 14px;">${age} jaar</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">E-mail:</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: 600; font-size: 14px;">${email}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #f0f9ff; border-radius: 12px; padding: 24px;">
            <h2 style="color: #0ea5e9; font-size: 18px; margin: 0 0 16px 0;">Les Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Les:</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: 600; font-size: 14px;">${lessonTitle}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Taal:</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: 600; font-size: 14px;">${lessonLanguage}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Niveau:</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: 600; font-size: 14px;">${lessonLevel}</td>
              </tr>
            </table>
          </div>
          
          <p style="color: #94a3b8; font-size: 12px; margin-top: 24px; text-align: center;">
            Dit bericht is automatisch verstuurd via Uncode Society.
          </p>
        </div>
      `,
    });

    console.log("Registration email sent:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-registration-email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
