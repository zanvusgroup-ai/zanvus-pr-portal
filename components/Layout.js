import Head from 'next/head'
import Link from 'next/link'

export default function Layout({ children, title = 'Zanvus PR Portal' }) {
  return (
    <>
      <Head>
        <title>{title} — Zanvus</title>
      </Head>
      <div className="min-h-screen bg-dark-900">
        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5"
          style={{ background: 'linear-gradient(180deg, rgba(8,8,8,0.95) 0%, transparent 100%)' }}>
          <Link href="/" className="font-display text-xl tracking-widest text-white hover:opacity-80 transition-opacity">
            ZANVUS
          </Link>
          <a href="/#packages"
            className="text-xs tracking-widest uppercase text-gold-400 hover:text-gold-300 transition-colors">
            Packages
          </a>
        </nav>

        <main>{children}</main>

        {/* Footer */}
        <footer className="border-t border-white/5 py-10 px-6 mt-24">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-display text-lg tracking-widest text-white/40">ZANVUS</span>
            <p className="text-xs text-white/20">© {new Date().getFullYear()} Zanvus. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-white/30">
              <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
              <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
              <a href="mailto:hello@zanvus.com" className="hover:text-white/60 transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
