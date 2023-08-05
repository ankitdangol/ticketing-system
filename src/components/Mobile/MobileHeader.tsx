import { Box, Toolbar, ImageList, ImageListItem, Typography, useTheme } from '@mui/material';
import logo from '../../assets/images/sciever_logo.png';

const MobileHeader = () => {
    const theme = useTheme();

    return (
        <>
            <Box role="heading" position='fixed' zIndex='2' sx={{ backgroundColor: theme.palette.background.default, width: '100%', height: '81px', top: '0px', left: '0px' }}>
                <Toolbar sx={{ position: 'sticky' }}>
                    <ImageList
                        sx={{
                            width: '50px',
                            height: '50px',
                            minWidth: '50px',
                            marginRight: 2,
                            overflow: 'hidden',
                        }}
                        cols={1}
                    >
                        <ImageListItem>
                            <img src={logo} alt='Sciever Inc. Logo' />
                        </ImageListItem>
                    </ImageList>

                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{ color: 'black', fontWeight: 'bold' }}
                    >
                        Hello, [Client Name]!
                    </Typography>
                </Toolbar>
            </Box>
        </>
    )
}

export default MobileHeader
