import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#185863",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s | J&P Drywall",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "construction",
  keywords: [
    "J&P Drywall",
    "commercial drywall Texas",
    "metal stud framing",
    "fire-rated drywall",
    "acoustical ceiling tile",
    "ACT installation",
    "gypsum board installation",
    "commercial framing contractor",
    "tenant build-out drywall",
    "healthcare drywall systems",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [
      {
        url: "/hero.jpg",
        width: 2400,
        height: 1600,
        alt: "J&P Drywall commercial construction crew on a Texas jobsite",
      },
      {
        url: "/jp-logo.png",
        width: 1024,
        height: 291,
        alt: "J&P Drywall logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/hero.jpg"],
  },
  icons: {
    icon: [{ url: "/jp-icon.png", type: "image/png" }],
    apple: [{ url: "/jp-icon.png" }],
    shortcut: "/jp-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: site.name,
  legalName: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  image: `${site.url}/jp-logo.png`,
  logo: `${site.url}/jp-logo.png`,
  areaServed: {
    "@type": "State",
    name: "Texas",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "TX",
    addressCountry: "US",
  },
  knowsAbout: [
    "Commercial drywall installation",
    "Metal stud framing",
    "Fire-rated wall systems",
    "Acoustical ceiling tile systems",
    "Soundproofing assemblies",
  ],
  slogan: site.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} min-h-screen flex flex-col bg-frost font-sans text-ink antialiased selection:bg-mint selection:text-ink`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
