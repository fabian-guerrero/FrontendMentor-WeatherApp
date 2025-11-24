import styles from "./ForecastIcon.module.scss";

type ForecastIconProps = {
  weatherCode: number;
  size: "small" | "medium" | "large";
};

export default function ForecastIcon({ weatherCode, size }: ForecastIconProps) {
  let weatherIcon = "";

  switch (weatherCode) {
    case 0:
    case 1:
      weatherIcon = "clear-sunny";
      break;
    case 2:
      weatherIcon = "partly-cloudy";
      break;
    case 3:
      weatherIcon = "overcast";
      break;
    case 45:
    case 48:
      weatherIcon = "fog";
      break;
    case 51:
    case 53:
    case 55:
      weatherIcon = "drizzle";
      break;
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      weatherIcon = "rain";
      break;
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      weatherIcon = "snow";
      break;
    case 95:
    case 96:
    case 99:
      weatherIcon = "thunderstorms";
      break;
    default:
      weatherIcon = "clear-sunny";
      break;
  }

  return (
    <img
      className={`${styles[size]}`}
      src={`./images/${weatherIcon}.svg`}
      alt={`${weatherIcon} image`}
    />
  );
}
