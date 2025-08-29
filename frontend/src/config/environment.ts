// Environment configuration for different deployment environments

interface EnvironmentConfig {
  API_BASE_URL: string;
  ENVIRONMENT: 'development' | 'production';
}

const getEnvironmentConfig = (): EnvironmentConfig => {
  // Check if we're in development mode
  const isDevelopment = import.meta.env.DEV || window.location.hostname === 'localhost';

  if (isDevelopment) {
    return {
      API_BASE_URL: 'http://localhost:3001',
      ENVIRONMENT: 'development'
    };
  }

  // Production configuration - Netlify Functions
  return {
    API_BASE_URL: '/.netlify/functions',
    ENVIRONMENT: 'production'
  };
};

export const config = getEnvironmentConfig();

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  if (config.ENVIRONMENT === 'production') {
    // Convert /compliance/analyze-enhanced to compliance-analyze-enhanced
    const functionName = endpoint
      .replace(/^\//, '') // Remove leading slash
      .replace(/\//g, '-'); // Replace slashes with dashes
    return `${config.API_BASE_URL}/${functionName}`;
  }
  return `${config.API_BASE_URL}/api${endpoint}`;
};

// Export for debugging
export const debugConfig = () => {
  console.log('🔧 Environment Config:', {
    ...config,
    hostname: window.location.hostname,
    isDev: import.meta.env.DEV
  });
};
