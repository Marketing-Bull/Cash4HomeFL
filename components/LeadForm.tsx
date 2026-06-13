'use client';

import { useState } from 'react';
import type { FormDefaults } from '@/lib/page-types';
import { AddressAutocomplete } from '@/components/AddressAutocomplete';

// Require at least one char, @, domain, dot, 2+ char TLD.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

type LeadFormProps = {
  defaults?: FormDefaults;
};

export function LeadForm({ defaults }: LeadFormProps) {
  const [phone, setPhone] = useState(defaults?.phone ?? '');
  const [phoneError, setPhoneError] = useState('');
  const [email, setEmail] = useState(defaults?.email ?? '');
  const [emailError, setEmailError] = useState('');

  function validatePhone(value: string): string {
    const digits = value.replace(/\D/g, '');
    if (value && digits.length !== 10) return 'Please enter a valid 10-digit US phone number.';
    return '';
  }

  function validateEmail(value: string): string {
    if (value && !EMAIL_RE.test(value)) return 'Please enter a valid email address (e.g. you@example.com).';
    return '';
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    if (phoneError) setPhoneError('');
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  }

  function handlePhoneBlur() {
    setPhoneError(validatePhone(phone));
  }

  function handleEmailBlur() {
    setEmailError(validateEmail(email));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const pErr = validatePhone(phone);
    const eErr = validateEmail(email);
    setPhoneError(pErr);
    setEmailError(eErr);
    if (pErr || eErr) {
      e.preventDefault();
    }
  }

  return (
    <form className="lead-form" action="/api/lead" method="post" onSubmit={handleSubmit} noValidate>
      <div className="lead-form__header">
        <p className="eyebrow">Get your cash offer</p>
        <h2>Enter the property details</h2>
        <p className="muted">A quick address-first form is the fastest path to a review.</p>
      </div>

      <label className="field">
        <span>Property address</span>
        <AddressAutocomplete defaultValue={defaults?.address} />
      </label>

      <label className="field">
        <span>Phone</span>
        <input
          name="phone"
          value={phone}
          placeholder="(555) 555-5555"
          inputMode="tel"
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
          aria-describedby={phoneError ? 'phone-error' : undefined}
          aria-invalid={!!phoneError}
        />
        {phoneError && <span id="phone-error" className="field-error" role="alert">{phoneError}</span>}
      </label>

      <label className="field">
        <span>Email</span>
        <input
          name="email"
          value={email}
          placeholder="you@email.com"
          type="email"
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          aria-describedby={emailError ? 'email-error' : undefined}
          aria-invalid={!!emailError}
        />
        {emailError && <span id="email-error" className="field-error" role="alert">{emailError}</span>}
      </label>

      {/* Honeypot: invisible to humans, bots that fill it are dropped server-side */}
      <label className="hp-field" aria-hidden="true">
        <span>Company</span>
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>

      <button className="button button--block" type="submit">
        Get My Cash Offer &rarr;
      </button>

      <p className="form-note">&#128274; No obligation &middot; No repairs &middot; No commissions &middot; 100% private</p>
    </form>
  );
}
