import type { FormDefaults } from '@/lib/page-types';
import { AddressAutocomplete } from '@/components/AddressAutocomplete';

type LeadFormProps = {
  defaults?: FormDefaults;
};

export function LeadForm({ defaults }: LeadFormProps) {
  return (
    <form className="lead-form" action="/api/lead" method="post">
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
        <input name="phone" defaultValue={defaults?.phone ?? ''} placeholder="(555) 555-5555" inputMode="tel" />
      </label>

      <label className="field">
        <span>Email</span>
        <input name="email" defaultValue={defaults?.email ?? ''} placeholder="you@email.com" type="email" />
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
