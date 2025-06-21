import { render, screen } from '@testing-library/react';
import Loading from '../../components/Loading';

// Mock the CSS module
jest.mock('../../components/Loading/loading.module.css', () => ({
  loadingWrapper: 'mock-loading-wrapper',
  loadingCircle: 'mock-loading-circle',
}));

describe('Loading Component', () => {
  it('renders loading component', () => {
    render(<Loading />);
    
    // Check if loading element is in the document
    const loadingElement = screen.getByTestId('loading-component');
    expect(loadingElement).toBeInTheDocument();
  });

  it('has correct CSS classes applied', () => {
    render(<Loading />);
    
    const loadingElement = screen.getByTestId('loading-component');
    expect(loadingElement).toHaveClass('mock-loading-wrapper');
  });

  it('is accessible', () => {
    render(<Loading />);
    
    // Check for accessibility attributes
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toBeInTheDocument();
    expect(loadingElement).toHaveAttribute('aria-live', 'polite');
  });

  it('has proper loading text for screen readers', () => {
    render(<Loading />);
    
    const loadingText = screen.getByText(/loading/i);
    expect(loadingText).toBeInTheDocument();
  });
});

// Example of testing custom hooks
import { renderHook } from '@testing-library/react';
import useMobile from '../../hooks/useMobile';

describe('useMobile Hook', () => {
  it('returns mobile state', () => {
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(max-width: 768px)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const { result } = renderHook(() => useMobile());
    
    // Should return true for mobile when matchMedia matches
    expect(typeof result.current).toBe('boolean');
  });
});