import styles from "./WeatherInfoCard.module.scss";

import type { WeatherData } from "../../types/weather";
import ForecastIcon from "../ForecastIcon/ForecastIcon";
import { roundValueOneDecimal } from "../../utils/mathConvertions";

interface Props {
  data: WeatherData;
}

export default function WeatherInfoCard({ data }: Props) {
  const { location, country, current } = data;

  const dateString = new Date();
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleString("en-US", options);

  const formatTemperature = (temp: number) => `${roundValueOneDecimal(temp)}`;

  return (
    <div className={styles.weatherInfoCard}>
      <div className={styles.locationInfoWrapper}>
        <p className={`${styles.location} text-preset-4`}>
          {location}, {country}
        </p>
        <p className={`${styles.date} text-preset-6`}>{formattedDate}</p>
      </div>
      <div className={styles.temperatureWrapper}>
        <div className={styles.temperatureIcon}>
          <ForecastIcon weatherCode={current.weatherCode} size="large" />
        </div>
        <p className={`${styles.temparature} text-preset-1`}>
          {formatTemperature(current.temperature)}°
        </p>
      </div>
    </div>
  );
}
