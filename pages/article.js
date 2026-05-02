import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import StepIndicator from '../components/StepIndicator'

const packages = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$497',
    priceNum: 49700,
    desc: 'Standard publication',
    features: ['1 AI-crafted article', 'Standard outlet placement', '48hr turnaround', 'Final approval'],
    highlight: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$997',
    priceNum: 99700,
    desc: 'Premium publication',
    features: ['1 premium article', 'Tier-1 outlet placement', '24hr turnaround', 'Unlimited revisions', 'Social media assets'],
    highlight: true,
  },
  {
    id: 'authority',
    name: 'Authority',
    price: '$2,500',
    priceNum: 250000,
    desc: '3 articles + distribution',
    features: ['3 unique articles', 'Multi-outlet distribution', 'Priority placement', 'PR strategy call', 'Press kit included'],
    highlight: false,
  },
]

export default function ArticlePage() {
  const router = useRouter()
  const [article, setArticle] = useState(null)
  const [formData, setFormData] = useState(null)
  const [selectedPkg, setSelectedPkg] = useState('growth')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const art = sessionStorage.getItem('zanvus_article')
    const form = sessionStorage.getItem('zanvus_form')
    if (!art || !form) {
      router.push('/create')
      return
    }
    setArticle(JSON.parse(art))
    setFormData(JSON.parse(form))
  }, [router])

  const handleCheckout = async () => {
    setLoading(true)
    setError('')
    const pkg = packages.find(p => p.id === selectedPkg)
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: pkg.id,
          packageName: pkg.name,
          packagePrice: pkg.priceNum,
          formData,
          article,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Checkout failed')
      window.location.href = data.url
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  if (!article) {
    return (
      <Layout title="Your Article">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/40 text-sm">Loading your article...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Your Article Preview">
      <div className="min-h-screen pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <StepIndicator current={2} />

          <div className="text-center mb-12">
            <div className="section-label mb-4">Step 2 of 3</div>
            <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
              Your article is ready
            </h1>
            <p className="text-white/40 text-sm">
              Review your AI-generated PR article below. This is publication-ready.
            </p>
          </div>

          {/* Article Preview */}
          <div className="card-dark rounded-2xl p-8 md:p-12 mb-10 relative overflow-hidden">
            {/* Blur overlay with upgrade message - teaser effect */}
            <div className="mb-8 pb-8 border-b border-white/8">
              <div className="section-label mb-3">Headline</div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white leading-tight">
                {article.headline}
              </h2>
            </div>

            <div className="article-content space-y-0 relative">
              <div className="section-label mb-4">Full Article</div>

              {/* First 2 paragraphs fully visible */}
              <div className="text-white/75 text-[0.95rem] leading-[1.85]">
                {article.body.split('\n\n').slice(0, 2).map((para, i) => (
                  <p key={i} className="mb-5">{para}</p>
                ))}
              </div>

              {/* Rest blurred */}
              {article.body.split('\n\n').length > 2 && (
                <div className="relative">
                  <div className="text-white/75 text-[0.95rem] leading-[1.85] blur-sm select-none pointer-events-none">
                    {article.body.split('\n\n').slice(2).map((para, i) => (
                      <p key={i} className="mb-5">{para}</p>
                    ))}
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(15,15,15,0.85) 30%)' }}>
                    <div className="text-center px-6 py-8">
                      <div className="text-gold-400 text-2xl mb-3">✦</div>
                      <p className="font-display text-xl text-white mb-2">Full article unlocked after payment</p>
                      <p className="text-white/35 text-sm">Your complete article is ready and waiting.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="divider-gold mb-10" />

          {/* Pricing section */}
          <div id="pricing">
            <StepIndicator current={3} />
            <div className="text-center mb-10">
              <div className="section-label mb-4">Step 3 of 3</div>
              <h2 className="font-display text-3xl md:text-4xl font-light mb-3">
                Choose your package
              </h2>
              <p className="text-white/40 text-sm">Select where you want your story published.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {packages.map(pkg => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPkg(pkg.id)}
                  className={`rounded-xl p-6 text-left transition-all duration-300 relative ${
                    selectedPkg === pkg.id
                      ? 'border border-gold-400/50 bg-gradient-to-b from-dark-600 to-dark-700 card-glow'
                      : 'border border-white/8 bg-dark-800 hover:border-white/20'
                  }`}
                >
                  {pkg.highlight && selectedPkg !== pkg.id && (
                    <div className="absolute -top-2 right-4 bg-gold-400/20 text-gold-400 text-xs px-2 py-0.5 rounded-full border border-gold-400/30">
                      Popular
                    </div>
                  )}
                  {selectedPkg === pkg.id && (
                    <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-gold-400 flex items-center justify-center">
                      <span className="text-dark-900 text-xs">✓</span>
                    </div>
                  )}
                  <div className="section-label mb-2">{pkg.name}</div>
                  <div className={`font-display text-3xl font-semibold mb-1 ${selectedPkg === pkg.id ? 'text-gold-400' : 'text-white'}`}>
                    {pkg.price}
                  </div>
                  <div className="text-xs text-white/30 mb-5">{pkg.desc}</div>
                  <ul className="space-y-2">
                    {pkg.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-xs text-white/50">
                        <span className="text-gold-400 flex-shrink-0 mt-0.5">✦</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            {error && (
              <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm mb-6">
                {error}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="btn-gold w-full py-4 rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="inline-block w-4 h-4 border-2 border-dark-900/30 border-t-dark-900 rounded-full animate-spin" />
                  Redirecting to checkout...
                </span>
              ) : (
                `Publish My Article — ${packages.find(p => p.id === selectedPkg)?.price} →`
              )}
            </button>

            <p className="text-center text-xs text-white/20 mt-4">
              Secure checkout via Stripe · 256-bit SSL encrypted · Satisfaction guaranteed
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
