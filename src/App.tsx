import "./App.scss";

import { useState, useEffect } from "react";
import { useWeather } from "./hooks/useWeather";
import type { LocationData } from "./types/weather";
import Header from "./components/Header/Header.tsx";
import SearchBar from "./components/SearchBar/SearchBar.tsx";
import WeatherInfoCard from "./components/WeatherInfoCard/WeatherInfoCard.tsx";
import WeatherDetailCard from "./components/WeatherDetailCard/WeatherDetailCard.tsx";
import DailyForecastCard from "./components/DailyForecastCard/DailyForecastCard.tsx";
import DaySelector from "./components/DaySelector/DaySelector.tsx";
import HourlyWeatherCard from "./components/HourlyWeatherCard/HourlyWeatherCard.tsx";

function App() {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );

  const { weather, loadingWeather, errorWeather } =
    useWeather(selectedLocation);

  const [selectedDate, setSelectedDate] = useState<string>("");

  const availableDates = weather
    ? weather.daily.map((d) => d.date.toISOString())
    : [];

  const getHourlyForDay = () => {
    if (!weather || !selectedDate) return [];

    const selectedDay = new Date(selectedDate).toDateString();
    const now = new Date();

    let hours = weather.hourly.filter(
      (h) => h.date.toDateString() === selectedDay
    );

    if (selectedDay === now.toDateString()) {
      hours = hours.filter((h) => h.date >= now);
    }

    if (hours.length < 8) {
      const nextDay = weather.daily.find(
        (d) => d.date.toDateString() !== selectedDay
      );
      if (nextDay) {
        const nextDayHours = weather.hourly.filter(
          (h) => h.date.toDateString() === nextDay.date.toDateString()
        );
        hours = [...hours, ...nextDayHours];
      }
    }

    return hours.slice(0, 8);
  };

  const hourlyForDay = getHourlyForDay();

  useEffect(() => {
    if (weather && availableDates.length > 0) {
      const today = new Date().toDateString();
      const todayMatch = availableDates.find(
        (d) => new Date(d).toDateString() === today
      );
      setSelectedDate(todayMatch || availableDates[0]);
    }

    console.log(weather);
  }, [weather]);

  return (
    <>
      <Header />
      <div>
        <h1 className="mainTitle text-preset-2">
          How’s the sky looking today?
        </h1>
        <SearchBar onSelectLocation={setSelectedLocation} />
      </div>
      <main>
        {loadingWeather && <p>Cargando clima...</p>}
        {errorWeather && <p>{errorWeather}</p>}
        {weather && (
          <div className="searchResultWrapper">
            <WeatherInfoCard data={weather} />
            <div className="weatherDetailsContainer">
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
            <div className="hourlyForecastContainer">
              <div className="headerWrapper">
                <p className="title text-preset-5">Hourly Forecast</p>
                <DaySelector
                  availableDates={availableDates}
                  selectedDate={selectedDate || availableDates[0]}
                  onSelect={setSelectedDate}
                />
              </div>
              <div className="hourlyCardContainer">
                {hourlyForDay.map((item, index) => (
                  <HourlyWeatherCard
                    key={index}
                    date={item.date.toString()}
                    icon={item.weatherCode}
                    temperature={item.temperature}
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
