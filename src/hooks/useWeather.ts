import { useState, useEffect } from "react";
import { fetchWeatherApi } from "openmeteo";
import { buildParams } from "../utils/weather";
import { useUnits } from "../context";
import type { WeatherData, LocationData } from "../types/weather";

export function useWeather(selectedLocation: LocationData | null) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [errorWeather, setErrorWeather] = useState<string | null>(null);
  const { units } = useUnits();

  useEffect(() => {
    const fetchWeather = async () => {
      if (!selectedLocation) return;

      try {
        setLoadingWeather(true);
        setErrorWeather(null);

        const params = buildParams(
          selectedLocation.latitude,
          selectedLocation.longitude,
          units
        );
        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);

        const response = responses[0];
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const current = response.current()!;
        const hourly = response.hourly()!;
        const daily = response.daily()!;

        const parsed: WeatherData = {
          location: selectedLocation.name,
          country: selectedLocation.country,
          current: {
            date: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature: current.variables(0)!.value(),
            weatherCode: current.variables(4)!.value(),
            feelsLike: current.variables(1)!.value(),
            humidity: current.variables(5)!.value(),
            windSpeed: current.variables(3)!.value(),
            precipitation: current.variables(2)!.value(),
          },
          daily: [
            ...Array(
              (Number(daily.timeEnd()) - Number(daily.time())) /
                daily.interval()
            ),
          ].map((_, i) => ({
            date: new Date(
              (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
                1000
            ),
            min: daily.variables(1)!.valuesArray()![i],
            max: daily.variables(0)!.valuesArray()![i],
            icon: daily.variables(2)!.valuesArray()![i],
          })),
          hourly: [
            ...Array(
              (Number(hourly.timeEnd()) - Number(hourly.time())) /
                hourly.interval()
            ),
          ].map((_, i) => ({
            date: new Date(
              (Number(hourly.time()) +
                i * hourly.interval() +
                utcOffsetSeconds) *
                1000
            ),
            temperature: hourly.variables(0)!.valuesArray()![i],
            weatherCode: hourly.variables(1)!.valuesArray()![i],
          })),
        };

        setWeather(parsed);
      } catch (err) {
        console.error(err);
        setErrorWeather("Error al cargar datos de clima");
        setWeather(null);
      } finally {
        setLoadingWeather(false);
      }
    };

    fetchWeather();
  }, [selectedLocation, units]);

  return { weather, loadingWeather, errorWeather };
}
