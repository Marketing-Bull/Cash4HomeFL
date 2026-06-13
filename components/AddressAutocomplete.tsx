'use client';

import { useEffect, useRef, useState } from 'react';

const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

// Bias suggestions toward the service area (Palm Beach + Broward counties).
const LOCATION_BIAS = { west: -80.55, south: 25.85, east: -79.95, north: 26.99 };

type SuggestionView = {
  id: string;
  main: string;
  secondary: string;
  prediction: any;
};

type StructuredAddress = {
  address1: string;
  city: string;
  state: string;
  zip: string;
  lat: string;
  lng: string;
  placeId: string;
};

const EMPTY_STRUCTURED: StructuredAddress = {
  address1: '',
  city: '',
  state: '',
  zip: '',
  lat: '',
  lng: '',
  placeId: '',
};

let placesLibPromise: Promise<any> | null = null;

function loadPlacesLib(): Promise<any> {
  if (!placesLibPromise) {
    placesLibPromise = new Promise<void>((resolve, reject) => {
      const w = window as any;
      if (w.google?.maps?.importLibrary) {
        resolve();
        return;
      }
      const callbackName = '__c4h_maps_ready';
      w[callbackName] = () => resolve();
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
        MAPS_KEY,
      )}&v=weekly&loading=async&callback=${callbackName}`;
      script.async = true;
      script.onerror = () => reject(new Error('Google Maps JS failed to load'));
      document.head.appendChild(script);
    }).then(() => (window as any).google.maps.importLibrary('places'));
  }
  return placesLibPromise;
}

export function AddressAutocomplete({ defaultValue }: { defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue ?? '');
  const [suggestions, setSuggestions] = useState<SuggestionView[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [structured, setStructured] = useState<StructuredAddress>(EMPTY_STRUCTURED);

  const sessionTokenRef = useRef<any>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);
  const blurTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (blurTimerRef.current) clearTimeout(blurTimerRef.current);
    };
  }, []);

  const fetchSuggestions = async (text: string) => {
    const requestId = ++requestIdRef.current;
    try {
      const places = await loadPlacesLib();
      if (!places?.AutocompleteSuggestion) return;
      if (!sessionTokenRef.current) {
        sessionTokenRef.current = new places.AutocompleteSessionToken();
      }
      const { suggestions: results } = await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
        input: text,
        sessionToken: sessionTokenRef.current,
        includedRegionCodes: ['us'],
        locationBias: LOCATION_BIAS,
      });
      if (requestId !== requestIdRef.current) return;
      const views: SuggestionView[] = (results ?? [])
        .filter((s: any) => s.placePrediction)
        .map((s: any, i: number) => ({
          id: s.placePrediction.placeId ?? String(i),
          main: s.placePrediction.mainText?.text ?? s.placePrediction.text?.text ?? '',
          secondary: s.placePrediction.secondaryText?.text ?? '',
          prediction: s.placePrediction,
        }));
      setSuggestions(views);
      setOpen(views.length > 0);
      setActiveIndex(-1);
    } catch (err) {
      if (requestId === requestIdRef.current) {
        setSuggestions([]);
        setOpen(false);
      }
      console.error('Address autocomplete failed:', err);
    }
  };

  const handleChange = (text: string) => {
    setValue(text);
    // Manual edits invalidate any previously selected place.
    setStructured(EMPTY_STRUCTURED);
    if (!MAPS_KEY) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (text.trim().length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    debounceRef.current = setTimeout(() => fetchSuggestions(text.trim()), 250);
  };

  const selectSuggestion = async (view: SuggestionView) => {
    setOpen(false);
    setSuggestions([]);
    setValue(`${view.main}${view.secondary ? `, ${view.secondary}` : ''}`);
    try {
      const place = view.prediction.toPlace();
      await place.fetchFields({
        fields: ['formattedAddress', 'addressComponents', 'location', 'id'],
      });
      const comps: any[] = place.addressComponents ?? [];
      const comp = (type: string, short = false) =>
        comps.find((c) => c.types?.includes(type))?.[short ? 'shortText' : 'longText'] ?? '';
      const street = `${comp('street_number')} ${comp('route')}`.trim();
      if (place.formattedAddress) setValue(place.formattedAddress);
      setStructured({
        address1: street,
        city: comp('locality') || comp('sublocality') || comp('neighborhood'),
        state: comp('administrative_area_level_1', true),
        zip: comp('postal_code'),
        lat: place.location ? String(place.location.lat()) : '',
        lng: place.location ? String(place.location.lng()) : '',
        placeId: place.id ?? '',
      });
    } catch (err) {
      console.error('Failed to fetch place details:', err);
    } finally {
      // A selection ends the billing session; the next keystroke starts a new one.
      sessionTokenRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[activeIndex]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div className="autocomplete">
      <input
        name="address"
        value={value}
        placeholder="Street address"
        required
        autoComplete="street-address"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (MAPS_KEY) loadPlacesLib().catch(() => undefined);
          if (suggestions.length > 0) setOpen(true);
        }}
        onBlur={() => {
          blurTimerRef.current = setTimeout(() => setOpen(false), 150);
        }}
      />
      {open && suggestions.length > 0 ? (
        <ul className="autocomplete__list" role="listbox" onMouseDown={(e) => e.preventDefault()}>
          {suggestions.map((s, i) => (
            <li
              key={s.id}
              role="option"
              aria-selected={i === activeIndex}
              className={`autocomplete__item${i === activeIndex ? ' autocomplete__item--active' : ''}`}
              onClick={() => selectSuggestion(s)}
            >
              {s.main}
              {s.secondary ? <span className="autocomplete__secondary">{s.secondary}</span> : null}
            </li>
          ))}
          <li className="autocomplete__attribution" aria-hidden="true">
            powered by Google
          </li>
        </ul>
      ) : null}
      <input type="hidden" name="address1" value={structured.address1} />
      <input type="hidden" name="city" value={structured.city} />
      <input type="hidden" name="state" value={structured.state} />
      <input type="hidden" name="zip" value={structured.zip} />
      <input type="hidden" name="lat" value={structured.lat} />
      <input type="hidden" name="lng" value={structured.lng} />
      <input type="hidden" name="place_id" value={structured.placeId} />
    </div>
  );
}
