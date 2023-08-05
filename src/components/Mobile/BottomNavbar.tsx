import { Box, IconButton, styled, ListItemButton, Dialog, Typography, Button } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { sisUrl } from '../../config/constants';

const NavItem = styled(Box)({
    flexGrow: 1,
    textAlign: 'center',
    justifyContent: 'center'
});

const IconSize = {
    width: '30px',
    height: '30px'
};

const BottomNavbar = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate(window.location.href = sisUrl);
    }

    return (

        <Box alignContent='center' justifyItems='center' display='flex' flexDirection='row' role='navigation' position='fixed' bgcolor='white' sx={{ top: 'auto', left: '0px', bottom: '0px', width: '100%' }}>
            <NavItem>
                <NavLink to='/'>
                    <IconButton color='primary' sx={{ px: '0px', py: '0px' }}>
                        <ListItemButton selected={location.pathname === '/' ? true : false} sx={{ py: '10px', mx: '0px' }}>
                            <HomeOutlinedIcon sx={IconSize} />
                        </ListItemButton>
                    </IconButton>
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink to='/tickets'>
                    <IconButton color='primary' sx={{ px: '0px', py: '0px' }}>
                        <ListItemButton selected={location.pathname === '/tickets' ? true : false} sx={{ py: '10px' }}>
                            <ConfirmationNumberOutlinedIcon sx={IconSize} />
                        </ListItemButton>
                    </IconButton>
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink to='/create_ticket'>
                    <IconButton color='primary' sx={{ px: '0px', py: '0px' }}>
                        <ListItemButton selected={location.pathname === '/create_ticket' ? true : false} sx={{ py: '10px' }}>
                            <AddCircleOutlineIcon sx={IconSize} />
                        </ListItemButton>
                    </IconButton>
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink to='/notifications'>
                    <IconButton color='primary' sx={{ px: '0px', py: '0px' }}>
                        <ListItemButton selected={location.pathname === '/notifications' ? true : false} sx={{ py: '10px' }}>
                            <NotificationsOutlinedIcon sx={IconSize} />
                        </ListItemButton>
                    </IconButton>
                </NavLink>
            </NavItem>

            <NavItem onClick={handleClickOpen}>
                <IconButton color='primary' sx={{ px: '0px', py: '0px' }}>
                    <ListItemButton sx={{ py: '10px' }}>
                        <LogoutIcon sx={IconSize} />
                    </ListItemButton>
                </IconButton>
            </NavItem>

            <Dialog open={open} onClose={handleClose} maxWidth='sm'>
                <Box display='flex' flexDirection='column' gap='10px' p='15px' alignItems='center'>
                    <Box display='flex' gap='3px' pr='2px'>
                        <LogoutIcon />
                        <Typography>Are you sure?</Typography>
                    </Box>
                    <Box display='flex' gap='10px'>
                        <Button size='small' variant='contained' color='error' onClick={handleLogout}>Yes</Button>
                        <Button size='small' variant='outlined' onClick={handleClose}>No</Button>
                    </Box>
                </Box>
            </Dialog >
        </Box >
    )
}

export default BottomNavbar
