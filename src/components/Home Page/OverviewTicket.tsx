import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import OverviewPills from '../OverviewPills';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useTheme } from '@mui/material/styles';

const OverviewTicket = (props: any) => {
  const iconSize = {
    width: '20px',
    height: '20px'
  }

  const theme = useTheme();

  return (
    <>
      <Box display='flex' flexDirection='column' width='100%' p='10px' gap='5px' bgcolor={theme.palette.background.default} sx={{ border: 'solid', borderRadius: '30px', borderWidth: '2px', borderColor: 'rgba(128,128,128,0.2)' }}>
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
    </>
  );
};

export default OverviewTicket;
