import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

export const config = { api: { bodyParser: false } }

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

async function sendAdminEmail(session, submissionId) {
  if (!process.env.SMTP_HOST || !process.env.ADMIN_EMAIL) return

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const { metadata } = session
  const amount = (session.amount_total / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })

  await transporter.sendMail({
    from: `"Zanvus System" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🚀 New Order: ${metadata.client_name} — ${metadata.package_id} (${amount})`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #D4AF37;">New Zanvus Order Received</h2>
        <hr style="border-color: #D4AF37; opacity: 0.3;" />
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #666;">Client</td><td style="padding: 8px 0; font-weight: bold;">${metadata.client_name}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Company</td><td style="padding: 8px 0;">${metadata.company}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Package</td><td style="padding: 8px 0; font-weight: bold; color: #D4AF37;">${metadata.package_id?.toUpperCase()}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Amount</td><td style="padding: 8px 0; font-weight: bold;">${amount}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Customer Email</td><td style="padding: 8px 0;">${session.customer_details?.email || 'N/A'}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Submission ID</td><td style="padding: 8px 0; font-size: 12px; color: #999;">${submissionId || 'N/A'}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Stripe Session</td><td style="padding: 8px 0; font-size: 12px; color: #999;">${session.id}</td></tr>
        </table>
        <hr style="border-color: #D4AF37; opacity: 0.3;" />
        <p style="color: #666; font-size: 14px;">View full details in your Supabase dashboard and Stripe dashboard.</p>
      </div>
    `,
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const rawBody = await getRawBody(req)
  const sig = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature error:', err.message)
    return res.status(400).json({ error: `Webhook error: ${err.message}` })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const submissionId = session.metadata?.submission_id

    if (submissionId && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      await supabase
        .from('submissions')
        .update({
          status: 'paid',
          stripe_session_id: session.id,
          customer_email: session.customer_details?.email,
          paid_at: new Date().toISOString(),
        })
        .eq('id', submissionId)
    }

    await sendAdminEmail(session, submissionId)
  }

  res.status(200).json({ received: true })
}
