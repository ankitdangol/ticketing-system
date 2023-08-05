import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Pills from '../Pills';
import TableIcons from './TableIcons';
import { Box, Typography, Dialog, DialogContent, InputAdornment, Button, Stack, TextField } from '@mui/material';
import { useState, useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import Filter from '../Filter';
import { DataContext } from '../../pages/TicketsPage';
import { RefreshContext } from '../../App';
import ViewAttachments from './ViewAttachments';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { token } from '../../config/constants';
import DueDatePicker from './DueDatePicker';
import { UserDataContext } from '../../routes/Main';

const TicketsTable = () => {

    const { data, setData } = useContext(DataContext);

    const { refresh, setRefresh } = useContext(RefreshContext);

    const { userData, setUserData } = useContext(UserDataContext);

    // console.log(userData);

    const toggleRefresh = () => {
        refresh == true ? setRefresh(false) : setRefresh(true)
    }

    const getTickets = (ticket: any) => {
        return ticket.attributes;
    }

    const getUrl = (ticket: any) => {
        return ticket.attributes.url;
    }

    const tickets = data?.length > 0 ? data.map(getTickets) : '';

    const [open, setOpen] = useState(false);

    const [commentOpen, setCommentOpen] = useState(false);

    const [status, setStatus] = useState('');

    const handleStatusOpen = () => {
        setOpen(true);
    };

    const handleStatusClose = () => {
        setOpen(false);
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

    const columns: GridColDef[] = [
        {
            field: 'sn',
            renderHeader: () => {
                return <Typography fontWeight='bold'>SN</Typography>
            },
            headerAlign: 'center',
            align: 'center',
            width: 50,
            sortable: false,
            renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.row.ticket_id) + 1,
        },
        {
            field: 'ticket_id',
            renderHeader: () => {
                return (
                    <Box display='flex' alignItems='center'>
                        <Typography fontWeight='bold'>Ticket ID</Typography>
                        <ImportExportIcon />
                    </Box>
                )
            },
            headerAlign: 'center',
            width: 100,
            align: 'center',
            editable: false
        },
        {
            field: 'description',
            renderHeader: () => {
                return (
                    <Typography fontWeight='bold'>Description</Typography>
                )
            },
            width: 330,
            editable: false,
            sortable: false
        },
        {
            field: 'attachment',
            renderHeader: () => {
                return <Typography fontWeight='bold'>Attachment(s)</Typography>
            },
            headerAlign: 'center',
            width: 170,
            editable: false,
            sortable: false,
            align: 'center',
            renderCell: row => {
                const url = row?.row?.attachment?.data?.length > 0 ? row.row.attachment.data.map(getUrl) : 'undefined'

                const getImages = (ticket: any) => {
                    return `http://localhost:1337${ticket.attributes.url}`;
                }

                const images = row?.row?.attachment?.data?.length > 0 ? row.row.attachment.data.map(getImages) : ''

                return (
                    <>
                        {url != 'undefined' ?
                            <ViewAttachments url={url} images={images} />
                            :
                            <Box display='flex' justifyContent='center' alignItems='center'>
                                <Typography align='center'>-</Typography>
                            </Box>
                        }
                    </>
                )
            }
        },

        {
            field: 'type',
            renderHeader: () => {
                return <Typography fontWeight='bold'>Type</Typography>
            },
            headerAlign: 'center',
            align: 'center',
            width: 100,
            editable: false,
            sortable: false,
            renderCell: row => {
                const type = row?.row?.type?.length > 0 ? row.row.type : 'undefined';
                return <Pills pill={type} />;
            }

        },
        {
            field: 'priority',
            renderHeader: () => {
                return <Typography fontWeight='bold'>Priority</Typography>
            },
            headerAlign: 'center',
            align: 'center',
            width: 110,
            editable: false,
            sortable: false,
            renderCell: row => {
                const priority = row?.row?.priority?.length > 0 ? row.row.priority : 'undefined';
                return <Pills pill={priority} />;
            }
        },
        {
            field: 'status',
            renderHeader: () => {
                return <Typography fontWeight='bold'>Status</Typography>
            },
            headerAlign: 'center',
            align: 'center',
            width: 110,
            editable: false,
            sortable: false,
            renderCell: row => {
                const status = row?.row?.status?.length > 0 ? row.row.status : 'undefined';
                const id = row.row.ticket_id != null ? row.row.ticket_id.split('ticket') : 'undefined';
                const idToChange = parseInt(id[1]);
                return (
                    <>
                        <Button onClick={() => { handleStatusOpen(); handleStatusToChange(idToChange); }} sx={{ p: '0px', b: '0px' }}>
                            <Pills pill={status} />
                        </Button>
                    </>
                )
            }
        },
        {
            field: 'due_date',
            renderHeader: () => {
                return (
                    <Box display='flex' alignItems='center'>
                        <Typography fontWeight='bold'>Due Date</Typography>
                        <ImportExportIcon />
                    </Box>
                )
            },
            headerAlign: 'center',
            align: 'center',
            width: 110,
            editable: false,
            renderCell: row => {
                if (row?.row?.due_date?.length > 0) {
                    return (
                        <Typography>{new Date(row.row.due_date).toLocaleDateString('en-GB')}</Typography>
                    )
                }
                else {
                    return (
                        <DueDatePicker selectedRowId={row.row.ticket_id} />
                    )
                }
            }
        },
        {
            field: 'forum',
            headerName: '',
            flex: 1,
            align: 'center',
            editable: false,
            sortable: false,
            renderCell: (rowData) => {
                return <TableIcons selectedRowId={rowData.row.ticket_id} data={data} />
            }
        }
    ];

    return (
        <>
            <Filter />
            <Box sx={{ bgcolor: 'white', height: '91%', width: '100%' }}>
                <DataGrid
                    rows={tickets}
                    columns={columns}
                    rowHeight={50}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10, 15, 20, 25, 30]}
                    disableColumnMenu
                    sx={{
                        border: 'none',
                        '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
                            width: '0.4em',
                        },
                        '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                        },
                        '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
                            backgroundColor: '#888',
                        },
                        '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover': {
                            background: '#555',
                        },
                        '& .MuiDataGrid-cell:focus-within': {
                            outline: 'none'
                        },
                        '& .MuiDataGrid-columnHeaders.MuiDataGrid-withBorderColor.css-1iyq7zh-MuiDataGrid-columnHeaders': {
                            borderColor: 'darkgray',
                            borderWidth: '1px'
                        }
                    }}
                    getRowId={row => row.ticket_id}
                    disableRowSelectionOnClick
                />
            </Box>

            <Dialog open={open} onClose={handleStatusClose} maxWidth='xl'>
                <DialogContent>
                    <Box display='flex' flexDirection='column' gap='15px'>
                        <Box display='flex' justifyContent='space-between'>
                            <Typography fontWeight='bold'>Change status to:</Typography>
                            <CloseIcon onClick={handleStatusClose} cursor='pointer' />
                        </Box>
                        <Stack direction='row' justifyContent='space-between' gap='10px'>
                            {statusPills.map((pill) => {
                                return (
                                    <Button key={pill.name} onClick={() => { handleStatusComment(pill); handleStatusClose(); }} sx={{ p: '0px', b: '0px' }}>
                                        <Pills pill={pill.name} />
                                    </Button>
                                )
                            })}
                        </Stack>
                    </Box>
                </DialogContent>
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
    );
}

export default TicketsTable;
