import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Configurar matchers de jest-dom para vitest
expect.extend({});

// Limpiar después de cada test
afterEach(() => {
  cleanup();
});

// Mock de crypto.randomUUID para tests
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => 'mock-uuid-' + Math.random().toString(36).substr(2, 9),
  },
});
