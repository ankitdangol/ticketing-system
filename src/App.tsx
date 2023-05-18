import { CssBaseline } from '@mui/material';
import Main from './routes/Main';
import ThemeProvider from '@mui/system/ThemeProvider';
import { theme } from './theme/theme';
import React, { useState } from 'react';

export const RefreshContext = React.createContext<any>({})

export default function App() {

  const [refresh, setRefresh] = useState(true)

  return (
    <>
      <ThemeProvider theme={theme}>
        <RefreshContext.Provider value={{ refresh, setRefresh }}>
          <CssBaseline />
          <Main />
        </RefreshContext.Provider>
      </ThemeProvider>
    </>
  )
}

