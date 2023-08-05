import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import HomeIcon from '@mui/icons-material/Home';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState, useEffect, useContext } from 'react';
import { TextField, Box, Select, MenuItem, SelectChangeEvent, Dialog, DialogActions, DialogContent, InputLabel, FormControl, Button, Typography, Popover } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { RefreshContext } from '../../App';
import axios from 'axios';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DesktopNotifications from './DesktopNotifications';
import { token } from '../../config/constants';

const headers = { 'Authorization': `Bearer ${token}` };

const Sidebar = () => {
  const location = useLocation();

  const { refresh, setRefresh } = useContext(RefreshContext);

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

  const [type, setType] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<any>([])

  // const uploadInputRef = useRef<HTMLInputElement>(null);

  // const AttachButton = styled(Button)<ButtonProps>(({ theme }) => ({
  //   color: theme.palette.secondary.main,
  //   border: 'solid',
  //   borderWidth: '1px',
  //   borderColor: theme.palette.secondary.light,
  //   textTransform: 'none'
  // }));

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };

  const navigate = useNavigate();

  const createTicket = async () => {

    const formData = new FormData()

    Array.from(files).forEach((file: any) => {
      formData.append('files', file)
      formData.append('ref', 'ticket');
      formData.append('field', "attachment");
    })

    axios.post("http://localhost:1337/api/upload", formData, {
      headers: headers
    })
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

    axios.post("http://localhost:1337/api/tickets", ticketInfo, {
      headers: headers
    })
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
        'Authorization': `Bearer ${token}`,
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
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: idInfo })
    })
    const addResponse = await add.json()
    // console.log(addResponse);
    toggleRefresh();
    navigate('/tickets');
  }

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
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
              <ConfirmationNumberIcon sx={{ width: '35px', height: '35px', mx: 'auto', mb: 1, color: 'black' }} />
            </ListItemButton>
          </ListItem>
        </NavLink>

        <Button onClick={handleClickOpen} sx={{ width: '68px', borderRadius: '0px' }}>
          <AddCircleIcon sx={{ width: '35px', height: '35px', mx: 'auto', mb: 1, color: 'black' }} />
        </Button>

        <DesktopNotifications />
        
      </Box>

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
          vertical: -30,
          horizontal: 70,
        }}
      >
        <Box height='450px' width='350px' p='15px'>
          <Box display='flex' gap='5px' alignItems='center'>
            <NotificationsIcon />
            <Typography variant='h6' fontWeight='bold'>Notifications</Typography>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default Sidebar;
