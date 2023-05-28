import { Box, Stack } from '@mui/material';
import StatusBlock from '../../components/Home Page/StatusBlock';
import OverviewHeader from '../../components/Home Page/OverviewHeader';
import TicketsContainer from '../../components/Home Page/TicketsContainer';
import RecentActivities from '../../components/Home Page/RecentActivities';

const DesktopHomePageLayout = () => {
    return (
        <>

            <Box flex={12} bgcolor='white' p='25px' borderRadius='20px' mb='20px'>
                <OverviewHeader />
                <StatusBlock />
                <Stack direction="row" mt='20px' justifyContent='space-between' gap='20px'>
                    <TicketsContainer type='Recently Added' />
                    <TicketsContainer type='In Progress' />
                    <TicketsContainer type='Passed' />
                </Stack>
            </Box>
            <Box flex={4} bgcolor='white' width='25px' borderRadius='20px' ml='15px' mb='20px' mr='65px' px='15px' py='25px'>
                <RecentActivities />
            </Box>
        </>
    )
}

export default DesktopHomePageLayout;
