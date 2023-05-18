import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import { useState, useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { RefreshContext } from '../App';

const DeleteTicket = (props: any) => {
    const { refresh, setRefresh } = useContext(RefreshContext);

    const toggleRefresh = () => {
        refresh == true ? setRefresh(false) : setRefresh(true)
    }

    const id = props.selectedRowId != null ? props.selectedRowId.split('ticket') : 'undefined';

    const idToDelete = parseInt(id[1]);

    // console.log(idToDelete);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteTicket = async (id: any) => {

        const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjgyNTAyNjE4LCJleHAiOjE2ODUwOTQ2MTh9.OKobUkpcVJrHAhLt48L7T3Fz537kS3Da3DM8aBdr0TQ'

        const remove = await fetch(`http://localhost:1337/api/tickets/${idToDelete}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        const deleteResponse = await remove.json()

        // console.log(deleteResponse);

        toggleRefresh();

        handleClose();
    }

    return (
        <>
            <DeleteIcon onClick={handleClickOpen} cursor='pointer' />
            <Dialog open={open} onClose={handleClose} maxWidth='sm'>
                <Box display='flex' flexDirection='column' gap='10px' p='15px' alignItems='center'>
                    <Box display='flex' gap='3px' pr='2px'>
                        <DeleteIcon />
                        <Typography>Are you sure?</Typography>
                    </Box>
                    <Box display='flex' gap='10px'>
                        <Button size='small' variant='contained' color='error' onClick={deleteTicket}>Yes</Button>
                        <Button size='small' variant='outlined' onClick={handleClose}>No</Button>
                    </Box>
                </Box>
            </Dialog >
        </>
    )
}

export default DeleteTicket
