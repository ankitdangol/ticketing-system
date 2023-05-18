import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import HomeIcon from '@mui/icons-material/Home';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { Box } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  return (
    <Box display='flex' flexDirection='column' alignItems='center' width='85px' mt='25px'>
      <NavLink to='/'>
        <ListItem disablePadding>
          <ListItemButton selected={location.pathname === '/' ? true : false}>
            <HomeIcon sx={{ width: '35px', height: '35px', mx: 'auto', mb: 1, color: 'black' }} />
          </ListItemButton>
        </ListItem>
      </NavLink>
      <NavLink to='/tickets'>
        <ListItem disablePadding>
          <ListItemButton selected={location.pathname === '/tickets' ? true : false}>
            <ConfirmationNumberIcon sx={{ width: '35px', height: '35px', mx: 'auto', color: 'black' }} />
          </ListItemButton>
        </ListItem>
      </NavLink>
    </Box>
  );
};

export default Sidebar;
