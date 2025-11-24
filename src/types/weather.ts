export interface LocationData {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  date: Date;
  temperature: number;
  weatherCode: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  latitude?: number;
  longitude?: number;
}

export interface DailyItem {
  date: Date;
  min: number;
  max: number;
  icon: number;
}

export interface HourlyItem {
  date: Date;
  temperature: number;
  weatherCode: number;
}

export interface WeatherData {
  location: string;
  country: string;
  current: CurrentWeather;
  daily: DailyItem[];
  hourly: HourlyItem[];
}

export type GroupedHourly = Record<string, HourlyItem[]>;
