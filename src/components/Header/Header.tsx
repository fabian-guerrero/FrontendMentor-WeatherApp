import styles from "./Header.module.scss";
import logo from "/images/logo.png";
import UnitsSelector from "../UnitsSelector/UnitsSelector";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoSelectorContainer}>
        <img className={styles.logo} src={logo} alt="Weather Now" />
        <div className="units-selector">
          <UnitsSelector />
        </div>
      </div>
    </header>
  );
}
