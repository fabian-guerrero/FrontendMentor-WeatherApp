import "./App.scss";

import { useState } from "react";
import { useWeather } from "./hooks/useWeather";
import type { LocationData } from "./types/weather";
import Header from "./components/Header/Header.tsx";
import SearchBar from "./components/SearchBar/SearchBar.tsx";
import WeatherInfoCard from "./components/WeatherInfoCard/WeatherInfoCard";
import WeatherDetailCard from "./components/WeatherDetailCard/WeatherDetailCard.tsx";

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
            <div className="WeatherDetailsContainer">
              <WeatherDetailCard
                label="Feels Like"
                value={weather.current.feelsLike}
              />
              <WeatherDetailCard
                label="Humidity"
                value={weather.current.humidity}
              />
              <WeatherDetailCard
                label="Wind"
                value={weather.current.windSpeed}
              />
              <WeatherDetailCard
                label="Precipitation"
                value={weather.current.precipitation}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
