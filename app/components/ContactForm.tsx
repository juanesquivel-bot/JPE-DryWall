'use client';

import { FormEvent, useState } from 'react';
import Button from './UI/button';
import { formatUploadLimit, isAllowedUpload } from '@/lib/upload';

const projectTypes = ['New Construction', 'Renovation', 'Specialty Build'];

const fieldClass =
  'w-full bg-white border-none outline-none p-4 text-ink focus:ring-1 focus:ring-mint transition-all placeholder:text-muted-light';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const firstName = String(formData.get('firstName') || '').trim();
    const lastName = String(formData.get('lastName') || '').trim();
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setError('Please enter a valid phone number with at least 10 digits.');
      setSubmitting(false);
      return;
    }

    const file = formData.get('blueprint');
    if (file instanceof File && file.size > 0) {
      const uploadError = isAllowedUpload(file);
      if (uploadError) {
        setError(uploadError);
        setSubmitting(false);
        return;
      }
    }

    const payload = new FormData();
    payload.set('fullName', `${firstName} ${lastName}`.trim());
    payload.set('company', String(formData.get('company') || ''));
    payload.set('phone', phone);
    payload.set('email', String(formData.get('email') || ''));
    payload.set('projectType', String(formData.get('projectType') || ''));
    payload.set('details', String(formData.get('details') || ''));
    if (file instanceof File && file.size > 0) {
      payload.set('blueprint', file);
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: payload,
      });
      const result = await response.json().catch(() => ({ ok: false }));

      if (!response.ok || !result.ok) {
        setError(result.error || 'Unable to send your bid request right now.');
        return;
      }

      setSubmitted(true);
    } catch {
      setError('Unable to send your bid request right now.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-[520px] flex-col justify-center bg-gypsum p-10 lg:p-16">
        <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-ink-mid">
          Bid Request Received
        </span>
        <h3 className="mb-4 font-serif text-3xl text-ink">Thank you.</h3>
        <p className="font-light leading-relaxed text-muted">
          We have your project inquiry. Next we will review the scope, follow up to schedule a walk-through, and prepare a written bid.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gypsum p-8 lg:p-14">
      <h3 className="mb-8 font-serif text-2xl text-ink">Request a Bid</h3>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-2 block text-xs uppercase tracking-widest text-muted">
              First Name
            </label>
            <input id="firstName" name="firstName" type="text" required className={fieldClass} placeholder="First name" />
          </div>
          <div>
            <label htmlFor="lastName" className="mb-2 block text-xs uppercase tracking-widest text-muted">
              Last Name
            </label>
            <input id="lastName" name="lastName" type="text" required className={fieldClass} placeholder="Last name" />
          </div>
        </div>
        <div>
          <label htmlFor="company" className="mb-2 block text-xs uppercase tracking-widest text-muted">
            Company / General Contractor
          </label>
          <input id="company" name="company" type="text" required className={fieldClass} placeholder="Company name" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="phone" className="mb-2 block text-xs uppercase tracking-widest text-muted">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              required
              minLength={10}
              title="Enter a phone number using digits only"
              value={phone}
              onChange={(event) => setPhone(event.target.value.replace(/[^\d+\-().\s]/g, ''))}
              onKeyDown={(event) => {
                if (event.key.length === 1 && /[A-Za-z]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              className={fieldClass}
              placeholder="(555) 000-0000"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-widest text-muted">
              Email
            </label>
            <input id="email" name="email" type="email" required className={fieldClass} placeholder="you@company.com" />
          </div>
        </div>
        <div>
          <label htmlFor="projectType" className="mb-2 block text-xs uppercase tracking-widest text-muted">
            Project Type
          </label>
          <select id="projectType" name="projectType" required defaultValue="" className={`${fieldClass} cursor-pointer`}>
            <option value="" disabled>
              Select a project type
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="details" className="mb-2 block text-xs uppercase tracking-widest text-muted">
            Project Scope
          </label>
          <textarea
            id="details"
            name="details"
            rows={5}
            required
            className={`${fieldClass} resize-none`}
            placeholder="Square footage, schedule, fire rating, specialty assemblies, or bid deadline..."
          />
        </div>
        <div>
          <label htmlFor="blueprint" className="mb-2 block text-xs uppercase tracking-widest text-muted">
            Blueprints / Specs
          </label>
          <label className="flex cursor-pointer flex-col items-start gap-1 border border-dashed border-gypsum-dark bg-white px-4 py-5 text-sm font-light text-muted transition-colors hover:border-mint">
            <span className="text-xs uppercase tracking-widest text-ink">Upload files</span>
            <span>{fileName || formatUploadLimit()}</span>
            <input
              id="blueprint"
              name="blueprint"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.webp,.zip,.dwg,.dxf"
              className="sr-only"
              onChange={(event) => {
                const selected = event.target.files?.[0];
                if (!selected) {
                  setFileName('');
                  return;
                }
                const uploadError = isAllowedUpload(selected);
                if (uploadError) {
                  setError(uploadError);
                  setFileName('');
                  event.target.value = '';
                  return;
                }
                setError('');
                setFileName(selected.name);
              }}
            />
          </label>
        </div>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <Button type="submit" variant="primary" className={`mt-2 w-full py-4 ${submitting ? 'pointer-events-none opacity-70' : ''}`}>
          {submitting ? 'Sending...' : 'Submit Bid Request'}
        </Button>
      </form>
    </div>
  );
}
