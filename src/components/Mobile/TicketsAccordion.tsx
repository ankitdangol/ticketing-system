import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Dialog, Button } from '@mui/material';
import Pills from '../Pills';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ForumIcon from '@mui/icons-material/Forum';
import TicketForum from '../TicketForum';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteTicket from '../DeleteTicket';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import image1 from '../../assets/images/sciever_logo.png';
import image2 from '../../assets/images/screenshot.png';

const TicketsAccordion = (props: any) => {
    const data = props.data;

    const [expanded, setExpanded] = useState<string | false>(false);

    const getUrl = (ticket: any) => {
        return `http://localhost:1337${ticket.attributes.url}`;
    }

    const images = data.attributes.attachment.data != null ? data.attributes.attachment.data.map(getUrl) : ''

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [imageOpen, setImageOpen] = useState(false);

    const handleImageOpen = () => {
        setImageOpen(true);
    }

    const handleImageClose = () => {
        setImageOpen(false);
    }

    return (
        <>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} disableGutters={true} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        {data.attributes.ticket_id}
                    </Typography>
                    <Typography noWrap sx={{ color: 'black', fontWeight: 'bold', width: '180px' }}>{data.attributes.description}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography mt='-15px' ml='96px' mb='12px'>{data.attributes.creator}</Typography>
                    <Box display='flex' gap='13px'>
                        <Box display='flex' flexDirection='column' gap='7px'>

                            <Box display='flex' gap='10px'>
                                <Typography width='85px'>Type</Typography>
                                <Pills pill={data.attributes.type} />
                            </Box>
                            <Box display='flex' gap='10px'>
                                <Typography width='85px'>Priority</Typography>
                                <Pills pill={data.attributes.priority} />
                            </Box>


                            <Box display='flex' gap='10px'>
                                <Typography width='85px'>Status</Typography>
                                <Pills pill={data.attributes.status} />
                            </Box>

                            <Box display='flex' gap='10px'>
                                <Typography width='85px'>Due Date</Typography>
                                <Typography>{data.attributes.due_date != null ? new Date(data.attributes.due_date).toLocaleDateString('en-GB') : ''}</Typography>
                            </Box>

                            <Box display='flex' gap='10px'>
                                <Typography width='85px'>Created On</Typography>
                                <Typography>{new Date(data.attributes.createdAt).toLocaleDateString('en-GB')}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box display='flex' alignItems='center' mt='8px' justifyContent='space-between'>
                        <Box display='flex' gap='3px' onClick={() => handleImageOpen()}>
                            <AttachFileIcon />
                            <Typography>View attachments ({data.attributes.attachment.data != null ? data.attributes.attachment.data.length : '0'})</Typography>
                        </Box>
                        <Dialog open={imageOpen} onClose={handleImageClose}>
                            {images?.length > 0 ?
                                <Carousel>
                                    {images.map((image: string) => {
                                        return < img src={image} key={image} />
                                    })}
                                </Carousel>
                                :
                                <Typography m='10px'>No attachments available!</Typography>
                            }
                        </Dialog>
                        <Box display='flex' gap='5px'>
                            <ForumIcon onClick={handleClickOpen} />
                            <DeleteTicket data={props.apiData} selectedRowId={data.attributes.ticket_id} />
                        </Box>
                    </Box>
                    <Dialog open={open} onClose={handleClose}>
                        <Box m='15px' display='flex'>
                            <ArrowBackIcon onClick={handleClose} />
                        </Box>
                        <Box m='15px' mt='0px' border='solid' borderColor='lightgray' borderRadius='10px' sx={{ borderWidth: '1px' }}>
                            <TicketForum data={props.apiData} selectedRowId={data.attributes.ticket_id} />
                        </Box>
                    </Dialog>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default TicketsAccordion;
