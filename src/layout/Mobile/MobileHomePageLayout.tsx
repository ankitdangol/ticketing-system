import { Box } from '@mui/material';
import OverviewHeader from '../../components/Home Page/OverviewHeader'
import TicketsContainer from '../../components/Home Page/TicketsContainer';

const MobileHomePageLayout = () => {
    return (
        <>
            <Box display='flex' flexDirection='column' mx='15px' gap='10px' mb='65px'>
                <OverviewHeader />
                <Box display='flex' flexDirection='column' mt='126px' mx='2px' gap='10px'>
                    <TicketsContainer type='Recently Added' />
                    <TicketsContainer type='In Progress' />
                    <TicketsContainer type='Passed' />
                </Box>
            </Box>
        </>
    )
}

export default MobileHomePageLayout
