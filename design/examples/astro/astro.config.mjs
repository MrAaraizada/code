
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
