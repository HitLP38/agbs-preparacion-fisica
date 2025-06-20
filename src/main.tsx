import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { CustomThemeProvider } from '@shared/theme/ThemeProvider';
import { AuthProvider } from '@app/context/AuthContext';
import { AppSPA } from './AppSPA';

import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';

// 🔐 Clave pública Clerk
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Falta la clave pública de Clerk');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {/* 👇 Este debe envolver toda la app */}
      <AuthProvider>
        <CustomThemeProvider>
          <AppSPA />
        </CustomThemeProvider>
      </AuthProvider>
    </ClerkProvider>
  </React.StrictMode>
);
