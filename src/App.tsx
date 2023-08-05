import { CssBaseline } from '@mui/material';
import Main from './routes/Main';
import ThemeProvider from '@mui/system/ThemeProvider';
import { theme } from './theme/theme';
import { useState, createContext } from 'react';

export const RefreshContext = createContext<any>({})

export const TicketsContext = createContext<any>({})

export default function App() {

  const [refresh, setRefresh] = useState(true);

  const [tickets, setTickets] = useState('');

  return (
    <>
      <ThemeProvider theme={theme}>
        <RefreshContext.Provider value={{ refresh, setRefresh }}>
          <TicketsContext.Provider value={{ tickets, setTickets }}>
            <CssBaseline />
            <Main />
          </TicketsContext.Provider>
        </RefreshContext.Provider>
      </ThemeProvider>
    </>
  )
}

