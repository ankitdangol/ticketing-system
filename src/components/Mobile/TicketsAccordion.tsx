import { useState, useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Dialog, Button, DialogContent, TextField, InputAdornment, Stack } from '@mui/material';
import Pills from '../Pills';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ForumIcon from '@mui/icons-material/Forum';
import TicketForum from '../TicketForum';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteTicket from '../DeleteTicket';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { token } from '../../config/constants';
import { RefreshContext } from '../../App';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import DueDatePicker from '../Desktop/DueDatePicker';

const TicketsAccordion = (props: any) => {

    const { refresh, setRefresh } = useContext(RefreshContext);

    const toggleRefresh = () => {
        refresh == true ? setRefresh(false) : setRefresh(true)
    }

    const data = props.data;

    const [expanded, setExpanded] = useState<string | false>(false);

    const getUrl = (ticket: any) => {
        return `http://localhost:1337${ticket.attributes.url}`;
    }

    const images = data?.attributes?.attachment?.data?.length > 0 ? data.attributes.attachment.data.map(getUrl) : ''

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

    const [statusOpen, setStatusOpen] = useState(false);

    const [commentOpen, setCommentOpen] = useState(false);

    const [status, setStatus] = useState('');

    const handleStatusOpen = () => {
        setStatusOpen(true);
    };

    const handleStatusClose = () => {
        setStatusOpen(false);
    };


    const handleStatusComment = (pill: any) => {
        setCommentOpen(true);
        setStatus(pill.name)
    };

    const handleCommentClose = () => {
        setCommentOpen(false);
    };

    const statusPills = [
        {
            name: 'BACKLOG',
            hexCode: '#515B52',
        },
        {
            name: 'TODO',
            hexCode: '#93A795',
        },
        {
            name: 'IN PROGRESS',
            hexCode: '#FF7A00',
        },
        {
            name: 'PR',
            hexCode: '#1468B6',
        },
        {
            name: 'PR DONE',
            hexCode: '#0085FF',
        },
        {
            name: 'DONE',
            hexCode: '#0ED9CD',
        },
        {
            name: 'TESTED',
            hexCode: '#00800D',
        },
        {
            name: 'PASSED',
            hexCode: '#00E309',
        },
        {
            name: 'REDO',
            hexCode: '#E30000',
        },

    ];

    const [statusToChange, setStatusToChange] = useState();

    const handleStatusToChange = (idToChange: any) => {
        setStatusToChange(idToChange);
    }

    const [comment, setComment] = useState('');

    const handleStatusChange = async () => {

        const ticketInfo = {
            status: status.toLowerCase()
        }

        const messageInfo = {
            message: comment,
            ticket: statusToChange
        }

        const changeStatus = await fetch(`http://localhost:1337/api/tickets/${statusToChange}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: ticketInfo })
        })

        const addComment = await fetch('http://localhost:1337/api/chats', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: messageInfo })
        })

        const addTicketResponse = await changeStatus.json()

        const addChatResponse = await addComment.json()

        toggleRefresh();

        handleCommentClose();

        setComment('');

        // console.log(addTicketResponse);

        // console.log(addChatResponse);

    }

    const id = data.attributes.ticket_id != null ? data.attributes.ticket_id.split('ticket') : 'undefined';
    const idToChange = parseInt(id[1]);

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
                                <Box onClick={() => { handleStatusOpen(); handleStatusToChange(idToChange); }}>
                                    <Pills pill={data.attributes.status} />
                                </Box>
                            </Box>

                            <Box display='flex' gap='10px'>
                                <Typography width='85px'>Due Date</Typography>
                                <Typography>{data.attributes.due_date != null ? new Date(data.attributes.due_date).toLocaleDateString('en-GB') : <DueDatePicker selectedRowId={data.attributes.ticket_id} />}</Typography>
                            </Box>

                            <Box display='flex' gap='10px'>
                                <Typography width='85px'>Created On</Typography>
                                <Typography>{new Date(data.attributes.createdAt).toLocaleDateString('en-GB')}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box display='flex' alignItems='center' mt='8px' justifyContent='space-between'>
                        <Box display='flex' gap='3px' onClick={() => handleImageOpen()}>
                            <Typography sx={{ color: '#3751FF' }}>View attachments ({data?.attributes?.attachment?.data?.length > 0 ? data.attributes.attachment.data.length : '0'})</Typography>
                        </Box>
                        <Dialog open={imageOpen} onClose={handleImageClose}>
                            {images?.length > 0 ?
                                <Carousel dynamicHeight>
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

            <Dialog open={statusOpen} onClose={handleStatusClose} maxWidth='xl'>
                <Box display='flex' flexDirection='column' gap='25px'>
                    <Box display='flex' justifyContent='flex-end' p='5px'>
                        <CloseIcon onClick={handleStatusClose} cursor='pointer' />
                    </Box>

                    <Box mt='-30px' display='flex' flexDirection='column' gap='15px' px='20px' pb='15px'>
                        <Typography fontWeight='bold'>Change status to:</Typography>
                        <Stack direction='column' justifyContent='space-between' gap='10px'>
                            {statusPills.map((pill) => {
                                return (
                                    <Button key={pill.name} onClick={() => { handleStatusComment(pill); handleStatusClose(); }} sx={{ p: '0px', b: '0px' }}>
                                        <Pills pill={pill.name} />
                                    </Button>
                                )
                            })}
                        </Stack>
                    </Box>
                </Box>
            </Dialog>

            <Dialog open={commentOpen} onClose={handleCommentClose} fullWidth>
                <DialogContent>
                    <Box display='flex' flexDirection='column' gap='15px'>
                        <Box display='flex' justifyContent='space-between'>
                            <Typography fontWeight='bold'>Comment:</Typography>
                            <CloseIcon onClick={handleCommentClose} cursor='pointer' />
                        </Box>
                        <TextField
                            multiline
                            fullWidth
                            rows={4}
                            InputProps={{
                                endAdornment: <InputAdornment position='end' sx={{ mt: '-68px' }}><SendIcon onClick={handleStatusChange} sx={{ cursor: 'pointer' }} /></InputAdornment>,
                            }}
                            onChange={e => setComment(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleStatusChange();
                                    e.preventDefault();
                                }
                            }}
                            value={comment}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default TicketsAccordion;
