
// Material UI integration
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    react({
      include: ['**/mui/**'],
    }),
  ],
  vite: {
    ssr: {
      noExternal: ['@mui/material', '@emotion/react'],
    },
  },
});

// Enhanced Astro + Material UI integration - Feb 4, 2025
// Performance optimizations enabled

