import { ReactSVG } from "react-svg";
import styles from "./IconSvg.module.scss";

type IconSvgProps = {
  iconName: string;
};

export default function IconSvg({ iconName }: IconSvgProps) {
  return (
    <ReactSVG
      src={`./icons/${iconName}.svg`}
      wrapper="span"
      className={`${styles.iconSvg} ${styles[iconName]}`}
    />
  );
}
