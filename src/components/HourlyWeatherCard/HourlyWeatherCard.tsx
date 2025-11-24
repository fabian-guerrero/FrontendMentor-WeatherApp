import styles from "./HourlyWeatherCard.module.scss";
import ForecastIcon from "../ForecastIcon/ForecastIcon";
import {
  roundValueOneDecimal,
  formatDateHour,
} from "../../utils/mathConvertions";

type HourlyWeatherCardProps = {
  date: string;
  icon: number;
  temperature: number;
};

export default function HourlyWeatherCard({
  date,
  icon,
  temperature,
}: HourlyWeatherCardProps) {
  return (
    <div className={styles.hourlyWeatherCard}>
      <div className={styles.iconContainer}>
        <ForecastIcon weatherCode={icon} size="small" />
      </div>
      <div className={styles.timeTempContainer}>
        <p className={`${styles.time} text-preset-5-medium`}>
          {formatDateHour(date)}
        </p>
        <p className={`${styles.temparature} text-preset-7`}>
          {roundValueOneDecimal(temperature)}°
        </p>
      </div>
    </div>
  );
}
