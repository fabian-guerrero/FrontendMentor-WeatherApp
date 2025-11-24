import styles from "./UnitsSelector.module.scss";

import IconSvg from "../IconSvg/IconSvg";
import { useState } from "react";
import { useUnits } from "../../context";

export default function UnitsSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { units, setUnits } = useUnits();

  const handleUnitsSelector = () => {
    setIsOpen(!isOpen);
  };

  const toggleUnits = () => {
    setUnits(units === "metric" ? "imperial" : "metric");
  };

  const isImperial = units === "imperial";

  return (
    <div className={styles.unitsSelector}>
      <button onClick={handleUnitsSelector} className={styles.unitsButton}>
        <IconSvg iconName="cog" />
        <span className={`${styles.label} text-preset-7`}>Units</span>
        <IconSvg iconName="chevron-down" />
      </button>
      {isOpen && (
        <div className={styles.unitsWrapper}>
          <button
            onClick={toggleUnits}
            className={`${styles.toggleUnits} text-preset-7`}
          >
            Switch to {isImperial ? "Metric" : "Imperial"}
          </button>
          <div className={styles.weatherVariable}>
            <p className={`${styles.weatherVariableName} text-preset-8`}>
              Temperature
            </p>
            <p
              className={`${styles.weatherVariableUnit} ${
                !isImperial ? styles.active : ""
              } text-preset-7`}
            >
              Celsius (°C)
            </p>
            <p
              className={`${styles.weatherVariableUnit} ${
                isImperial ? styles.active : ""
              } text-preset-7`}
            >
              Fahrenheit (°F)
            </p>
          </div>
          <div className={styles.weatherVariable}>
            <p className={`${styles.weatherVariableName} text-preset-8`}>
              Wind Speed
            </p>
            <p
              className={`${styles.weatherVariableUnit} ${
                !isImperial ? styles.active : ""
              } text-preset-7`}
            >
              km/h
            </p>
            <p
              className={`${styles.weatherVariableUnit} ${
                isImperial ? styles.active : ""
              } text-preset-7`}
            >
              mph{" "}
            </p>
          </div>
          <div className={styles.weatherVariable}>
            <p className={`${styles.weatherVariableName} text-preset-8`}>
              Precipitation
            </p>
            <p
              className={`${styles.weatherVariableUnit} ${
                !isImperial ? styles.active : ""
              } text-preset-7`}
            >
              Millimeters (mm)
            </p>
            <p
              className={`${styles.weatherVariableUnit} ${
                isImperial ? styles.active : ""
              } text-preset-7`}
            >
              Inches (in)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
