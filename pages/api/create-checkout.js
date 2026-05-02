import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

const packageDetails = {
  starter: { name: 'Zanvus Starter — Standard Publication', price: 49700 },
  growth: { name: 'Zanvus Growth — Premium Publication', price: 99700 },
  authority: { name: 'Zanvus Authority — 3 Articles + Distribution', price: 250000 },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { packageId, formData, article } = req.body

  const pkg = packageDetails[packageId]
  if (!pkg) return res.status(400).json({ error: 'Invalid package' })

  try {
    // Save submission to Supabase
    let submissionId = null
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
      const { data, error } = await supabase
        .from('submissions')
        .insert({
          full_name: formData.fullName,
          company: formData.company,
          industry: formData.industry,
          location: formData.location,
          tone: formData.tone,
          form_data: formData,
          article_headline: article.headline,
          article_body: article.body,
          package_id: packageId,
          package_name: pkg.name,
          status: 'pending_payment',
        })
        .select('id')
        .single()

      if (!error && data) submissionId = data.id
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: pkg.name,
              description: `PR article for ${formData.fullName} — ${formData.company}`,
            },
            unit_amount: pkg.price,
          },
          quantity: 1,
        },
      ],
      customer_email: undefined, // Stripe will collect email at checkout
      metadata: {
        submission_id: submissionId || '',
        package_id: packageId,
        client_name: formData.fullName,
        company: formData.company,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/article`,
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    res.status(500).json({ error: 'Failed to create checkout session.' })
  }
}
