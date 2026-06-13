'use client';

import { useEffect, useRef, useState } from 'react';

const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

// Bias toward Palm Beach + Broward counties.
const BOUNDS = { south: 25.85, west: -80.55, north: 26.99, east: -79.95 };

type StructuredAddress = {
  address1: string;
  city: string;
  state: string;
  zip: string;
  lat: string;
  lng: string;
  placeId: string;
};

const EMPTY: StructuredAddress = {
  address1: '',
  city: '',
  state: '',
  zip: '',
  lat: '',
  lng: '',
  placeId: '',
};

let scriptLoading = false;
let scriptReady = false;
const readyCallbacks: Array<() => void> = [];

function loadMapsScript(onReady: () => void) {
  if (scriptReady) { onReady(); return; }
  readyCallbacks.push(onReady);
  if (scriptLoading) return;
  scriptLoading = true;
  const w = window as any;
  const callbackName = '__c4h_gm_cb';
  w[callbackName] = () => {
    scriptReady = true;
    readyCallbacks.forEach((cb) => cb());
    readyCallbacks.length = 0;
  };
  const s = document.createElement('script');
  s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(MAPS_KEY)}&libraries=places&v=weekly&callback=${callbackName}`;
  s.async = true;
  s.defer = true;
  document.head.appendChild(s);
}

export function AddressAutocomplete({ defaultValue }: { defaultValue?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const acRef = useRef<any>(null);
  const [structured, setStructured] = useState<StructuredAddress>(EMPTY);

  useEffect(() => {
    if (!MAPS_KEY || !inputRef.current) return;

    function initAutocomplete() {
      if (!inputRef.current) return;
      const g = (window as any).google.maps;
      const ac = new g.places.Autocomplete(inputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'us' },
        bounds: new g.LatLngBounds(
          { lat: BOUNDS.south, lng: BOUNDS.west },
          { lat: BOUNDS.north, lng: BOUNDS.east },
        ),
        strictBounds: false,
        fields: ['address_components', 'formatted_address', 'geometry', 'place_id'],
      });

      ac.addListener('place_changed', () => {
        const place = ac.getPlace();
        if (!place.address_components) return;

        const comp = (type: string, short = false) =>
          place.address_components.find((c: any) => c.types.includes(type))?.[
            short ? 'short_name' : 'long_name'
          ] ?? '';

        const streetNum = comp('street_number');
        const route = comp('route');
        const address1 = [streetNum, route].filter(Boolean).join(' ');
        const city =
          comp('locality') || comp('sublocality_level_1') || comp('neighborhood');
        const state = comp('administrative_area_level_1', true);
        const zip = comp('postal_code');
        const lat = place.geometry?.location ? String(place.geometry.location.lat()) : '';
        const lng = place.geometry?.location ? String(place.geometry.location.lng()) : '';

        if (place.formatted_address && inputRef.current) {
          inputRef.current.value = place.formatted_address;
        }

        setStructured({
          address1,
          city,
          state,
          zip,
          lat,
          lng,
          placeId: place.place_id ?? '',
        });
      });

      acRef.current = ac;
    }

    loadMapsScript(initAutocomplete);
  }, []);

  return (
    <div className="autocomplete">
      <input
        ref={inputRef}
        name="address"
        defaultValue={defaultValue ?? ''}
        placeholder="Street address"
        required
        autoComplete="off"
        onChange={() => setStructured(EMPTY)}
      />
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
