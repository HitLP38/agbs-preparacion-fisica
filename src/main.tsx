// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { AppSPA } from './AppSPA'; // Tu componente SPA principal
import { CustomThemeProvider } from '@shared/theme/ThemeProvider';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Falta Clerk Publishable Key');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <CustomThemeProvider>
        <AppSPA />
      </CustomThemeProvider>
    </ClerkProvider>
  </React.StrictMode>
);
