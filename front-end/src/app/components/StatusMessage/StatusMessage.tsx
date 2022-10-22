import "./StatusMessage.css";
import i18next from "i18next";

type StatusMessageProps = {
  message: string;
}

export function StatusMessage({ message }: StatusMessageProps) {
  const i18nMessage = i18next.t(message);

  return (
    <div id="status-div" role="status" aria-labelledby="status-text">
      <p id="status-text">
        <strong>{i18nMessage}</strong>
      </p>
    </div>
  );
}
