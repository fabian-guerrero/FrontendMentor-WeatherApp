import "./App.scss";

import { useState } from "react";
import { useWeather } from "./hooks/useWeather";
import type { LocationData } from "./types/weather";
import Header from "./components/Header/Header.tsx";
import SearchBar from "./components/SearchBar/SearchBar.tsx";
import WeatherInfoCard from "./components/WeatherInfoCard/WeatherInfoCard";

function App() {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );
  const { weather, loadingWeather, errorWeather } =
    useWeather(selectedLocation);

  return (
    <>
      <Header />
      <h1 className="mainTitle text-preset-2">How’s the sky looking today?</h1>
      <SearchBar onSelectLocation={setSelectedLocation} />

      <main>
        {loadingWeather && <p>Cargando clima...</p>}
        {errorWeather && <p>{errorWeather}</p>}
        {weather && (
          <div className="searchResultWrapper">
            <WeatherInfoCard data={weather} />
          </div>
        )}
      </main>
    </>
  );
}

export default App;
