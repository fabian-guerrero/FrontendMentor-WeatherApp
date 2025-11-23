import styles from "./Button.module.scss";

type ButtonProps = {
  label: string;
  type?: "submit" | "button";
};

export default function Button({ label, type }: ButtonProps) {
  return (
    <button type={type} className={`${styles.button} text-preset-5-medium`}>
      {label}
    </button>
  );
}
