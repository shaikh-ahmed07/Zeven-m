import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { UIProvider } from '@/components/providers/UIProvider';
import { Logo } from '@/components/layout/Logo';
import { site } from '@/lib/data';
import './globals.css';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

// Manrope is a variable font: one file covers every weight.
const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const INIT_SCRIPT = `(function(){var h=document.documentElement;h.classList.add('js');try{if(sessionStorage.getItem('zm-intro'))h.classList.add('intro-seen');else sessionStorage.setItem('zm-intro','1')}catch(e){h.classList.add('intro-seen')}})();`;

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL to the production domain when deploying.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zevenm.com'),
  title: {
    default: `${site.name} | From Vision to Creation`,
    template: `%s | ${site.name}`,
  },
  description:
    'Zeven-M Projects & Realty — premium residential, villa and commercial developments. Excellence in Design, Development & Construction.',
  icons: { icon: '/logo/zeven-m-logo-plate.png' },
  openGraph: {
    title: site.name,
    description: site.tagline,
    type: 'website',
    images: ['/logo/zeven-m-logo-plate.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#10362B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${serif.variable} ${sans.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Enables reveal animations only when JS runs (content is never hidden without it)
            and plays the brand intro once per browser session. */}
        <script dangerouslySetInnerHTML={{ __html: INIT_SCRIPT }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="intro" aria-hidden="true">
          <div className="intro__inner">
            <Logo variant="gold" className="intro__logo" preload />
            <span className="intro__line" />
          </div>
        </div>
        <UIProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </UIProvider>
      </body>
    </html>
  );
}
