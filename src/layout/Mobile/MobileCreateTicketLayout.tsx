import { Box, Typography } from '@mui/material'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MobileCreateTicketForm from '../../components/Mobile/MobileCreateTicketForm';

const MobileCreateTicketLayout = () => {
    return (
        <Box display='flex' flexDirection='column' position='fixed' top='80px' left='15px' right='15px' bottom='65px' bgcolor='white' gap='10px' px='10px' pt='12px' pb='12px' borderRadius='10px'>
            <Box display='flex' alignItems='center' gap='10px'>
                <ConfirmationNumberIcon /><Typography variant='h6' fontWeight='bold'>Create Ticket</Typography>
            </Box>
            <MobileCreateTicketForm />
        </Box>
    )
}

export default MobileCreateTicketLayout
