"use client";

import { useEffect, useState } from "react";

type PlaceResult = {
  display_name: string;
  lat: string;
  lon: string;
};

type PlaceSearchInputProps = {
  defaultValue?: string;
};

export default function PlaceSearchInput({
  defaultValue = "",
}: PlaceSearchInputProps) {
  const [query, setQuery] = useState(defaultValue);
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length < 3) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(
            query
          )}`
        );

        const data = await response.json();
        setResults(data || []);
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  function selectPlace(place: PlaceResult) {
    setSelectedPlace(place);
    setQuery(place.display_name);
    setResults([]);
  }

  return (
    <div className="relative sm:col-span-2">
      <input
        name="birth_place"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedPlace(null);
        }}
        className="field w-full"
        placeholder="Search Birth Place / City"
      />

      <input
        type="hidden"
        name="birth_latitude"
        value={selectedPlace?.lat || ""}
      />

      <input
        type="hidden"
        name="birth_longitude"
        value={selectedPlace?.lon || ""}
      />

      <input type="hidden" name="birth_timezone" value="5.5" />

      {loading && (
        <p className="mt-2 text-sm text-[#B784A7]">Searching places...</p>
      )}

      {results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-[1.25rem] border border-[#E6C89C]/50 bg-white p-2 shadow-xl">
          {results.map((place) => (
            <button
              key={`${place.lat}-${place.lon}-${place.display_name}`}
              type="button"
              onClick={() => selectPlace(place)}
              className="block w-full rounded-xl px-4 py-3 text-left text-sm text-[#5C3A57] transition hover:bg-[#F6EEE8]"
            >
              {place.display_name}
            </button>
          ))}
        </div>
      )}

      {selectedPlace && (
        <p className="mt-2 text-xs text-[#6F5B69]">
          Coordinates saved: {selectedPlace.lat}, {selectedPlace.lon}
        </p>
      )}
    </div>
  );
}