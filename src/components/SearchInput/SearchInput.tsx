import IconSvg from "../IconSvg/IconSvg";
import styles from "./SearchInput.module.scss";
import type { ChangeEvent } from "react";

type SearchInputProps = {
  value: string;
  parentMethod: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchInput({ value, parentMethod }: SearchInputProps) {
  return (
    <div className={styles.searchInputContainer}>
      <IconSvg iconName="search" />
      <input
        className={`${styles.searchInput} text-preset-5-medium`}
        type="text"
        placeholder="Search for a place..."
        name="search-input"
        value={value}
        onChange={parentMethod}
      />
    </div>
  );
}
