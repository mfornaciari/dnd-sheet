import i18next from 'i18next';

export default function LoadingMessage() {
  const i18nMessage = i18next.t('loading');

  return (
    <div role='status' aria-labelledby='loading-text' className='loading-div'>
      <p id='loading-text' className='loading-text'>
        <strong>{i18nMessage}</strong>
      </p>
    </div>
  );
}
