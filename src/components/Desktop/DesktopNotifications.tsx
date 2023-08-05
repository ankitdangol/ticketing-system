import { useState } from 'react';
import {
    NovuProvider,
    PopoverNotificationCenter,
    IMessage,
    useNotifications
} from '@novu/notification-center';
import { novuAppId, novuBackendUrl } from '../../config/constants';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Popover, Box, Typography, Button } from '@mui/material';
import NotificationList from './NotificationList';

const DesktopNotifications = () => {

    const CustomNotificationCenter = () => {
        const { notifications, fetchNextPage, hasNextPage, isLoading, isFetching, unseenCount } = useNotifications();

        const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        };

        const handlePopoverClose = () => {
            setAnchorEl(null);
        };

        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;

        return (
            <>
                <Button onClick={handleClick} sx={open ? { width: '68px', height: '60px', borderRadius: '0px', backgroundColor: 'rgba(31, 28, 46, 0.08)' } : { width: '68px', height: '60px', borderRadius: '0px' }}>
                    <Badge badgeContent={unseenCount} color='error'>
                        <NotificationsIcon sx={{ width: '35px', height: '35px', mx: 'auto', mb: 1, color: 'black' }} />
                    </Badge>
                </Button>

                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                        vertical: -30,
                        horizontal: 72,
                    }}
                >
                    <Box height='450px' width='350px' position='relative'>
                        <Box position='sticky' top='0px' bgcolor='white' borderBottom='1px solid lightgray' display='flex' gap='5px' alignItems='center' p='15px' pb='13px'>
                            <NotificationsIcon />
                            <Typography variant='h6' fontWeight='bold'>Notifications</Typography>
                        </Box>

                        <Box px='15px' pb='15px' mt='-1px'>
                            {notifications?.length > 0 ? notifications?.map((notification) => {
                                return (
                                    <NotificationList notification={notification} key={notification} />
                                )
                            }) : ''}
                        </Box>
                    </Box>
                </Popover>

            </>
        );
    }

    return (
        <NovuProvider
            backendUrl={novuBackendUrl}
            subscriberId={'63d7751916e379fe65f29506'}
            applicationIdentifier={novuAppId}
            initialFetchingStrategy={{ fetchNotifications: true }}
        >
            <CustomNotificationCenter />
        </NovuProvider>
    )
}

export default DesktopNotifications
