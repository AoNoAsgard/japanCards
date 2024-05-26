import React from 'react';
import { Container, Divider, PaletteMode } from '@mui/material';
import PulsanteCambiaTema from './PulsanteCambiaTema';
import HeaderCheckBoxes from './HeaderCheckBoxes';
import { CheckboxProvider } from './CheckboxContext';
import SwipeableCard from './SwipeableCard';

interface AppProps {
  toggleTheme: () => void;
  paletteMode:PaletteMode;
}

const App: React.FC<AppProps> = ({ toggleTheme,paletteMode }) => {
  return (
    <CheckboxProvider>

      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          position: 'relative',
        }}
      >
        <HeaderCheckBoxes />
        <Divider sx={{ width: '100%' }} />

        <SwipeableCard />
      </Container>
      <PulsanteCambiaTema toggleTheme={toggleTheme} paletteMode={paletteMode}/>
    </CheckboxProvider>
  );
};

export default App;
