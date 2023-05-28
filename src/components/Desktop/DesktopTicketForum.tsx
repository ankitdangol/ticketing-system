import { useState } from 'react';
import ForumIcon from '@mui/icons-material/Forum';
import TicketForum from '../TicketForum';
import { Box, Typography, Dialog, DialogContent } from '@mui/material';
import Pills from '../Pills';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ViewAttachments from './ViewAttachments';

const DesktopTicketForum = (props: any) => {
    const data = props.data;

    const getSelectedTicket = (ticket: any) => {
        return ticket.attributes.ticket_id == props.selectedRowId;
    }

    const selectedTicket = data?.length > 0 ? data.filter(getSelectedTicket) : 'undefined';

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getType = (selectedTicket: any) => {
        return selectedTicket.attributes.type
    }
    const getPriority = (selectedTicket: any) => {
        return selectedTicket.attributes.priority
    }
    const getStatus = (selectedTicket: any) => {
        return selectedTicket.attributes.status
    }
    const getDueDate = (selectedTicket: any) => {
        return (
            selectedTicket.attributes.due_date != null ? new Date(selectedTicket.attributes.due_date).toLocaleDateString('en-GB') : ''
        )
    }
    const getCreatedOn = (selectedTicket: any) => {
        return new Date(selectedTicket.attributes.createdAt).toLocaleDateString('en-GB');
    }
    const getCreator = (selectedTicket: any) => {
        return selectedTicket.attributes.creator
    }
    const getDescription = (selectedTicket: any) => {
        return selectedTicket.attributes.description
    }
    const getUrl = (selectedTicket: any) => {
        return selectedTicket.attributes.url;
    }
    const getImages = (selectedTicket: any) => {
        return `http://localhost:1337${selectedTicket.attributes.url}`;
    }

    const images = selectedTicket[0]?.attributes?.attachment?.data?.length > 0 ? selectedTicket[0].attributes.attachment.data.map(getImages) : ''
    const url = selectedTicket[0]?.attributes?.attachment?.data?.length > 0 ? selectedTicket[0].attributes.attachment.data.map(getUrl) : 'undefined'
    const type = data?.length > 0 ? selectedTicket.map(getType) : 'undefined';
    const priority = data?.length > 0 ? selectedTicket.map(getPriority) : 'undefined';
    const status = data?.length > 0 ? selectedTicket.map(getStatus) : 'undefined';
    const dueDate = data?.length > 0 ? selectedTicket.map(getDueDate) : 'undefined';
    const createdOn = data?.length > 0 ? selectedTicket.map(getCreatedOn) : 'undefined';
    const creator = data?.length > 0 ? selectedTicket.map(getCreator) : 'undefined';
    const description = data?.length > 0 ? selectedTicket.map(getDescription) : 'undefined';

    return (
        <>
            <ForumIcon onClick={handleClickOpen} cursor='pointer' />
            <Dialog open={open} onClose={handleClose} maxWidth='lg'>
                <Box display='flex' gap='10px' p='15px'>
                    <Box display='flex' flexDirection='column' gap='15px' m='5px' mt='20px'>
                        <ArrowBackIcon onClick={handleClose} cursor='pointer' />
                    </Box>

                    <Box display='flex' flexDirection='column' width='300px' p='15px' border='solid' borderColor='lightgray' borderRadius='5px' gap='15px' sx={{ borderWidth: '1px' }}>
                        <Box>
                            <Typography noWrap variant='h6' fontWeight='bold'>{description[0]}</Typography>
                            <Typography>{creator[0]}</Typography>
                        </Box>
                        <Box display='flex' flexDirection='column' gap='10px'>

                            <Box display='flex' flexDirection='column' gap='7px'>

                                <Box display='flex' gap='25px'>
                                    <Typography width='85px'>Type</Typography>
                                    <Pills pill={type[0]} />
                                </Box>
                                <Box display='flex' gap='25px'>
                                    <Typography width='85px'>Priority</Typography>
                                    <Pills pill={priority[0]} />
                                </Box>


                                <Box display='flex' gap='25px'>
                                    <Typography width='85px'>Status</Typography>
                                    <Pills pill={status[0]} />
                                </Box>

                                <Box display='flex' gap='25px'>
                                    <Typography width='85px'>Due Date</Typography>
                                    <Typography>{dueDate[0]}</Typography>
                                </Box>

                                <Box display='flex' gap='25px'>
                                    <Typography width='85px'>Created On</Typography>
                                    <Typography>{createdOn[0]}</Typography>
                                </Box>
                            </Box>

                            <Box mt='5px'>
                                {url != 'undefined' ?
                                    <ViewAttachments url={url} images={images} />
                                    :
                                    ''
                                }
                            </Box>
                        </Box>
                    </Box>

                    <TicketForum selectedRowId={props.selectedRowId} data={data} />
                </Box>
            </Dialog >

            {/* <Dialog open={imageOpen} onClose={handleImageClose} maxWidth='md'>
                <DialogContent sx={{ padding: '0px' }}>
                    <img src={`http://localhost:1337${imageToOpen}`} key={imageToOpen} alt='' width='100%' height='100%' />
                </DialogContent>
            </Dialog> */}

        </>
    )
}

export default DesktopTicketForum
