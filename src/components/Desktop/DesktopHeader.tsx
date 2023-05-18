import * as React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';
import Popover from '@mui/material/Popover';
import logo from '../../assets/images/sciever_logo.png';
import { useState, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { TextField, Select, MenuItem, SelectChangeEvent, InputLabel, FormControl, Button, Typography, styled } from "@mui/material";
import AttachmentIcon from '@mui/icons-material/Attachment';
import { RefreshContext } from '../../App';
import axios from 'axios';

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjgyNTAyNjE4LCJleHAiOjE2ODUwOTQ2MTh9.OKobUkpcVJrHAhLt48L7T3Fz537kS3Da3DM8aBdr0TQ'

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

const DesktopHeader = () => {

  const { refresh, setRefresh } = React.useContext(RefreshContext);

  const toggleRefresh = () => {
    refresh == true ? setRefresh(false) : setRefresh(true)
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [type, setType] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<any>([])

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };

  // const uploadInputRef = useRef<HTMLInputElement>(null);

  // const AttachButton = styled(Button)<ButtonProps>(({ theme }) => ({
  //   color: theme.palette.secondary.main,
  //   border: 'solid',
  //   borderWidth: '1px',
  //   borderColor: theme.palette.secondary.light,
  //   textTransform: 'none'
  // }));

  const createTicket = async () => {

    const formData = new FormData()

    Array.from(files).forEach((file: any) => {
      formData.append('files', file)
      formData.append('ref', 'ticket');
      formData.append('field', "attachment");
    })

    axios.post("http://localhost:1337/api/upload", formData)
      .then((response) => {
        const attachments: any = []
        response.data.map((imageId: any) => {
          attachments.push(imageId.id)
        })
        const ticketInfo = {
          data: {
            description: description,
            type: type,
            priority: priority,
            status: 'backlog',
            attachment: attachments
          }
        };
        createTicketService(ticketInfo);
      }).catch((error) => {
        const ticketInfo = {
          data: {
            description: description,
            type: type,
            priority: priority,
            status: 'backlog'
          }
        };
        createTicketService(ticketInfo);
      })

    handleClose();
    setDescription('');
    setPriority('');
    setType('');
    setFiles('');
  }

  const createTicketService = async (ticketInfo: any) => {
    axios.post("http://localhost:1337/api/tickets", ticketInfo)
      .then((response) => {
        const idInfo = {
          ticket_id: 'ticket' + response.data.data.id
        }
        const message = {
          message: response.data.data.attributes.description,
          ticket: response.data.data.id
        }
        putId(response.data.data.id, idInfo);
        firstMessage(message);
      }).catch((error) => {
        console.log(error);
      })
  }

  const firstMessage = async (message: any) => {
    const add = await fetch(`http://localhost:1337/api/chats`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: message })
    })
    const addMessage = await add.json()
    // console.log(addMessage);
  }

  const putId = async (id: number, idInfo: object) => {
    const add = await fetch(`http://localhost:1337/api/tickets/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: idInfo })
    })
    const addResponse = await add.json()
    // console.log(addResponse);
    toggleRefresh();
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
          <StyledInputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }} />
        </Search>

        <Box sx={{ display: 'flex', alignItems: 'center', position: 'absolute', right: '85px' }}>
          <Button
            color='primary'
            variant='contained'
            startIcon={<AddCircleOutlineIcon />}
            sx={{
              width: 110,
              borderRadius: 5,
              '&:hover': { backgroundColor: 'black' },
            }}
            onClick={handleClickOpen}
          >
            Create
          </Button>
          <Button onClick={handleClick}>
            <NotificationsIcon sx={{ width: '30px', height: '30px' }} />
          </Button>
        </Box>
      </Toolbar>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogContent>
          <Box display='flex' justifyContent='space-between' alignItems='center' mb='15px'>
            <Box display='flex' alignItems='center' gap='8px'>
              <ConfirmationNumberIcon />
              <Typography variant='h6' fontWeight='bold'>Create Ticket</Typography>
            </Box>
            <DialogActions>
              <CloseIcon onClick={handleClose} cursor='pointer' />
            </DialogActions>
          </Box>
          <Box display='flex' flexDirection='column' gap='10px'>
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              fullWidth
              rows={8}
              onChange={e => setDescription(e.target.value)}
              value={description}
            />

            <Box display='flex' gap='10px'>
              <FormControl fullWidth size='small'>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Type"
                  onChange={handleTypeChange}
                >
                  <MenuItem value='bug'>Bug</MenuItem>
                  <MenuItem value='task'>Task</MenuItem>
                  <MenuItem value='feature'>Feature</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size='small'>
                <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={priority}
                  label="Priority"
                  onChange={handlePriorityChange}
                >
                  <MenuItem value='highest'>Highest</MenuItem>
                  <MenuItem value='high'>High</MenuItem>
                  <MenuItem value='medium'>Medium</MenuItem>
                  <MenuItem value='low'>Low</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* <Box display='flex' gap='10px'>
              <input
                ref={uploadInputRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={(e) => setFiles(e.target.files)}
              />
              <AttachButton
                fullWidth
                onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
                sx={{ display: 'flex', justifyContent: 'space-between', pl: '13px', pr: '7px' }}
              >
                <Typography>Attach images</Typography>
                <AttachmentIcon />
              </AttachButton>
            
              <Box width='100%' ml='10px'></Box>
            </Box> */}

            <input
              type="file"
              onChange={(e) => setFiles(e.target.files)}
              multiple
              accept='image/*'
            />

            <Button onClick={() => createTicket()} variant="contained" color='info' size='small' sx={{ width: '90px', mx: 'auto', mt: '5px', textTransform: 'none' }}>Create</Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Popover
        id={id}
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 50,
          horizontal: -280,
        }}
      >
        <Box height='450px' width='350px' p='15px'>
          <Box display='flex' gap='5px' alignItems='center'>
            <NotificationsIcon />
            <Typography variant='h6' fontWeight='bold'>Notifications</Typography>
          </Box>
        </Box>
      </Popover>
    </Box >
  );
};

export default DesktopHeader;
