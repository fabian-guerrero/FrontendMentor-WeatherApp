import styles from "./DaySelector.module.scss";

import { useState } from "react";
import IconSvg from "../IconSvg/IconSvg";

interface DaySelectorProps {
  availableDates: string[];
  selectedDate: string;
  onSelect: (date: string) => void;
}

export default function DaySelector({
  availableDates,
  selectedDate,
  onSelect,
}: DaySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDaySelector = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectDate = (date: string) => {
    onSelect(date);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.selectWrapper} text-preset-7`}>
      <button
        onClick={handleDaySelector}
        className={styles.daySelector}
        role="combobox"
        id="select"
        value="Select"
        aria-controls="listbox"
        aria-haspopup="listbox"
        aria-expanded="false"
      >
        {new Date(selectedDate).toLocaleDateString("en-EN", {
          weekday: "long",
        })}
        <IconSvg iconName="chevron-down" />
      </button>
      {isOpen && (
        <ul
          className={`${styles.daysList} text-preset-7`}
          role="listbox"
          id="listbox"
        >
          {availableDates.map((date) => (
            <li
              key={date}
              className={`${styles.dayItem} ${
                date === selectedDate ? styles.active : ""
              }`}
              role="option"
              aria-selected={date === selectedDate}
              onClick={() => handleSelectDate(date)}
            >
              {new Date(date).toLocaleDateString("en-EN", {
                weekday: "long",
              })}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
