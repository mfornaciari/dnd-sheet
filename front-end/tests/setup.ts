import '@testing-library/jest-dom';
import i18next from 'i18next';
import ptbr from '../locales/pt-BR.json';

i18next.init({
  lng: 'ptbr',
  debug: false,
  resources: ptbr
});

const mockGenerateURL = jest.fn();
jest.mock('@/helpers/formHelpers', () => {
  const original = jest.requireActual('@/helpers/formHelpers');

  return {
    ...original,
    generateURL: mockGenerateURL,
  };
});
mockGenerateURL.mockReturnValue('http://localhost:3000/mockURL');
