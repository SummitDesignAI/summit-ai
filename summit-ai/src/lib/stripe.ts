import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-06-24.dahlia' as const,
})

export const PLANS = {
  pro: {
    name: 'Summit Pro',
    price: 9.99,
    currency: 'cad',
    interval: 'month' as const,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
  },
}
