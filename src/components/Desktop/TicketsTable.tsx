import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Pills from '../Pills';
import TableIcons from './TableIcons';
import { Typography, Dialog, DialogContent, InputAdornment, Button, Stack, TextField, Select, MenuItem, SelectChangeEvent, InputLabel, FormControl } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useEffect, useState, useContext } from 'react';
import { RefreshContext } from '../../App';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const TicketsTable = () => {

    const { refresh, setRefresh } = useContext(RefreshContext);

    const toggleRefresh = () => {
        refresh == true ? setRefresh(false) : setRefresh(true)
    }

    const [data, setData] = useState<any>();

    useEffect(() => {
        fetch('http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc')
            .then((resp) => resp.json())
            .then((apiData) => {
                setData(apiData.data);
            });
    }, [refresh]);

    // console.log(data);

    const getTickets = (ticket: any) => {
        return ticket.attributes;
    }

    const getUrl = (ticket: any) => {
        return ticket.attributes.url;
    }

    const tickets = data?.length > 0 ? data.map(getTickets) : 'undefined';

    // console.log(tickets);

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
        const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjgyNTAyNjE4LCJleHAiOjE2ODUwOTQ2MTh9.OKobUkpcVJrHAhLt48L7T3Fz537kS3Da3DM8aBdr0TQ'

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
                'Authorization': `Bearer ${jwt}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: ticketInfo })
        })

        const addComment = await fetch('http://localhost:1337/api/chats', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt}`,
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

    const [imageOpen, setImageOpen] = useState(false);

    const [imageToOpen, setImageToOpen] = useState('');

    const handleImageOpen = () => {
        setImageOpen(true);
    };

    const handleImageClose = () => {
        setImageOpen(false);
    };

    const handleImageToOpen = (imageUrl: string) => {
        setImageToOpen(imageUrl)
    }

    function generateRowId() {
        const length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    const columns: GridColDef[] = [
        {
            field: 'ticket_id',
            renderHeader: () => {
                return <Typography fontWeight='bold'>Ticket ID</Typography>
            },
            headerAlign: 'center',
            width: 100,
            align: 'center',
            editable: false
        },
        {
            field: 'description',
            renderHeader: () => {
                return <Typography fontWeight='bold'>Description</Typography>
            },
            width: 300,
            editable: false,
            sortable: false
        },
        {
            field: 'attachment',
            renderHeader: () => {
                return <Typography fontWeight='bold'>Attachment/s</Typography>
            },
            width: 250,
            editable: false,
            sortable: false,
            renderCell: row => {
                const url = row?.row?.attachment?.data?.length > 0 ? row.row.attachment.data.map(getUrl) : 'undefined'
                return (
                    <Box display='flex' gap='10px' alignItems='center'>
                        {url != 'undefined' ?
                            url.map((imageUrl: string) => {
                                return (
                                    <>
                                        {/* <Box sx={{ cursor: 'pointer' }}> */}
                                        <img src={`http://localhost:1337${imageUrl}`} key={url} alt='' width='45%' height='45%' onClick={() => { handleImageOpen(); handleImageToOpen(imageUrl) }} />
                                        {/* </Box> */}
                                    </>
                                )
                            })
                            :
                            ''
                        }
                    </Box>
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
                return <Typography fontWeight='bold'>Due Date</Typography>
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker />
                        </LocalizationProvider>
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

    const [filterType, setFilterType] = useState('');

    const sortType = (event: SelectChangeEvent) => {
        setFilterType(event.target.value as string);
    };

    const [filterPriority, setFilterPriority] = useState('');

    const sortPriority = (event: SelectChangeEvent) => {
        setFilterPriority(event.target.value as string);
    };

    const [filterStatus, setFilterStatus] = useState('');

    const sortStatus = (event: SelectChangeEvent) => {
        setFilterStatus(event.target.value as string);
    };

    const filter = () => {
        if (filterType == '' && filterPriority == '' && filterStatus == '') {
            fetch('http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc')
                .then((resp) => resp.json())
                .then((apiData) => {
                    setData(apiData.data);
                });
        }
        else if (filterType != '' && filterPriority == '' && filterStatus == '') {
            fetch(`http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc&filters[type][$eq]=${filterType}`)
                .then((resp) => resp.json())
                .then((apiData) => {
                    console.log(apiData);
                    setData(apiData.data);
                });
        }
        else if (filterType == '' && filterPriority != '' && filterStatus == '') {
            fetch(`http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc&filters[priority][$eq]=${filterPriority}`)
                .then((resp) => resp.json())
                .then((apiData) => {
                    console.log(apiData);
                    setData(apiData.data);
                });
        }
        else if (filterType == '' && filterPriority == '' && filterStatus != '') {
            fetch(`http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc&filters[status][$eq]=${filterStatus}`)
                .then((resp) => resp.json())
                .then((apiData) => {
                    console.log(apiData);
                    setData(apiData.data);
                });
        }
        else if (filterType != '' && filterPriority != '' && filterStatus == '') {
            fetch(`http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc&filters[type][$eq]=${filterType}&filters[priority][$eq]=${filterPriority}`)
                .then((resp) => resp.json())
                .then((apiData) => {
                    console.log(apiData);
                    setData(apiData.data);
                });
        }
        else if (filterType != '' && filterPriority == '' && filterStatus != '') {
            fetch(`http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc&filters[type][$eq]=${filterType}&filters[status][$eq]=${filterStatus}`)
                .then((resp) => resp.json())
                .then((apiData) => {
                    console.log(apiData);
                    setData(apiData.data);
                });
        }
        else if (filterType == '' && filterPriority != '' && filterStatus != '') {
            fetch(`http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc&filters[priority][$eq]=${filterPriority}&filters[status][$eq]=${filterStatus}`)
                .then((resp) => resp.json())
                .then((apiData) => {
                    console.log(apiData);
                    setData(apiData.data);
                });
        }
        else {
            fetch(`http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc&filters[type][$eq]=${filterType}&filters[priority][$eq]=${filterPriority}&filters[status][$eq]=${filterStatus}`)
                .then((resp) => resp.json())
                .then((apiData) => {
                    console.log(apiData);
                    setData(apiData.data);
                });
        }
    }

    const clearFilter = () => {
        setFilterType('');
        setFilterPriority('');
        setFilterStatus('');
        toggleFilterRefresh();
    }

    const [filterRefresh, setFilterRefresh] = useState(false);

    const toggleFilterRefresh = () => {
        filterRefresh == true ? setFilterRefresh(false) : setFilterRefresh(true)
    }

    useEffect(() => {
        filter();
    }, [filterRefresh])

    return (
        <>
            <Box display='flex' justifyContent='space-between' mt='-5px' px='17px' pb='7px' sx={{ borderBottom: 'solid', borderColor: 'darkgray', borderWidth: '1px' }}>
                <Typography variant='h6' fontWeight='bold'>Tickets</Typography>
                <Box display='flex' gap='10px' justifyContent='end' alignItems='end' mt='-15px' mb='10px'>
                    <Typography>Filter by:</Typography>
                    <FormControl size='small' variant='standard' >
                        <InputLabel>Type</InputLabel>
                        <Select
                            label='Type'
                            value={filterType}
                            onChange={sortType}
                            sx={{ width: '110px' }}
                        >
                            <MenuItem value='bug'>Bug</MenuItem>
                            <MenuItem value='task'>Task</MenuItem>
                            <MenuItem value='feature'>Feature</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size='small' variant='standard'>
                        <InputLabel>Priority</InputLabel>
                        <Select
                            label='Priority'
                            value={filterPriority}
                            onChange={sortPriority}
                            sx={{ width: '110px' }}
                        >
                            <MenuItem value='highest'>Highest</MenuItem>
                            <MenuItem value='high'>High</MenuItem>
                            <MenuItem value='medium'>Medium</MenuItem>
                            <MenuItem value='low'>Low</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size='small' variant='standard'>
                        <InputLabel>Status</InputLabel>
                        <Select
                            label='Status'
                            value={filterStatus}
                            onChange={sortStatus}
                            sx={{ width: '110px' }}
                        >
                            <MenuItem value='backlog'>Backlog</MenuItem>
                            <MenuItem value='todo'>Todo</MenuItem>
                            <MenuItem value='in progress'>In Progress</MenuItem>
                            <MenuItem value='pr'>PR</MenuItem>
                            <MenuItem value='pr done'>PR Done</MenuItem>
                            <MenuItem value='done'>Done</MenuItem>
                            <MenuItem value='tested'>Tested</MenuItem>
                            <MenuItem value='passed'>Passed</MenuItem>
                            <MenuItem value='redo'>Redo</MenuItem>
                        </Select>
                    </FormControl>

                    <Box display='flex' gap='5px'>
                        <Button variant='contained' size='small' color='info' onClick={filter}>Apply</Button>
                        <Button variant='contained' size='small' color='error' onClick={clearFilter}>Clear</Button>
                    </Box>
                </Box >
            </Box>

            <Box sx={{ bgcolor: 'white', height: '91%', width: '100%' }}>
                <DataGrid
                    rows={tickets}
                    rowHeight={75}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
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
                    getRowId={() => generateRowId()}
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

            <Dialog open={imageOpen} onClose={handleImageClose} maxWidth='md'>
                <DialogContent sx={{ padding: '0px' }}>
                    <img src={`http://localhost:1337${imageToOpen}`} key={imageToOpen} alt='' width='100%' height='100%' />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default TicketsTable;