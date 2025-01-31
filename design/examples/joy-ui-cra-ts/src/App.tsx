import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Button from '@mui/joy/Button';

export default function App() {
  return (
    <CssVarsProvider>
      <Button>Button</Button>
    </CssVarsProvider>
  );
}

// Enhanced Joy UI showcase - Feb 1, 2025
const joyUIEnhancements = { version: '1.0', features: ['variants', 'themes', 'performance'] };

