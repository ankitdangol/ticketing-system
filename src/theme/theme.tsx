import { createTheme } from '@mui/material';



export const theme = createTheme({
    palette: {
        primary: {
            main: '#1F1C2E',
        },
        secondary: {
            main: 'rgba(0,0,0,.5)',
            light: 'rgba(0,0,0,.3)'
        },
        background: {
            default: '#eaf0ff',
            
        },
    },
    typography: {
        fontFamily: '"Exo 2", sans-serif',
        h1: {
            fontFamily: 'Mulish, sans-serif',
        },
        h2: {
            fontFamily: 'Mulish, sans-serif',
        },
        h3: {
            fontFamily: 'Mulish, sans-serif',
        },
        h4: {
            fontFamily: 'Mulish, sans-serif',
        },
        h5: {
            fontFamily: 'Mulish, sans-serif',
        },
        h6: {
            fontFamily: 'Mulish, sans-serif',
        },
    },
});


