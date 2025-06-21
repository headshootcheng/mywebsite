// Breakpoints for responsive design
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
} as const;

// Animation durations
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Scroll behavior constants
export const SCROLL_BEHAVIOR = {
  OFFSET: 100,
  MENU_HIDE_DELAY: 2000,
  MOBILE_MENU_HEIGHT_RATIO: 80,
} as const;

// SEO constants
export const SEO_CONFIG = {
  titleTemplate: '%s | Portfolio',
  defaultTitle: 'Professional Portfolio',
  description: 'A professional portfolio showcasing skills, projects, and experience.',
} as const;

// API endpoints
export const API_ENDPOINTS = {
  HOME: '/api/home',
} as const;