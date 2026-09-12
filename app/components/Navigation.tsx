'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import MobileCta from './MobileCta';
import { site } from '@/lib/site';

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'why', label: 'Why Us' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('hero');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navBg =
    scrolled || mobileMenuOpen
      ? 'bg-white/95 backdrop-blur-md py-3 shadow-sm border-b border-gypsum-dark'
      : 'bg-white/95 backdrop-blur-md py-4 border-b border-transparent';

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${navBg}`}>
        <div className="container mx-auto flex items-center justify-between gap-4 px-6">
          <button
            type="button"
            onClick={() => scrollTo('hero')}
            className="relative z-50 min-w-0 max-w-[78%] shrink cursor-pointer sm:max-w-none"
            aria-label={`${site.name} home`}
          >
            <Logo
              priority
              className={`transition-all duration-500 ${
                scrolled || mobileMenuOpen ? 'h-11 sm:h-12 md:h-14' : 'h-12 sm:h-14 md:h-16'
              }`}
            />
          </button>

          <div className="hidden items-center space-x-10 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  className={`relative group cursor-pointer text-xs font-medium uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:opacity-70
                    ${isActive ? 'opacity-100' : 'opacity-80'}
                  `}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-current transition-all duration-300 group-hover:w-full ${
                      isActive ? 'w-full' : 'w-0'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="z-50 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-ink transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 flex flex-col bg-white px-8 pt-28 pb-28 transition-transform duration-500 lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'pointer-events-none translate-x-full'
        }`}
      >
        <button type="button" onClick={() => scrollTo('hero')} className="mb-10 w-fit" aria-label={`${site.name} home`}>
          <Logo className="h-12" />
        </button>
        <div className="flex flex-col justify-center space-y-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              className="cursor-pointer text-left font-serif text-3xl text-ink transition-colors hover:text-mint-dark"
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="mt-12 border-t border-gypsum-dark pt-12">
          <p className="mb-2 text-xs uppercase tracking-widest text-ink-mid">{site.name}</p>
          <p className="font-light text-muted">{site.tagline}</p>
          <a
            href={`mailto:${site.email}`}
            onClick={() => setMobileMenuOpen(false)}
            className="mt-3 block font-light text-ink hover:text-mint-dark"
          >
            {site.email}
          </a>
        </div>
      </div>
      <MobileCta onNavigate={() => setMobileMenuOpen(false)} />
    </>
  );
}
