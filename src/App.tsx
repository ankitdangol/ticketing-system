import { CssBaseline } from '@mui/material';
import Main from './routes/Main';
import ThemeProvider from '@mui/system/ThemeProvider';
import { theme } from './theme/theme';
import React, { useState, createContext } from 'react';

export const RefreshContext = createContext<any>({})

export const FilterContext = createContext<any>({})

export default function App() {

  const [refresh, setRefresh] = useState(true);

  const [homePageFilter, setHomePageFilter] = useState('');

  return (
    <>
      <ThemeProvider theme={theme}>
        <RefreshContext.Provider value={{ refresh, setRefresh }}>
          <FilterContext.Provider value={{ homePageFilter, setHomePageFilter }}>
            <CssBaseline />
            <Main />
          </FilterContext.Provider>
        </RefreshContext.Provider>
      </ThemeProvider>
    </>
  )
}

