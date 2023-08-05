import { Typography, Box } from '@mui/material';
import NotificationList from '../Desktop/NotificationList';
import {
    NovuProvider,
    useNotifications
} from '@novu/notification-center';
import { novuAppId, novuBackendUrl } from '../../config/constants';
import { relative } from 'path';

const RecentActivities = () => {

    const CustomNotificationCenter = () => {
        const { notifications, fetchNextPage, hasNextPage, isLoading, isFetching, unseenCount } = useNotifications();

        return (
            <>
                {notifications?.length > 0 ? notifications?.map((notification) => {
                    return (
                        <NotificationList notification={notification} key={notification} />
                    )
                }) : ''}
            </>
        );
    }

    return (
        <>
            <Box flex={4} bgcolor='white' width='25px' height='600px' borderRadius='20px' ml='15px' mb='20px' mr='65px' px='15px' position='relative' sx={{ overflowY: 'scroll', overflowX: 'hidden' }}>

                <Box position='sticky' top='0px' width='245px' pt='25px' borderBottom='1px solid lightgray' sx={{ backgroundColor: 'white' }}>
                    <Typography variant='h6' fontWeight='bold' mb='15px'>Recent Activities</Typography>
                </Box>

                <Box mt='-1px'>
                    <NovuProvider
                        backendUrl={novuBackendUrl}
                        subscriberId={'63d7751916e379fe65f29506'}
                        applicationIdentifier={novuAppId}
                        initialFetchingStrategy={{ fetchNotifications: true }}
                    >
                        <CustomNotificationCenter />
                    </NovuProvider>
                </Box>
            </Box>
        </>
    )
}

export default RecentActivities;
