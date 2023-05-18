import { Box } from '@mui/material';
import OverviewHeader from '../../components/Home Page/OverviewHeader'
import TicketsContainer from '../../components/Home Page/TicketsContainer';

const MobileHomePageLayout = () => {
    return (
        <>
            <Box display='flex' flexDirection='column' mx='15px' gap='10px' mb='65px'>
                <OverviewHeader />
                <Box display='flex' flexDirection='column' mt='121px' gap='10px'>
                    <TicketsContainer />
                    <TicketsContainer />
                    <TicketsContainer />
                </Box>
            </Box>
        </>
    )
}

export default MobileHomePageLayout
