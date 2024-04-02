import { useEffect, useState, useContext } from 'react';
import { Box, Button, Typography, Select, MenuItem, SelectChangeEvent, InputLabel, FormControl } from '@mui/material';
import { DataContext } from '../pages/TicketsPage';
import isMobile from '../hooks/isMobile';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { token } from '../config/constants';

const Filter = () => {
    const { data, setData } = useContext(DataContext);

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
        const headers = { 'Authorization': `Bearer ${token}` };

        if (filterType == '' && filterPriority == '' && filterStatus == '') {
            fetch('http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc', { headers })
                .then((resp) => resp.json())
                .then((apiData) => {
                    setData(apiData.data);
                });
        }
        else if (filterType != '' && filterPriority == '' && filterStatus == '') {
            fetch(`http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc&filters[type][$eq]=${filterType}`, { headers })
                .then((resp) => resp.json())
                .then((apiData) => {
                    setData(apiData.data);
                });
        }
        else if (filterType == '' && filterPriority != '' && filterStatus == '') {
            fetch(`http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc&filters[priority][$eq]=${filterPriority}`, { headers })
                .then((resp) => resp.json())
                .then((apiData) => {
                    setData(apiData.data);
                });
        }
        else if (filterType == '' && filterPriority == '' && filterStatus != '') {
            fetch(`http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc&filters[status][$eq]=${filterStatus}`, { headers })
                .then((resp) => resp.json())
                .then((apiData) => {
                    setData(apiData.data);
                });
        }
        else if (filterType != '' && filterPriority != '' && filterStatus == '') {
            fetch(`http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc&filters[type][$eq]=${filterType}&filters[priority][$eq]=${filterPriority}`, { headers })
                .then((resp) => resp.json())
                .then((apiData) => {
                    setData(apiData.data);
                });
        }
        else if (filterType != '' && filterPriority == '' && filterStatus != '') {
            fetch(`http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc&filters[type][$eq]=${filterType}&filters[status][$eq]=${filterStatus}`, { headers })
                .then((resp) => resp.json())
                .then((apiData) => {
                    setData(apiData.data);
                });
        }
        else if (filterType == '' && filterPriority != '' && filterStatus != '') {
            fetch(`http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc&filters[priority][$eq]=${filterPriority}&filters[status][$eq]=${filterStatus}`, { headers })
                .then((resp) => resp.json())
                .then((apiData) => {
                    setData(apiData.data);
                });
        }
        else if (filterType != '' && filterPriority != '' && filterStatus != '') {
            fetch(`http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc&filters[type][$eq]=${filterType}&filters[priority][$eq]=${filterPriority}&filters[status][$eq]=${filterStatus}`, { headers })
                .then((resp) => resp.json())
                .then((apiData) => {
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

    const mobile = isMobile();

    return (
        <>
            {mobile ?
                <>
                    <Box display='flex' gap='10px' alignItems='center' justifyContent='space-between' width='100%'>
                        <Box display='flex' >
                            <FormControl size='small' sx={{
                                ml: '-10px',
                                mr: '-15px',
                                '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                                    borderWidth: '0px'
                                },
                                '& .css-lawzqp-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderWidth: '0px'
                                },
                                '& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon': {
                                    mt: '2px'
                                }
                            }} >
                                <InputLabel>Types</InputLabel>
                                <Select
                                    label='Types'
                                    value={filterType}
                                    onChange={sortType}
                                    sx={{
                                        width: '85px'
                                    }}
                                >
                                    <MenuItem value='bug'>Bug</MenuItem>
                                    <MenuItem value='task'>Task</MenuItem>
                                    <MenuItem value='feature'>Feature</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl size='small' sx={{
                                mr: '-15px',
                                '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                                    borderWidth: '0px'
                                },
                                '& .css-4qc58x-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderWidth: '0px'
                                },
                                '& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon': {
                                    mt: '2px'
                                }
                            }} >
                                <InputLabel>Prioritys</InputLabel>
                                <Select
                                    label='Prioritysss'
                                    value={filterPriority}
                                    onChange={sortPriority}
                                    sx={{
                                        width: '105px'
                                    }}
                                >
                                    <MenuItem value='highest'>Highest</MenuItem>
                                    <MenuItem value='high'>High</MenuItem>
                                    <MenuItem value='medium'>Medium</MenuItem>
                                    <MenuItem value='low'>Low</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl size='small' sx={{
                                mr: '-15px',
                                '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                                    borderWidth: '0px'
                                },
                                '& .css-1kwd89o-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderWidth: '0px'
                                },
                                '& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon': {
                                    mt: '2px'
                                }
                            }} >
                                <InputLabel>Status</InputLabel>
                                <Select
                                    label='Status'
                                    value={filterStatus}
                                    onChange={sortStatus}
                                    sx={{
                                        width: '100px'
                                    }}
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
                        </Box>

                        <Box display='flex' gap='5px'>
                            <Button variant='contained' color='info' onClick={filter} sx={{ minWidth: '22px', height: '22px', p: '0px' }}><DoneIcon sx={{ width: '20px', height: '20px' }} /></Button>
                            <Button variant='contained' color='error' onClick={clearFilter} sx={{ minWidth: '22px', height: '22px', p: '0px' }}><ClearIcon sx={{ width: '20px', height: '20px' }} /></Button>
                        </Box>
                    </Box>
                </>
                :
                <>
                    <Box display='flex' justifyContent='space-between' mt='-5px' px='17px' pb='7px' sx={{ borderBottom: 'solid', borderColor: 'darkgray', borderWidth: '1px' }}>
                        <Typography variant='h6' fontWeight='bold'>Tickets</Typography>
                        <Box display='flex' gap='10px' justifyContent='end' alignItems='end' mt='-15px' mb='10px'>
                            <Typography>Filter by:</Typography>
                            <FormControl size='small' variant='standard'>
                                <InputLabel>Type</InputLabel>
                                <Select
                                    label='Type'
                                    value={filterType}
                                    onChange={sortType}
                                    sx={{
                                        width: '110px'
                                    }}
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
                </>
            }
        </>
    )
}

export default Filter
