// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  
  disconnect() {
    return null;
  }
  
  observe() {
    return null;
  }
  
  unobserve() {
    return null;
  }
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn(),
});

// Mock getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    getPropertyValue: jest.fn(),
  })),
});

// Suppress console warnings in tests
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args) => {
    const warningString = args.join(' ');
    // Suppress specific warnings
    if (
      warningString.includes('componentWillReceiveProps') ||
      warningString.includes('componentWillUpdate') ||
      warningString.includes('componentWillMount')
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});