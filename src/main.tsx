// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
// import { AppRouter } from '@app/routes/AppRouter'; // Comentar
import { AppSPA } from './AppSPA'; // Nuevo
import { CustomThemeProvider } from '@shared/theme/ThemeProvider';

import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CustomThemeProvider>
      {/* <AppRouter /> */}
      <AppSPA />
    </CustomThemeProvider>
  </React.StrictMode>
);
