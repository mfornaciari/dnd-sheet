import '@testing-library/jest-dom';
import i18next from 'i18next';
import ptbr from '../locales/pt-BR.json';

i18next.init({
  lng: 'ptbr',
  debug: false,
  resources: ptbr
});

const mockGenerateUrl = jest.fn();
jest.mock('@/services/generateURL', () => mockGenerateUrl);
mockGenerateUrl.mockReturnValue('http://localhost:3000/mockURL');
