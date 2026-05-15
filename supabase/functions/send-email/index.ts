// @ts-nocheck
/// <reference lib="deno.ns" />
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// --- TYPES ---
interface WebhookPayload {
  record: {
    id?: string;
    name?: string;
    email?: string;
    message?: string;
    start_time?: string;
    duration?: number;
    notes?: string;
  };
  table: string;
  type: string;
}

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || 'syedali.as888@gmail.com'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const payload: WebhookPayload = await req.json().catch(() => null)
    
    if (!payload || !payload.record) {
      return new Response(JSON.stringify({ message: 'Skipping: No record' }), { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      })
    }

    const { record, table, type } = payload

    // Only process new inserts
    if (type !== 'INSERT') {
      return new Response(JSON.stringify({ message: 'Skipping: Not an INSERT' }), { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      })
    }

    let subject = ''
    let html = ''

    if (table === 'contact_messages') {
      subject = `🔥 New Lead: ${record.name || 'Anonymous'}`
      html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #00F5FF;">New Contact Form Submission</h2>
          <hr />
          <p><strong>Name:</strong> ${record.name || 'N/A'}</p>
          <p><strong>Email:</strong> ${record.email || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
            ${record.message || 'No message provided'}
          </div>
          <p style="font-size: 12px; color: #888; margin-top: 20px;">Sent via NovaSpark Web Portal</p>
        </div>
      `
    } else if (table === 'bookings') {
      const startTime = record.start_time ? new Date(record.start_time).toLocaleString() : 'Date TBD'
      subject = `📅 New Strategy Call Booked!`
      html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #7C3AED;">New Appointment Scheduled</h2>
          <hr />
          <p><strong>Date & Time:</strong> ${startTime}</p>
          <p><strong>Duration:</strong> ${record.duration || '30'} Minutes</p>
          <p><strong>Notes:</strong> ${record.notes || 'No extra notes'}</p>
          <p style="font-size: 12px; color: #888; margin-top: 20px;">Check your Supabase dashboard for user details.</p>
        </div>
      `
    } else {
      return new Response(JSON.stringify({ message: 'Skipping: Table not supported' }), { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      })
    }

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set')
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'NovaSpark Portal <onboarding@resend.dev>',
        to: [ADMIN_EMAIL],
        subject: subject,
        html: html,
      }),
    })

    const data = await res.json()
    return new Response(JSON.stringify(data), { 
      status: res.status, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    })

  } catch (error) {
    const err = error as Error
    console.error('Error:', err.message)
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    })
  }
})
