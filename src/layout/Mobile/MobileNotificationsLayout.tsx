import { Box, Typography } from "@mui/material"
import MobileMainLayout from "./MobileMainLayout"

const MobileNotificationsLayout = () => {
    return (
        <>
            <MobileMainLayout>
                <Box position='fixed' bgcolor='white' top='80px' right='15px' left='15px' bottom='65px' borderRadius='15px' padding='15px'>
                    <Typography variant='h6' fontWeight='bold'>Notifications</Typography>
                </Box>
            </MobileMainLayout>
        </>
    )
}

export default MobileNotificationsLayout
