import { Box } from '@mui/material';
import TicketsTable from '../../components/Desktop/TicketsTable';

const DesktopTicketsPageLayout = () => {
    return (
        <>
            <Box position='fixed' left='85px' right='65px' top='102px' bottom='-25px' bgcolor='white' p='25px' borderRadius='20px'>
                <TicketsTable />
            </Box>
        </>
    )
}

export default DesktopTicketsPageLayout
