import { Box, Typography } from '@mui/material';
import moment from 'moment';

const MessageBox = (props: any) => {

    const formatDate = (value: string, locale = 'en-GB') => {
        return new Date(value).toLocaleDateString(locale);
    }

    const message = props.message.attributes.message;
    const sender = props.message.attributes.sender;
    const createdAt = props.message.attributes.createdAt;

    const time = moment(createdAt).format("h:mm a");

    const date = formatDate(createdAt);

    return (
        <>
            <Box display='flex' p='10px' borderBottom='solid' borderColor='lightgray' position='relative' sx={{ borderWidth: '1px' }}>
                <Box display='flex' width='85%' flexDirection='column' gap='10px'>
                    <Typography fontWeight='bold'>Sender name</Typography>
                    <Typography sx={{ wordBreak: 'break-word' }}>{message}</Typography>
                </Box>
                <Box display='flex' flexDirection='column' textAlign='end' position='absolute' bottom='10px' right='0px'>
                    <Typography fontSize='12px'>{time}</Typography>
                    <Typography fontSize='12px'>{date}</Typography>
                </Box>
            </Box>

        </>
    )
}

export default MessageBox
