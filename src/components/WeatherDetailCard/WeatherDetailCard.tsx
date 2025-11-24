import styles from "./WeatherDetailCard.module.scss";

import { roundValueOneDecimal, roundValue } from "../../utils/mathConvertions";
import { useUnits } from "../../context/useUnits";

type WeatherDetailCardProps = {
  label: string;
  value: number;
};

export default function WeatherDetailCard({
  label,
  value,
}: WeatherDetailCardProps) {
  const { units } = useUnits();

  return (
    <div className={styles.weatherDetailCard}>
      <p className={`${styles.detailTitle} text-preset-6`}>{label}</p>
      <p className={`${styles.detailInfo} text-preset-3`}>
        {label === "Feels Like" && `${roundValueOneDecimal(value)}°`}
        {label === "Humidity" && `${roundValue(value)}%`}
        {label === "Wind" &&
          `${roundValue(value)} ${units === "metric" ? "Km/h" : "mph"}`}
        {label === "Precipitation" &&
          `${roundValueOneDecimal(value)} ${units === "metric" ? "mm" : "in"}`}
      </p>
    </div>
  );
}
