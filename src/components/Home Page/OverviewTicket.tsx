import { Box, Dialog, DialogContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import OverviewPills from '../OverviewPills';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TicketForum from '../TicketForum';
import Pills from '../Pills';
import { useState, useEffect } from 'react';
import isMobile from '../../hooks/isMobile';

const OverviewTicket = (props: any) => {
  const iconSize = {
    width: '20px',
    height: '20px'
  }

  const theme = useTheme();

  const [data, setData] = useState()

  useEffect(() => {
    fetch('http://localhost:1337/api/tickets?populate=*')
      .then((resp) => resp.json())
      .then((apiData) => {
        setData(apiData.data);
      });
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileOpen = () => {
    setMobileOpen(true);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  const [imageOpen, setImageOpen] = useState(false);
  const [imageToOpen, setImageToOpen] = useState('');

  const handleImageOpen = () => {
    setImageOpen(true);
  };

  const handleImageClose = () => {
    setImageOpen(false);
  };

  const handleImageToOpen = (imageUrl: string) => {
    setImageToOpen(imageUrl)
  }

  const getUrl = (selectedTicket: any) => {
    return selectedTicket.attributes.url;
  }

  const url = props.data?.attributes?.attachment?.data?.length > 0 ? props.data.attributes.attachment.data.map(getUrl) : 'undefined'

  const mobile = isMobile();

  return (
    <>
      <Box onClick={() => { !mobile ? handleClickOpen() : handleMobileOpen() }} display='flex' flexDirection='column' width='100%' p='10px' gap='5px' bgcolor={theme.palette.background.default} sx={{ border: 'solid', borderRadius: '30px', borderWidth: '2px', borderColor: 'rgba(128,128,128,0.2)', cursor: 'pointer' }}>
        <Box display='flex' gap='10px'>
          <Typography>{props.data.attributes.ticket_id}</Typography>
          <Typography fontWeight='bold' noWrap>{props.data.attributes.description}</Typography>
        </Box>
        <Box display='flex' gap='5px' alignItems='center'>
          <OverviewPills pill={props.data.attributes.type} />
          <OverviewPills pill={props.data.attributes.priority} />
          <Typography ml='auto' fontSize='14px' noWrap>{props.data.attributes.due_date != null ? new Date(props.data.attributes.due_date).toLocaleDateString('en-GB') : ''}</Typography>
        </Box>
        <Box display='flex' flexDirection='row' gap='2px'>
          <ChatOutlinedIcon sx={iconSize} />
          <Typography fontSize='small'>{props.data.attributes.chats.data != null ? props.data.attributes.chats.data.length : '0'}</Typography>
          <AttachFileIcon sx={iconSize} />
          <Typography fontSize='small'>{props.data.attributes.attachment.data != null ? props.data.attributes.attachment.data.length : '0'}</Typography>

        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth='lg'>
        <Box display='flex' gap='10px' p='15px'>
          <Box display='flex' flexDirection='column' gap='15px' m='5px' mt='20px'>
            <ArrowBackIcon onClick={handleClose} cursor='pointer' />
          </Box>

          <Box display='flex' flexDirection='column' width='300px' p='15px' border='solid' borderColor='lightgray' borderRadius='5px' gap='15px' sx={{ borderWidth: '1px' }}>
            <Box>
              <Typography noWrap variant='h6' fontWeight='bold'>{props.data.attributes.description}</Typography>
              <Typography>{props.data.attributes.creator}</Typography>
            </Box>
            <Box display='flex' flexDirection='column' gap='10px'>

              <Box display='flex' flexDirection='column' gap='7px'>

                <Box display='flex' gap='25px'>
                  <Typography width='85px'>Type</Typography>
                  <Pills pill={props.data.attributes.type} />
                </Box>
                <Box display='flex' gap='25px'>
                  <Typography width='85px'>Priority</Typography>
                  <Pills pill={props.data.attributes.priority} />
                </Box>


                <Box display='flex' gap='25px'>
                  <Typography width='85px'>Status</Typography>
                  <Pills pill={props.data.attributes.status} />
                </Box>

                <Box display='flex' gap='25px'>
                  <Typography width='85px'>Due Date</Typography>
                  <Typography>{props.data.attributes.due_date != null ? new Date(props.data.attributes.due_date).toLocaleDateString('en-GB') : ''}</Typography>
                </Box>

                <Box display='flex' gap='25px'>
                  <Typography width='85px'>Created On</Typography>
                  <Typography>{new Date(props.data.attributes.createdAt).toLocaleDateString('en-GB')}</Typography>
                </Box>
              </Box>

              <Box display='flex' gap='10px' mt='10px'>
                {url != 'undefined' ?
                  url.map((imageUrl: string) => {
                    return (
                      <>
                        <img src={`http://localhost:1337${imageUrl}`} key={url} alt='' width='45%' height='55%' onClick={() => { handleImageOpen(); handleImageToOpen(imageUrl) }} />
                      </>
                    )
                  })
                  :
                  ''
                }
              </Box>
            </Box>
          </Box>

          <TicketForum selectedRowId={props.data.attributes.ticket_id} data={data} />
        </Box>
      </Dialog >

      <Dialog open={imageOpen} onClose={handleImageClose} maxWidth='md'>
        <DialogContent sx={{ padding: '0px' }}>
          <img src={`http://localhost:1337${imageToOpen}`} key={imageToOpen} alt='' width='100%' height='100%' />
        </DialogContent>
      </Dialog>

      <Dialog open={mobileOpen} onClose={handleMobileClose}>
        <Box m='15px' display='flex'>
          <ArrowBackIcon onClick={handleMobileClose} />
        </Box>
        <Box m='15px' mt='0px' border='solid' borderColor='lightgray' borderRadius='10px' sx={{ borderWidth: '1px' }}>
          <TicketForum data={data} selectedRowId={props.data.attributes.ticket_id} />
        </Box>
      </Dialog>
    </>
  );
};

export default OverviewTicket;
