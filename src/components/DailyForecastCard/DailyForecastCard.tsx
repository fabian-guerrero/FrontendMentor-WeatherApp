import styles from "./DailyForecastCard.module.scss";
import ForecastIcon from "../ForecastIcon/ForecastIcon";
import { roundValue, formatDateDay } from "../../utils/mathConvertions";

type DailyForecastCardProps = {
  key: number;
  date: string;
  icon: number;
  max: number;
  min: number;
};

export default function DailyForecastCard({
  key,
  date,
  icon,
  max,
  min,
}: DailyForecastCardProps) {
  return (
    <div key={key} className={styles.dailyForecastCard}>
      <p className={`${styles.dayLabel} text-preset-6`}>
        {formatDateDay(date)}
      </p>
      <ForecastIcon weatherCode={icon} size="medium" />
      <div className={styles.temperatureWrapper}>
        <p className={`${styles.temperature} text-preset-7`}>
          {roundValue(max)}°
        </p>
        <p className={`${styles.temperature} text-preset-7`}>
          {roundValue(min)}°
        </p>
      </div>
    </div>
  );
}
