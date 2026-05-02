import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function SuccessPage() {
  const router = useRouter()
  const { session_id } = router.query
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!session_id) return
    // Animate steps in sequence
    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 1900),
    ]
    return () => timers.forEach(clearTimeout)
  }, [session_id])

  const steps = [
    'Payment confirmed',
    'Article queued for review',
    'Publication team notified',
  ]

  return (
    <Layout title="Order Confirmed">
      <div className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-lg mx-auto text-center">
          {/* Success icon */}
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full mb-10"
            style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)' }}>
            <div className="absolute inset-0 rounded-full border border-gold-400/30 animate-pulse-slow" />
            <span className="text-4xl">✦</span>
          </div>

          <div className="section-label mb-4">Order Confirmed</div>

          <h1 className="font-display text-4xl md:text-5xl font-light mb-6 leading-tight">
            Your article is being<br />
            <span className="gold-gradient italic font-medium">prepared for publication</span>
          </h1>

          <p className="text-white/50 mb-10 leading-relaxed text-sm">
            Our editorial team will review your article and reach out within 24 hours with publication details and any final questions.
          </p>

          {/* Progress steps */}
          <div className="card-dark rounded-2xl p-8 mb-10 text-left">
            <div className="section-label mb-6">What happens next</div>
            <div className="space-y-5">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                    i < step ? 'bg-gold-400/20 border border-gold-400/40' : 'border border-white/10 bg-dark-700'
                  }`}>
                    {i < step ? (
                      <span className="text-gold-400 text-sm">✓</span>
                    ) : (
                      <span className="text-white/20 text-xs">{i + 1}</span>
                    )}
                  </div>
                  <span className={`text-sm transition-colors duration-500 ${i < step ? 'text-white/80' : 'text-white/25'}`}>
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-white/25">Check your inbox — a confirmation email is on its way.</p>
            <Link href="/"
              className="inline-block text-xs text-gold-400/60 hover:text-gold-400 transition-colors tracking-wider">
              ← Return to Zanvus home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
