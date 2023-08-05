import { Box, Typography } from '@mui/material';
import MobileMainLayout from './MobileMainLayout';
import NotificationList from '../../components/Desktop/NotificationList';
import {
    NovuProvider,
    useNotifications
} from '@novu/notification-center';
import { novuAppId, novuBackendUrl } from '../../config/constants';

const MobileNotificationsLayout = () => {
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
            <MobileMainLayout>
                <Box position='fixed' bgcolor='white' top='80px' right='15px' left='15px' bottom='65px' borderRadius='15px' sx={{ overflowY: 'scroll' }}>
                    <Box position='fixed' width='90%' px='15px' py='13px' pt='15px' borderBottom='1px solid lightgray' sx={{ backgroundColor: 'white' }}>
                        <Typography variant='h6' fontWeight='bold'>Notifications</Typography>
                    </Box>

                    <Box mt='43px' p='15px'>
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
            </MobileMainLayout>
        </>
    )
}

export default MobileNotificationsLayout
