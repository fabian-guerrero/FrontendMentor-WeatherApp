import "./App.scss";

import { useState } from "react";
import { useWeather } from "./hooks/useWeather";
import type { LocationData } from "./types/weather";
import Header from "./components/Header/Header.tsx";
import SearchBar from "./components/SearchBar/SearchBar.tsx";
import WeatherInfoCard from "./components/WeatherInfoCard/WeatherInfoCard.tsx";
import WeatherDetailCard from "./components/WeatherDetailCard/WeatherDetailCard.tsx";
import DailyForecastCard from "./components/DailyForecastCard/DailyForecastCard.tsx";

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
            <div className="dailyForecastContainer">
              <p className="title text-preset-5">Daily forecast</p>
              <div className="dailyCardContainer">
                {weather.daily.map((item, index) => (
                  <DailyForecastCard
                    key={index}
                    date={item.date.toString()}
                    icon={item.icon}
                    max={item.max}
                    min={item.min}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
