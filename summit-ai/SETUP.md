# Summit AI — Setup Guide

## 1. Supabase Setup

1. Go to [supabase.com](https://supabase.com) → Create new project
2. Go to **SQL Editor** → Paste and run everything in `supabase-schema.sql`
3. Go to **Project Settings → API** → Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`
4. Go to **Authentication → URL Configuration** → Add `http://localhost:3000` to Site URL

## 2. Stripe Setup (CAD)

1. Go to [stripe.com](https://stripe.com) → Create account
2. Dashboard → **Products** → Add product:
   - Name: `Summit Pro`
   - Price: `$9.99` CAD, recurring monthly
   - Copy the **Price ID** → `NEXT_PUBLIC_STRIPE_PRICE_ID`
3. **Developers → API keys** → Copy:
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`
4. **Developers → Webhooks** → Add endpoint:
   - URL: `https://your-domain.vercel.app/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.deleted`, `customer.subscription.paused`, `customer.subscription.resumed`, `invoice.payment_succeeded`
   - Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET`
5. Go to **Settings → Customer portal** → Activate it

## 3. Anthropic API

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. API Keys → Create key → `ANTHROPIC_API_KEY`

## 4. Fill in .env.local

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PRICE_ID=price_...

ANTHROPIC_API_KEY=sk-ant-...

NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## 5. Run Locally

```bash
npm run dev
```
Open http://localhost:3000

## 6. Deploy to Vercel

```bash
npm i -g vercel
vercel
```
Add all environment variables in Vercel dashboard → Settings → Environment Variables.

## Free vs Pro

| Feature | Free | Pro ($9.99 CAD/mo) |
|---------|------|---------------------|
| Generations | 3 total | Unlimited |
| Copy results | No | Yes |
| Save history | No | Yes |
| Output length | Short | Full |
| All 9 tools | Preview | Full access |
