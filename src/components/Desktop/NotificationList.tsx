import { Box, Typography } from '@mui/material';
import moment from 'moment';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const NotificationList = (props: any) => {
    return (
        <>
            <Box display='flex' flexDirection='column' borderTop='1px solid lightgray' py='15px'>
                <Box display='flex' gap='5px' justifyContent='space-between' alignItems='center' sx={{ cursor: 'pointer' }}>
                    <Typography sx={{ wordBreak: 'break-word' }}>{props.notification.content}</Typography>
                    <Box display='flex'>
                        {props.notification.read != true ?
                            <FiberManualRecordIcon sx={{ width: '7px', color: '#d40015' }} />
                            : ''
                        }
                    </Box>
                </Box>
                <Box display='flex' gap='5px' justifyContent='space-between' alignItems='center' sx={{ cursor: 'pointer' }}>
                    <Typography fontSize='12px'>{new Date(props.notification.createdAt).toLocaleDateString('en-GB')}</Typography>
                    <Typography fontSize='12px'>{moment(props.notification.createdAt).format("h:mm a")}</Typography>
                </Box>
            </Box>
        </>
    )
}

export default NotificationList
