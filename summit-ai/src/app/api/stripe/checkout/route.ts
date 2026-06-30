import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL!

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!, quantity: 1 }],
      customer_email: user.email,
      client_reference_id: user.id,
      success_url: `${appUrl}/dashboard?success=true`,
      cancel_url: `${appUrl}/dashboard/settings?canceled=true`,
      metadata: { user_id: user.id },
      currency: 'cad',
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout session creation failed:', err)
    const message = err instanceof Error ? err.message : 'Failed to start checkout'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
