import { useRef, useState, useContext } from 'react';
import { TextField, Select, MenuItem, SelectChangeEvent, InputLabel, FormControl, Button, Typography, styled, ButtonProps } from "@mui/material";
import AttachmentIcon from '@mui/icons-material/Attachment';
import { Box } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjgyNTAyNjE4LCJleHAiOjE2ODUwOTQ2MTh9.OKobUkpcVJrHAhLt48L7T3Fz537kS3Da3DM8aBdr0TQ'

const MobileCreateTicketForm = () => {

    const [type, setType] = useState('');
    const [priority, setPriority] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState<any>([])

    const handleTypeChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };

    const handlePriorityChange = (event: SelectChangeEvent) => {
        setPriority(event.target.value as string);
    };

    const uploadInputRef = useRef<HTMLInputElement>(null);

    const AttachButton = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.secondary.main,
        border: 'solid',
        borderWidth: '1px',
        borderColor: theme.palette.secondary.light,
        textTransform: 'none'
    }));

    const navigate = useNavigate();

    const createTicket = async () => {

        const formData = new FormData()

        Array.from(files).forEach((file: any) => {
            formData.append('files', file)
            formData.append('ref', 'ticket');
            formData.append('field', "attachment");
        })

        axios.post("http://localhost:1337/api/upload", formData)
            .then((response) => {
                const attachments: any = []
                response.data.map((imageId: any) => {
                    attachments.push(imageId.id)
                })
                const ticketInfo = {
                    data: {
                        description: description,
                        type: type,
                        priority: priority,
                        status: 'backlog',
                        attachment: attachments
                    }
                };
                createTicketService(ticketInfo);
            }).catch((error) => {
                const ticketInfo = {
                    data: {
                        description: description,
                        type: type,
                        priority: priority,
                        status: 'backlog'
                    }
                };
                createTicketService(ticketInfo);
            })

        setDescription('');
        setPriority('');
        setType('');
        setFiles('');
    }

    const createTicketService = async (ticketInfo: any) => {
        axios.post("http://localhost:1337/api/tickets", ticketInfo)
            .then((response) => {
                const idInfo = {
                    ticket_id: 'ticket' + response.data.data.id
                }
                const message = {
                    message: response.data.data.attributes.description,
                    ticket: response.data.data.id
                }
                putId(response.data.data.id, idInfo);
                firstMessage(message);
            }).catch((error) => {
                console.log(error);
            })
    }

    const firstMessage = async (message: any) => {
        const add = await fetch(`http://localhost:1337/api/chats`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: message })
        })
        const addMessage = await add.json()
        // console.log(addMessage);
    }

    const putId = async (id: number, idInfo: object) => {
        const add = await fetch(`http://localhost:1337/api/tickets/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: idInfo })
        })
        const addResponse = await add.json()
        // console.log(addResponse);
        navigate('/tickets');
    }

    return (
        <>
            <Box display='flex' flexDirection='column' gap='10px'>
                <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    fullWidth
                    rows={8}
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                />

                <FormControl fullWidth size='small'>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Type"
                        value={type}
                        onChange={handleTypeChange}
                    >
                        <MenuItem value='bug'>Bug</MenuItem>
                        <MenuItem value='task'>Task</MenuItem>
                        <MenuItem value='feature'>Feature</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth size='small'>
                    <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Priority"
                        value={priority}
                        onChange={handlePriorityChange}
                    >
                        <MenuItem value='highest'>Highest</MenuItem>
                        <MenuItem value='high'>High</MenuItem>
                        <MenuItem value='medium'>Medium</MenuItem>
                        <MenuItem value='low'>Low</MenuItem>
                    </Select>
                </FormControl>

                <input
                    type="file"
                    onChange={(e) => setFiles(e.target.files)}
                    multiple
                    accept='image/*'
                />

                {/* <AttachButton
                    onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
                    sx={{ display: 'flex', justifyContent: 'space-between', pl: '13px', pr: '7px', width: '50%' }}
                >
                    <Typography>Attach images</Typography>
                    <AttachmentIcon />
                </AttachButton> */}

                <Button onClick={createTicket} variant="contained" color='info' size='small' sx={{ width: '90px', mx: 'auto', mt: '5px', textTransform: 'none' }}>Create</Button>
            </Box>
        </>
    )
}

export default MobileCreateTicketForm
