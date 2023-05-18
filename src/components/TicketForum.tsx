import { Box, InputAdornment, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import MessageBox from "./MessageBox";
import { useEffect, useState } from "react";
import isMobile from "../hooks/isMobile";


const TicketForum = (props: any) => {
    const [refresh, setRefresh] = useState(true);

    const [data, setData] = useState<any>(props.data);

    useEffect(() => {
        fetch('http://localhost:1337/api/tickets?populate=*')
            .then((resp) => resp.json())
            .then((apiData) => {
                setData(apiData.data);
            });
    }, [refresh]);

    // console.log(data);

    const toggleRefresh = () => {
        refresh == true ? setRefresh(false) : setRefresh(true)
    }

    const createMessage = async () => {

        const ticket = selectedTicket?.length > 0 ? selectedTicket[0].id : 'undefined'

        // console.log(ticket);

        const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjgyNTAyNjE4LCJleHAiOjE2ODUwOTQ2MTh9.OKobUkpcVJrHAhLt48L7T3Fz537kS3Da3DM8aBdr0TQ'
        const messageInfo = {
            message: message,
            ticket: ticket
        }

        const add = await fetch('http://localhost:1337/api/chats', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: messageInfo })
        })

        const addResponse = await add.json()

        // console.log(addResponse);

        toggleRefresh();

        setMessage('');
    }

    const getSelectedTicket = (ticket: any) => {
        return ticket.attributes.ticket_id == props.selectedRowId;
    }

    const selectedTicket = data?.length > 0 ? data.filter(getSelectedTicket) : 'undefined';

    const messages = selectedTicket?.length > 0 ? selectedTicket[0].attributes.chats.data : 'undefined';

    const reversedMessages = messages
        .slice(0)
        .reverse()
        .map((element: object) => {
            return element;
        });

    const [message, setMessage] = useState('');

    function generateRandom() {
        const length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    const mobile = isMobile();

    return (
        <>
            {
                !mobile ?
                    <Box height='500px' width='700px' p='15px' border='solid' borderColor='lightgray' borderRadius='5px' overflow='scroll' sx={{ borderWidth: '1px' }} >
                        <Box mb='15px'>
                            <TextField id="outlined-basic" placeholder="Reply..." variant="outlined" fullWidth
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><SendIcon onClick={createMessage} sx={{ cursor: 'pointer' }} /></InputAdornment>,
                                }}
                                onChange={e => setMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        createMessage();
                                        e.preventDefault();
                                    }
                                }}
                                value={message}
                            />
                        </Box>
                        {selectedTicket?.length > 0 ? reversedMessages.map((message: string) => {
                            // console.log(message);
                            return (
                                <MessageBox key={generateRandom()} message={message} />
                            )
                        }) : 'undefined'}
                    </Box>
                    :
                    <Box height='500px' p='15px' border='solid' borderColor='lightgray' borderRadius='5px' overflow='scroll' sx={{ borderWidth: '1px' }} >
                        <Box mb='15px'>
                            <TextField id="outlined-basic" placeholder="Reply..." variant="outlined" fullWidth
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><SendIcon onClick={createMessage} sx={{ cursor: 'pointer' }} /></InputAdornment>,
                                }}
                                onChange={e => setMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        createMessage();
                                        e.preventDefault();
                                    }
                                }}
                                value={message}
                            />
                        </Box>
                        {selectedTicket?.length > 0 ? reversedMessages.map((message: string) => {
                            return (
                                <MessageBox key={generateRandom()} message={message} />
                            )
                        }) : 'undefined'}
                    </Box>
            }
        </>
    )
}

export default TicketForum
