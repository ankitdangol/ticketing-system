import { Box, Typography } from '@mui/material';
import moment from "moment";

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
            <Box display='flex' p='5px' borderBottom='solid' borderColor='lightgray' sx={{ borderWidth: '1px' }}>
                <Box display='flex' flex={5} flexDirection='column' gap='10px'>
                    <Typography fontWeight='bold'>{sender}</Typography>
                    <Typography>{message}</Typography>
                </Box>
                <Box flex={1} flexDirection='column' textAlign='end'>
                    <Typography>{time}</Typography>
                    <Typography>{date}</Typography>
                </Box>
            </Box>

        </>
    )
}

export default MessageBox
