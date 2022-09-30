import '@testing-library/jest-dom';
import '@/services/i18n.ts';

const mockGenerateUrl = jest.fn();
jest.mock('@/services/generateURL', () => mockGenerateUrl);
mockGenerateUrl.mockReturnValue('http://localhost:3000/mockURL');
