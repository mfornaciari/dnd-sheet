import i18next from 'i18next';

type StatusMessageProps = {
  message: string,
}

export default function StatusMessage({ message }: StatusMessageProps) {
  const i18nMessage = i18next.t(message);

  return (
    <div role='status' aria-labelledby='status-text' className='status-div'>
      <p id='status-text'>
        <strong>{i18nMessage}</strong>
      </p>
    </div>
  );
}
