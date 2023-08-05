import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState, useContext } from 'react';
import { Dialog, Box, Typography, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { token } from '../../config/constants';
import { RefreshContext } from '../../App';

const DueDatePicker = (props: any) => {
    const { refresh, setRefresh } = useContext(RefreshContext);

    const toggleRefresh = () => {
        refresh == true ? setRefresh(false) : setRefresh(true)
    }

    const id = props.selectedRowId != null ? props.selectedRowId.split('ticket') : 'undefined';
    const selectedId = parseInt(id[1]);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [date, setDate] = useState<any>();

    const headers = { 'Authorization': `Bearer ${token}` };

    const handleDate = () => {
        const dt = new Date(date);

        const year = dt.toLocaleString("default", { year: "numeric" });
        const month = dt.toLocaleString("default", { month: "2-digit" });
        const day = dt.toLocaleString("default", { day: "2-digit" });

        const formattedDate = year + "-" + month + "-" + day;

        const dueDate = {
            data: {
                'due_date': formattedDate
            }
        }

        axios.put(`http://localhost:1337/api/tickets/${selectedId}`, dueDate, {
            headers: headers
        }).then((response) => {
            toggleRefresh();
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            <CalendarMonthIcon onClick={handleClickOpen} cursor='pointer' />

            <Dialog open={open} onClose={handleClose} maxWidth='sm'>
                <Box display='flex' flexDirection='column' gap='10px' p='15px'>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Typography>Enter Date:</Typography>
                        <CloseIcon onClick={handleClose} cursor='pointer' />
                    </Box>

                    <Box display='flex' alignItems='center' justifyContent='space-between' gap='5px'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker onChange={(x, event) => setDate(x)} disableOpenPicker format='DD/MM/YYYY' slotProps={{ textField: { size: 'small' } }} />
                        </LocalizationProvider>

                        <SendIcon cursor='pointer' onClick={handleDate} />
                    </Box>
                </Box>
            </Dialog >
        </>
    )
}

export default DueDatePicker;
