import { Box, IconButton, styled, ListItemButton } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';

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

            <NavItem>
                <IconButton color='primary' sx={{ px: '0px', py: '0px' }}>
                    <ListItemButton sx={{ py: '10px' }}>
                        <LogoutIcon sx={IconSize} />
                    </ListItemButton>
                </IconButton>
            </NavItem>
        </Box >
    )
}

export default BottomNavbar
