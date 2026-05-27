import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How I Sold My West Palm Beach Inherited House in 18 Days — Without Doing a Single Repair',
  description:
    'A South Florida homeowner walks through the decision to sell an inherited property for cash, the alternatives she considered, and what happened when she called a local cash buyer.',
};

const heroImage = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1400&q=85';
const chapter2Image = 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=900&q=80';
const chapter3Image = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=80';
const chapter4Image = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80';
const pullImage = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80';
const closingImage = 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1400&q=85';

export default function AdvertorialPage() {
  return (
    <main className="advertorial">
      {/* ── Hero ── */}
      <div className="advertorial__hero">
        <img
          src={heroImage}
          alt="South Florida single-family home with palm trees"
          className="advertorial__hero-img"
        />
        <div className="advertorial__hero-overlay">
          <div className="container">
            <p className="advertorial__eyebrow">Seller Story</p>
            <h1 className="advertorial__headline">
              How I Sold My West Palm Beach Inherited House in 18 Days — Without Doing a Single Repair
            </h1>
            <p className="advertorial__deck">
              After her father passed, Maria faced a property she could not manage from another state.
              This is what happened when she stopped trying to sell the traditional way.
            </p>
            <div className="advertorial__byline">
              <span>By the Cash4HomeFL Editorial Team</span>
              <span className="advertorial__dot" aria-hidden="true">·</span>
              <time dateTime="2025-03-15">March 15, 2025</time>
            </div>
          </div>
        </div>
      </div>

      {/* ── Chapter 1: The Situation ── */}
      <div className="container">
        <div className="advertorial__chapter">
          <div className="advertorial__chapter-text">
            <h2 className="advertorial__chapter-title">The Situation: A House You Did Not Ask For</h2>
            <p>
              Maria&apos;s father had lived in his West Palm Beach home for 31 years. When he passed in late
              2024, the property came with memories — and problems. A leaking roof. A dated kitchen.
              Eight months of deferred maintenance that had accumulated while he was ill.
            </p>
            <p>
              Maria lived in Orlando. She had a full-time job, two kids, and no background in real estate.
              The house was paid off, which sounds like a luxury until you realize that a paid-off house
              in need of significant repairs is still a liability — not an asset — until you figure out
              what to do with it.
            </p>
            <p>
              &ldquo;I could not afford to fix the roof and the AC and the electrical issues on top of
              flights home and legal fees,&rdquo; she said. &ldquo;I needed the house gone, but I did not
              know how to make that happen fast.&rdquo;
            </p>
          </div>
          <div className="advertorial__chapter-image">
            <img
              src={chapter2Image}
              alt="Older South Florida home needing minor repairs"
            />
            <figcaption>The West Palm Beach property had good bones but needed work most sellers could not afford before listing.</figcaption>
          </div>
        </div>

        {/* ── Pull Quote ── */}
        <blockquote className="advertorial__pullquote">
          <p>
            &ldquo;I called three agents. Two never called back. The one who did told me to budget
            $40,000 in repairs before listing. I did not have $40,000.&rdquo;
          </p>
          <cite>— Maria T., Orlando (formerly of West Palm Beach)</cite>
        </blockquote>

        {/* ── Chapter 2: The Alternatives ── */}
        <div className="advertorial__chapter advertorial__chapter--reverse">
          <div className="advertorial__chapter-text">
            <h2 className="advertorial__chapter-title">What She Considered — and Why None of It Worked</h2>
            <p>
              Before calling a cash buyer, Maria spent six weeks researching options. Here is the
              honest breakdown of each path she evaluated:
            </p>
            <div className="advertorial__alternatives">
              <div className="advertorial__alternative">
                <h3>Traditional listing</h3>
                <p>
                  Three agents told her the same thing: $35,000–$50,000 in repairs before the house
                  would be market-ready. With no way to front that capital, and no desire to take on
                  debt for a house she did not want, this path closed immediately.
                </p>
              </div>
              <div className="advertorial__alternative">
                <h3>iBuyers (Offerpad, Opendoor, etc.)</h3>
                <p>
                  She submitted one request. The initial offer came back at 67% of estimated value,
                  before their service fees and repair deductions. By the time the math was done, she
                  would have walked away with less than nothing after closing costs.
                </p>
              </div>
              <div className="advertorial__alternative">
                <h3>Rent it out</h3>
                <p>
                  Property management in West Palm Beach runs 8–10% of gross rent. With a tenant in
                  place, she would still need to address the deferred maintenance — and she had a
                  tenant who had not paid in two months. Managing a problematic rental from four
                  hours away was not a realistic option.
                </p>
              </div>
              <div className="advertorial__alternative">
                <h3>Do nothing</h3>
                <p>
                  This is the default for many inherited property heirs. It compounds problems:
                  property taxes, insurance, HOA fees, and ongoing maintenance drain cash every month
                  the house sits empty. In South Florida, &ldquo;doing nothing&rdquo; has a real
                  monthly cost.
                </p>
              </div>
            </div>
          </div>
          <div className="advertorial__chapter-image">
            <img
              src={chapter3Image}
              alt="Real estate for sale sign in front of Florida home"
            />
            <figcaption>Traditional listings in South Florida frequently require repairs, staging, and weeks of showings before a closing.</figcaption>
          </div>
        </div>

        {/* ── Chapter 3: The Call ── */}
        <div className="advertorial__chapter">
          <div className="advertorial__chapter-text">
            <h2 className="advertorial__chapter-title">The Call That Changed the Timeline</h2>
            <p>
              A friend who had sold a rental property the year before mentioned she had worked with
              a local cash buyer. Not a franchise. Not an iBuyer. A local operator who understood
              the West Palm Beach market and bought homes as-is.
            </p>
            <p>
              Maria called on a Tuesday afternoon. The conversation took 22 minutes. She explained
              the situation — inherited property, out of state, no repairs possible. The buyer
              asked a few questions: approximate square footage, zip code, general condition, whether
              there was a mortgage or lien.
            </p>
            <p>
              By Thursday, someone had driven by the property and done a visual exterior review.
              By Friday, she had a written offer in hand.
            </p>
            <p>
              &ldquo;It was not the highest number I had imagined in an ideal world,&rdquo; she said.
              &ldquo;But it was a real number. A number I could close on. And I did not have to do
              anything except sign papers.&rdquo;
            </p>
          </div>
          <div className="advertorial__chapter-image">
            <img
              src={chapter4Image}
              alt="Modern clean living room interior, as-is condition"
            />
            <figcaption>Cash buyers purchase homes in their current condition — no repairs, no staging, no concessions.</figcaption>
          </div>
        </div>

        {/* ── Stats Band ── */}
        <div className="advertorial__stats-band">
          <div className="advertorial__stat">
            <strong>18</strong>
            <span>Days from first call to closing</span>
          </div>
          <div className="advertorial__stat">
            <strong>$0</strong>
            <span>Out of pocket for repairs</span>
          </div>
          <div className="advertorial__stat">
            <strong>0</strong>
            <span>Showings or open houses</span>
          </div>
          <div className="advertorial__stat">
            <strong>1</strong>
            <span>Signature session to close</span>
          </div>
        </div>

        {/* ── Chapter 4: The Result ── */}
        <div className="advertorial__chapter advertorial__chapter--reverse">
          <div className="advertorial__chapter-text">
            <h2 className="advertorial__chapter-title">What Actually Happened at Closing</h2>
            <p>
              The closing took place at a title office in West Palm Beach. Maria flew in from Orlando
              that morning. The entire process — signing, fund transfer, keys handed over — took
              under 90 minutes.
            </p>
            <p>
              The mortgage was paid off at closing. The property taxes were settled from proceeds.
              She received a check for the remainder the same day the deal funded.
            </p>
            <p>
              &ldquo;I had imagined months of stress,&rdquo; she said. &ldquo;A cash sale was done in
              less than three weeks. I was skeptical at first — I thought the numbers would not work,
              or that something would fall apart at the last minute. It did not.&rdquo;
            </p>
            <p>
              She used the proceeds to settle her father&apos;s estate, pay off some existing debt,
              and have a modest emergency fund left over. The property she had worried about for
              two months was behind her in under three.
            </p>
          </div>
          <div className="advertorial__chapter-image">
            <img
              src={pullImage}
              alt="Satisfied homeowner receiving keys and paperwork at closing"
            />
            <figcaption>A clean closing: one appointment, one set of signatures, funds transferred the same day.</figcaption>
          </div>
        </div>

        {/* ── Final Image ── */}
        <figure className="advertorial__fullbleed">
          <img
            src={closingImage}
            alt="Palm Beach County Florida neighborhood aerial view"
          />
          <figcaption>
            Cash home buyers cover all of Palm Beach County and Broward County — from West Palm Beach to Fort Lauderdale, Boca Raton to Hollywood.
          </figcaption>
        </figure>

        {/* ── Editorial CTA ── */}
        <div className="advertorial__cta">
          <p className="advertorial__cta-label">If This Story Sounds Familiar</p>
          <h2 className="advertorial__cta-title">
            Tell us about your property. We will review it and get back to you within 24 hours —
            no obligation, no pressure.
          </h2>
          <div className="advertorial__cta-actions">
            <Link className="button" href="/contact">
              Get My Cash Offer
            </Link>
            <a className="button button--ghost" href="tel:+15612209399">
              Call (561) 220-9399
            </a>
          </div>
          <p className="advertorial__cta-note">
            Or explore your city pages to see what a cash offer for your property might look like.
          </p>
          <div className="advertorial__city-links">
            <Link href="/we-buy-houses/west-palm-beach">West Palm Beach</Link>
            <Link href="/we-buy-houses/boca-raton">Boca Raton</Link>
            <Link href="/we-buy-houses/fort-lauderdale">Fort Lauderdale</Link>
            <Link href="/we-buy-houses/boynton-beach">Boynton Beach</Link>
            <Link href="/broward-county">Broward County</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
