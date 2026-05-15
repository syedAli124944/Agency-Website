import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { planName, interval, successUrl, cancelUrl } = await req.json()

    // --- DEEP SECURITY: SERVER-SIDE PRICE ENFORCEMENT ---
    // Never trust the amount sent from the frontend.
    const PRICE_MAP = {
      'Starter': { monthly: 499, yearly: 4490 },
      'Pro': { monthly: 999, yearly: 8990 },
      'Enterprise': { monthly: 2499, yearly: 22490 }
    }

    const plan = PRICE_MAP[planName]
    if (!plan) {
      throw new Error(`Invalid Plan: ${planName}`)
    }

    const finalAmount = interval === 'yearly' ? plan.yearly : plan.monthly

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
      apiVersion: '2022-11-15',
      httpClient: Stripe.createFetchHttpClient(),
    })

    console.log(`SECURE: Creating session for ${planName} @ $${finalAmount}`)

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${planName} Plan`,
              description: `Subscription to NovaSpark ${planName} services`,
            },
            unit_amount: Math.round(finalAmount * 100), // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    })

    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Security Alert/Error:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 400 
      }
    )
  }
})
