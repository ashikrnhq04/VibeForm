import { fetchCities } from "@/features/JobApplicationForm/data";
import { useEffect, useRef, useState } from "react";

export function useCities(country: string | null) {
  const [cities, setCities] = useState<{ text: string; value: string }[]>([]);
  const cache = useRef<Record<string, { text: string; value: string }[]>>({});

  let unMounted = false;

  useEffect(() => {
    if (!country) {
      return;
    }

    if (cache.current[country]) {
      setCities(cache.current[country]);
      return;
    }

    (async () => {
      try {
        const data = await fetchCities(country);
        if (!unMounted) {
          setCities(data);
          cache.current[country] = data;
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
        return;
      }
    })();

    return () => {
      unMounted = true;
    };
  }, [country]);

  return cities;
}
