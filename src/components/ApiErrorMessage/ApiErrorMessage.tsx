import styles from "./ApiErrorMessage.module.scss";
import IconSvg from "../IconSvg/IconSvg";

interface Props {
  onRetry: () => void;
}

export default function Button({ onRetry }: Props) {
  return (
    <div className={styles.apiErrorMessage}>
      <IconSvg iconName="ban" />
      <p className={`${styles.title} text-preset-2`}>Something went wrong.</p>
      <p className={`${styles.subtitle} text-preset-5-medium`}>
        We couldn’t connect to the server (API error). Please try again in a few
        moments.
      </p>
      <button
        className={`${styles.retryButton} text-preset-7`}
        name="favorito"
        type="button"
        onClick={onRetry}
      >
        <IconSvg iconName="retry" />
        Retry
      </button>
    </div>
  );
}
