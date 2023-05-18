import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';
import logo from '../../assets/images/sciever_logo.png';
import { Typography, styled } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

const DesktopHeader = () => {

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
        width: '20ch',
      },
    },
  }));

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
          <StyledInputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }} />
        </Search>

        <Box sx={{ display: 'flex', alignItems: 'center', position: 'absolute', right: '85px', gap: '5px', cursor: 'pointer' }}>
          <Typography fontSize='17px'>Logout</Typography>
          <LogoutIcon />
        </Box>
      </Toolbar>
    </Box >
  );
};

export default DesktopHeader;
