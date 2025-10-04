import { useEffect, useState } from "react";

// Debounce any changing value and return the debounced value after `delay` ms
// Usage: const debouncedSearch = useDebounce(search, 300)
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
