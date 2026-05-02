import Link from 'next/link'
import Layout from '../components/Layout'

const logos = ['Forbes', 'Business Insider', 'Entrepreneur', 'Inc. Magazine', 'Yahoo Finance']

const features = [
  {
    icon: '✦',
    title: 'AI-Crafted Story',
    desc: 'Our AI transforms your answers into a compelling, publication-ready article in minutes.'
  },
  {
    icon: '◈',
    title: 'Premium Placement',
    desc: 'Your story lands in high-authority outlets that investors, clients, and partners actually read.'
  },
  {
    icon: '◆',
    title: 'Instant Authority',
    desc: 'A single feature in a major outlet does more for credibility than years of social media.'
  },
]

const testimonials = [
  {
    quote: "Within 48 hours of my feature going live, I closed two enterprise deals. The authority this creates is real.",
    name: "Marcus T.",
    role: "CEO, Fintech Startup"
  },
  {
    quote: "I went from unknown consultant to 'as featured in Forbes' overnight. My rates doubled.",
    name: "Priya S.",
    role: "Executive Coach"
  },
  {
    quote: "The article Zanvus created for me was better than anything I could have written myself. Truly.",
    name: "Daniel K.",
    role: "Real Estate Developer"
  },
]

export default function Home() {
  return (
    <Layout title="Get Published — Build Authority">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-px divider-gold" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="section-label mb-8 animate-fade-up">Zanvus PR Portal</div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-8 animate-fade-up delay-100">
            Create Your Story.<br />
            <span className="gold-gradient font-semibold">Get Published.</span><br />
            Build Authority.
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-xl mx-auto mb-12 leading-relaxed animate-fade-up delay-200">
            We turn your experience into a high-authority PR article and place it in the outlets your dream clients read.
          </p>

          <div className="animate-fade-up delay-300">
            <Link href="/create"
              className="btn-gold inline-block px-10 py-4 rounded-full text-sm">
              Create My Feature →
            </Link>
          </div>

          <p className="text-xs text-white/25 mt-6 tracking-wider animate-fade-up delay-400">
            Join 800+ founders and executives already published
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-slow">
          <div className="w-px h-12" style={{ background: 'linear-gradient(180deg, rgba(212,175,55,0.5), transparent)' }} />
        </div>
      </section>

      {/* Logo strip */}
      <section className="py-12 px-6 border-t border-b border-white/5">
        <p className="text-center text-xs tracking-widest text-white/25 uppercase mb-8">Featured In</p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {logos.map(logo => (
            <span key={logo} className="font-display text-xl md:text-2xl text-white/20 hover:text-white/40 transition-colors tracking-wider">
              {logo}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mb-4">How It Works</div>
            <h2 className="font-display text-4xl md:text-5xl font-light">
              From your story to published<br />
              <span className="italic text-white/50">in under 48 hours</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={f.title} className="card-dark rounded-xl p-8 hover:card-glow transition-all duration-500">
                <div className="text-2xl text-gold-400 mb-5">{f.icon}</div>
                <h3 className="font-display text-2xl font-medium mb-3">{f.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process strip */}
      <section className="py-16 px-6 bg-dark-800">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: '01', label: 'Answer 10 questions' },
              { num: '02', label: 'AI crafts your article' },
              { num: '03', label: 'Review & approve' },
              { num: '04', label: 'Published & live' },
            ].map(s => (
              <div key={s.num}>
                <div className="font-display text-4xl text-gold-400/30 font-light mb-2">{s.num}</div>
                <p className="text-sm text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="section-label text-center mb-4">Results</div>
          <h2 className="font-display text-4xl md:text-5xl font-light text-center mb-16">
            Real people. Real authority.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="card-dark rounded-xl p-8">
                <div className="text-gold-400 text-2xl mb-4">"</div>
                <p className="text-white/70 text-sm leading-relaxed mb-6 italic">{t.quote}</p>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/35">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-24 px-6 bg-dark-800">
        <div className="max-w-5xl mx-auto">
          <div className="section-label text-center mb-4">Investment</div>
          <h2 className="font-display text-4xl md:text-5xl font-light text-center mb-4">
            Choose your authority level
          </h2>
          <p className="text-center text-white/40 mb-16 text-sm">One article can change everything. Which level do you need?</p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Starter',
                price: '$497',
                desc: 'Standard publication',
                features: ['1 AI-crafted article', 'Standard outlet placement', '48hr turnaround', 'Final approval'],
                cta: 'Get Started',
                highlight: false,
              },
              {
                name: 'Growth',
                price: '$997',
                desc: 'Premium publication',
                features: ['1 premium article', 'Tier-1 outlet placement', '24hr turnaround', 'Unlimited revisions', 'Social media assets'],
                cta: 'Go Premium',
                highlight: true,
              },
              {
                name: 'Authority',
                price: '$2,500',
                desc: '3 articles + distribution',
                features: ['3 unique articles', 'Multi-outlet distribution', 'Priority placement', 'PR strategy call', 'Press kit included'],
                cta: 'Build Authority',
                highlight: false,
              },
            ].map(pkg => (
              <div key={pkg.name}
                className={`rounded-xl p-8 relative flex flex-col ${pkg.highlight
                  ? 'bg-gradient-to-b from-dark-600 to-dark-700 border border-gold-400/30 card-glow'
                  : 'card-dark'
                }`}>
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-400 text-dark-900 text-xs font-bold px-4 py-1 rounded-full tracking-wider uppercase">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <div className="section-label mb-2">{pkg.name}</div>
                  <div className="font-display text-4xl font-semibold text-white mb-1">{pkg.price}</div>
                  <div className="text-xs text-white/35">{pkg.desc}</div>
                </div>
                <div className="divider-gold mb-6" />
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/60">
                      <span className="text-gold-400 mt-0.5 flex-shrink-0">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/create"
                  className={`text-center py-3.5 rounded-full text-xs tracking-wider font-semibold uppercase transition-all ${pkg.highlight ? 'btn-gold' : 'btn-outline'}`}>
                  {pkg.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl font-light mb-6">
            Your story deserves<br />
            <span className="gold-gradient italic font-medium">to be told.</span>
          </h2>
          <p className="text-white/40 mb-10 leading-relaxed">
            Every day you wait is another day a competitor claims the spotlight that should be yours.
          </p>
          <Link href="/create" className="btn-gold inline-block px-12 py-4 rounded-full text-sm">
            Create My Feature Now →
          </Link>
        </div>
      </section>
    </Layout>
  )
}
