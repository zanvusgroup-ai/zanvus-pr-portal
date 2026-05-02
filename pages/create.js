import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import StepIndicator from '../components/StepIndicator'

const tones = [
  { id: 'professional', label: 'Professional', desc: 'Authoritative & credible' },
  { id: 'luxury', label: 'Luxury', desc: 'Prestigious & exclusive' },
  { id: 'inspirational', label: 'Inspirational', desc: 'Motivating & human' },
]

const fields = [
  { name: 'fullName', label: 'Full Name', placeholder: 'e.g. Sarah Johnson', required: true, type: 'text' },
  { name: 'company', label: 'Company / Brand', placeholder: 'e.g. Apex Consulting Group', required: true, type: 'text' },
  { name: 'industry', label: 'Industry', placeholder: 'e.g. Financial Technology, Real Estate, Health & Wellness', required: true, type: 'text' },
  { name: 'location', label: 'Location', placeholder: 'e.g. New York, NY', required: true, type: 'text' },
  { name: 'whatYouDo', label: 'What do you do?', placeholder: 'Describe your role and what your business does...', required: true, type: 'textarea', rows: 3 },
  { name: 'whoYouHelp', label: 'Who do you help?', placeholder: 'Describe your ideal client or customer...', required: true, type: 'textarea', rows: 3 },
  { name: 'biggestAchievement', label: 'Biggest achievement?', placeholder: 'A specific result, award, milestone, or transformation you created...', required: true, type: 'textarea', rows: 3 },
  { name: 'whyYouStarted', label: 'Why did you start?', placeholder: 'Your origin story — the moment you decided to build this...', required: true, type: 'textarea', rows: 3 },
  { name: 'whatMakesDifferent', label: 'What makes you different?', placeholder: 'Your unique approach, method, or philosophy...', required: true, type: 'textarea', rows: 3 },
  { name: 'futureGoals', label: 'Future goals?', placeholder: 'Where are you headed? What are you building toward?', required: false, type: 'textarea', rows: 3 },
]

export default function CreatePage() {
  const router = useRouter()
  const [form, setForm] = useState({
    fullName: '', company: '', industry: '', location: '',
    whatYouDo: '', whoYouHelp: '', biggestAchievement: '',
    whyYouStarted: '', whatMakesDifferent: '', futureGoals: '',
    tone: 'professional',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validate required fields
    const missing = fields.filter(f => f.required && !form[f.name]?.trim())
    if (missing.length > 0) {
      setError(`Please fill in: ${missing.map(f => f.label).join(', ')}`)
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Generation failed')

      // Store in sessionStorage and redirect
      sessionStorage.setItem('zanvus_form', JSON.stringify(form))
      sessionStorage.setItem('zanvus_article', JSON.stringify(data))
      router.push('/article')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout title="Create Your Feature">
      <div className="min-h-screen pt-28 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <StepIndicator current={1} />

          <div className="text-center mb-12">
            <div className="section-label mb-4">Step 1 of 3</div>
            <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
              Tell us your story
            </h1>
            <p className="text-white/40 text-sm leading-relaxed">
              Answer honestly and specifically — the more detail you give, the more powerful your article will be.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Two-column for name/company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.slice(0, 2).map(field => (
                <div key={field.name}>
                  <label className="block text-xs tracking-widest uppercase text-white/40 mb-2">
                    {field.label} <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="input-field"
                  />
                </div>
              ))}
            </div>

            {/* Two-column for industry/location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.slice(2, 4).map(field => (
                <div key={field.name}>
                  <label className="block text-xs tracking-widest uppercase text-white/40 mb-2">
                    {field.label} <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="input-field"
                  />
                </div>
              ))}
            </div>

            <div className="divider-gold" />

            {/* Textarea fields */}
            {fields.slice(4).map(field => (
              <div key={field.name}>
                <label className="block text-xs tracking-widest uppercase text-white/40 mb-2">
                  {field.label}
                  {field.required && <span className="text-gold-400 ml-1">*</span>}
                </label>
                <textarea
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  rows={field.rows}
                  className="input-field resize-none"
                />
              </div>
            ))}

            <div className="divider-gold" />

            {/* Tone selection */}
            <div>
              <label className="block text-xs tracking-widest uppercase text-white/40 mb-4">
                Article Tone <span className="text-gold-400">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {tones.map(tone => (
                  <button
                    key={tone.id}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, tone: tone.id }))}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                      form.tone === tone.id
                        ? 'border-gold-400/60 bg-gold-400/10'
                        : 'border-white/8 bg-dark-800 hover:border-white/20'
                    }`}
                  >
                    <div className={`text-sm font-semibold mb-1 ${form.tone === tone.id ? 'text-gold-400' : 'text-white/70'}`}>
                      {tone.label}
                    </div>
                    <div className="text-xs text-white/30">{tone.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-4 rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="inline-block w-4 h-4 border-2 border-dark-900/30 border-t-dark-900 rounded-full animate-spin" />
                  Crafting your article...
                </span>
              ) : (
                'Generate My Article →'
              )}
            </button>

            <p className="text-center text-xs text-white/20">
              Your article generates in ~30 seconds. No payment required yet.
            </p>
          </form>
        </div>
      </div>
    </Layout>
  )
}
