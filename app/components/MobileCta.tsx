'use client';

import { ArrowRight, Mail } from 'lucide-react';
import type { MouseEvent } from 'react';
import { emailHref } from '@/lib/site';

type MobileCtaProps = {
  onNavigate?: () => void;
  hidden?: boolean;
};

export default function MobileCta({ onNavigate, hidden = false }: MobileCtaProps) {
  const goToContact = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate?.();
    window.setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-white/95 p-3 backdrop-blur-md transition-transform duration-500 md:hidden ${
        hidden ? 'pointer-events-none translate-y-full' : 'translate-y-0'
      }`}
      aria-hidden={hidden}
    >
      <div className="grid grid-cols-2 gap-3">
        <a
          href="#contact"
          onClick={goToContact}
          className="inline-flex items-center justify-center gap-2 bg-ink px-4 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-white"
        >
          Request a Bid <ArrowRight size={14} />
        </a>
        <a
          href={emailHref}
          onClick={() => onNavigate?.()}
          className="inline-flex items-center justify-center gap-2 border border-ink px-4 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-ink"
        >
          <Mail size={14} />
          Email Us
        </a>
      </div>
    </div>
  );
}
