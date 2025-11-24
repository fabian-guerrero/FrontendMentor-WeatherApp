import { useState } from "react";

import styles from "./SearchBar.module.scss";
import SearchInput from "../SearchInput/SearchInput.tsx";
import Button from "../Button/Button.tsx";
import IconSvg from "../IconSvg/IconSvg";

type LocationData = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
};

interface Props {
  onSelectLocation: (location: LocationData) => void;
}

export default function SearchBar({ onSelectLocation }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        query
      )}&count=10&language=en&format=json`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Error en la búsqueda de ciudades");

      const data = await response.json();
      setResults(data.results || []);
      setShowResults(true);
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con la API de geocodificación");
      setResults([]);
      setShowResults(false);
    } finally {
      setLoading(false);
    }
  };

  const handleClickLocation = (item: LocationData) => {
    onSelectLocation(item);
    setQuery("");
    setShowResults(false);
    setResults([]);
  };

  return (
    <form className={styles.searchBarWrapper} onSubmit={handleSubmit}>
      <div className={styles.searchInput}>
        <SearchInput
          value={query}
          parentMethod={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
        />
        {loading && (
          <div className={styles.loadingResultsWrapper}>
            <span className={`${styles.loadingMessage} text-preset-7`}>
              <IconSvg iconName="spinner" /> Search in progress
            </span>
          </div>
        )}
        {showResults && results.length > 0 && (
          <div className={styles.searchResults}>
            <ul className={styles.searchResultsList}>
              {results.map((item: LocationData) => (
                <li
                  key={item.id}
                  className={`${styles.searchResultItem} text-preset-7`}
                  onClick={() => handleClickLocation(item)}
                >
                  {item.name}, {item.country}
                </li>
              ))}
            </ul>
          </div>
        )}
        {error && <p className="errorMessage">{error}</p>}
      </div>

      <Button label="Search" />
    </form>
  );
}
