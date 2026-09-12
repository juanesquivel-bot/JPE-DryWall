'use client';

import Logo from './Logo';
import { emailHref, site } from '@/lib/site';

const links = [
  { id: 'hero', label: 'Home' },
  { id: 'why', label: 'Why Us' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-ink bg-ink-deep pb-24 text-muted-light md:pb-20">
      <div className="container mx-auto px-6 py-20">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <Logo onDark className="mb-6 h-16 sm:h-20" />
            <p className="max-w-xs text-sm font-light leading-relaxed">
              40 years of commercial drywall, metal stud framing, and acoustical systems — built to code, on time, and within budget.
            </p>
          </div>
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-white">Navigate</h4>
            <ul className="space-y-4 text-sm font-light">
              {links.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className="cursor-pointer transition-colors hover:text-mint"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-white">Contact</h4>
            <ul className="space-y-4 text-sm font-light">
              <li>{site.name}</li>
              <li>
                <a href={emailHref} className="transition-colors hover:text-mint">
                  {site.email}
                </a>
              </li>
              <li>{site.serviceArea}</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between border-t border-ink pt-8 text-xs uppercase tracking-widest md:flex-row">
          <p className="opacity-60">© {new Date().getFullYear()} {site.name}.</p>
          <p className="mt-4 opacity-60 md:mt-0">Built to code. Built to last.</p>
        </div>
      </div>
    </footer>
  );
}
