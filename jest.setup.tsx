// Extend Jest with Testing Library matchers
import '@testing-library/jest-dom';

// Mock next/image for testing
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const { src, alt, ...rest } = props;
    return <img {...(rest as React.HTMLAttributes<HTMLImageElement>)} src={src as string} alt={alt || ''} />;
  },
}));

// Mock next/router for testing
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}));
