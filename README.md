# Zanvus PR Portal

A revenue-generating MVP that helps users create AI-powered PR articles and pay to get them published.

---

## Tech Stack
- **Next.js 14** — Frontend + API routes
- **Tailwind CSS** — Styling
- **Claude API (Anthropic)** — Article generation
- **Stripe** — Payments
- **Supabase** — Database
- **Nodemailer** — Admin email notifications

---

## Quick Start

### 1. Clone & Install

```bash
git clone <your-repo>
cd zanvus-pr-portal
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Fill in all values in `.env.local` (see section below).

### 3. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and paste the contents of `supabase-schema.sql`
3. Run the query to create the `submissions` table
4. Copy your Project URL and API keys into `.env.local`

### 4. Set Up Stripe

1. Create account at [stripe.com](https://stripe.com)
2. Get your **Secret Key** and **Publishable Key** from the Dashboard
3. For webhooks (local development):
   ```bash
   npm install -g stripe
   stripe login
   stripe listen --forward-to localhost:3000/api/webhook
   ```
   Copy the webhook secret printed to your terminal into `STRIPE_WEBHOOK_SECRET`

4. For production, add webhook endpoint in Stripe Dashboard:
   - URL: `https://yourdomain.com/api/webhook`
   - Events: `checkout.session.completed`

### 5. Get Anthropic API Key

1. Sign up at [console.anthropic.com](https://console.anthropic.com)
2. Create an API key
3. Add to `ANTHROPIC_API_KEY` in `.env.local`

### 6. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Deployment (Vercel — Recommended)

1. Push your code to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Add all environment variables in Vercel's project settings
4. Deploy
5. Update `NEXT_PUBLIC_BASE_URL` to your production URL
6. Update Stripe webhook endpoint to your production URL

---

## Environment Variables Reference

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_BASE_URL` | Your app URL (http://localhost:3000 in dev) |
| `ANTHROPIC_API_KEY` | Claude API key |
| `STRIPE_SECRET_KEY` | Stripe secret key (sk_test_... or sk_live_...) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_KEY` | Supabase service role key (keep secret!) |
| `ADMIN_EMAIL` | Email address to receive order notifications |
| `SMTP_HOST` | SMTP server host |
| `SMTP_PORT` | SMTP port (usually 587) |
| `SMTP_USER` | SMTP username/email |
| `SMTP_PASS` | SMTP password or app password |

---

## Project Structure

```
zanvus-pr-portal/
├── components/
│   ├── Layout.js          # Nav + footer wrapper
│   └── StepIndicator.js   # 3-step progress bar
├── pages/
│   ├── index.js           # Landing page
│   ├── create.js          # Story form
│   ├── article.js         # Article preview + pricing
│   ├── success.js         # Post-payment confirmation
│   └── api/
│       ├── generate-article.js   # Claude API integration
│       ├── create-checkout.js    # Stripe checkout session
│       └── webhook.js            # Stripe webhook handler
├── styles/
│   └── globals.css        # Global styles + Tailwind
├── supabase-schema.sql    # Database setup
├── .env.example           # Environment variables template
└── README.md
```

---

## Revenue Flow

1. User visits landing page → clicks CTA
2. Fills out 10-question story form
3. Claude generates a 600-750 word PR article
4. User previews article (partial blur to drive conversion)
5. User selects package ($497 / $997 / $2,500)
6. Stripe checkout collects payment
7. Webhook fires → saves to Supabase + emails admin
8. User sees confirmation page
9. Admin manually coordinates publication with media outlets

---

## Customization

### Change Prices
Edit `packages` array in `pages/article.js` and `packageDetails` in `pages/api/create-checkout.js`.

### Change Article Tone Instructions
Edit the `toneInstructions` object in `pages/api/generate-article.js`.

### Add More Form Fields
Add to the `fields` array in `pages/create.js` and update the prompt in `pages/api/generate-article.js`.

### Custom Domain Email
Replace Nodemailer/Gmail with [Resend](https://resend.com) or [SendGrid](https://sendgrid.com) for better deliverability.
