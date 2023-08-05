import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';
import logo from '../../assets/images/sciever_logo.png';
import { Typography, styled } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { MeiliSearch } from 'meilisearch';
import { useContext, useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { TicketsContext, RefreshContext } from '../../App';
import { sisUrl } from '../../config/constants';
import Dialog from '@mui/material/Dialog/Dialog';
import Button from '@mui/material/Button/Button';

const DesktopHeader = () => {

  const { tickets, setTickets } = useContext(TicketsContext);

  const { refresh, setRefresh } = useContext(RefreshContext);

  const toggleRefresh = () => {
    refresh == true ? setRefresh(false) : setRefresh(true);
  }

  const navigate = useNavigate();

  const client = new MeiliSearch({
    host: 'http://localhost:7700/'
  })

  const navigateToTable = (value: string) => {
    navigate({
      pathname: '/tickets',
      search: createSearchParams({
        data: value
      }).toString()
    });
    setTickets('search')
    toggleRefresh();
  }

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 20,
    backgroundColor: 'white',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: 140,

    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-20%, -50%)',
      marginLeft: theme.spacing(3),
      width: 250,
    },

    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      marginLeft: theme.spacing(3),
      width: 400,
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '340px',
      },
    },
  }));

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
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar disableGutters sx={{ position: 'sticky', ml: '10px' }}>
        <ImageList
          sx={{
            width: '70px',
            height: '70px',
            minWidth: '60px',
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
          sx={{ display: { xs: 'block', sm: 'block' }, color: 'black', fontWeight: 'bold' }}
        >
          Hello, [Client Name]!
        </Typography>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }}
            onKeyDown={(e) => {
              const element = e.currentTarget as HTMLInputElement
              const value = element.value
              if (e.key === 'Enter') {
                navigateToTable(value);
                // searchTickets(value);
                e.preventDefault();
              }
            }}
          />
        </Search>

        <Box onClick={handleClickOpen} sx={{ display: 'flex', alignItems: 'center', position: 'absolute', right: '85px', gap: '5px', cursor: 'pointer' }}>
          <Typography fontSize='17px'>Logout</Typography>
          <LogoutIcon />
        </Box>
      </Toolbar>

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
  );
};

export default DesktopHeader;
