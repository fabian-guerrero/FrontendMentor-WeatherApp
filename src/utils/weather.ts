import type { WeatherData } from "../types/weather";
import type { Units } from "../context/UnitsContext";

export function buildParams(latitude: number, longitude: number, units: Units) {
  return {
    latitude,
    longitude,
    current: [
      "temperature_2m",
      "apparent_temperature",
      "precipitation",
      "wind_speed_10m",
      "weather_code",
      "relative_humidity_2m",
    ],
    hourly: ["temperature_2m", "weather_code"],
    daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
    temperature_unit: units === "metric" ? "celsius" : "fahrenheit",
    wind_speed_unit: units === "metric" ? "kmh" : "mph",
    precipitation_unit: units === "metric" ? "mm" : "inch",
    timezone: "auto",
  };
}

export function parseWeatherResponse(
  response: any,
  location: string,
  country: string
): WeatherData {
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  return {
    location,
    country,
    current: {
      date: current.time(),
      temperature: current.variables(0)!.value(),
      weatherCode: current.variables(4)!.value(),
      feelsLike: current.variables(1)!.value(),
      humidity: current.variables(5)!.value(),
      windSpeed: current.variables(3)!.value(),
      precipitation: current.variables(2)!.value(),
      latitude: response.latitude(),
      longitude: response.longitude(),
    },
    daily: [
      ...Array(
        (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval()
      ),
    ].map((_, i) => ({
      date: new Date(
        (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000
      ),
      min: daily.variables(1)!.valuesArray()[i],
      max: daily.variables(0)!.valuesArray()[i],
      icon: daily.variables(2)!.valuesArray()[i],
    })),
    hourly: [
      ...Array(
        (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval()
      ),
    ].map((_, i) => ({
      date: new Date(
        (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
          1000
      ),
      temperature: hourly.variables(0)!.valuesArray()[i],
      weatherCode: hourly.variables(1)!.valuesArray()[i],
    })),
  };
}

export function groupHourlyByDay(
  times: Date[],
  temps: number[],
  codes: number[]
) {
  const grouped: Record<
    string,
    { date: Date; temperature: number; weatherCode: number }[]
  > = {};

  times.forEach((time, i) => {
    const dayKey = time.toISOString().split("T")[0];
    if (!grouped[dayKey]) grouped[dayKey] = [];
    grouped[dayKey].push({
      date: time,
      temperature: temps[i],
      weatherCode: codes[i],
    });
  });

  return grouped;
}
