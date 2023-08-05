import TicketsAccordion from '../../components/Mobile/TicketsAccordion';
import { Box, FormControl, Input, InputAdornment, Button } from '@mui/material';
import { useContext, useState } from 'react';
import Filter from '../../components/Filter';
import { DataContext } from '../../pages/TicketsPage';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { MeiliSearch } from 'meilisearch';
import ClearIcon from '@mui/icons-material/Clear';
import { useTheme } from '@mui/material/styles';

const MobileTicketsPageLayout = () => {

    const theme = useTheme();

    const [searchToggle, setSearchToggle] = useState(false);

    const toggleSearch = () => {
        searchToggle == true ? setSearchToggle(false) : setSearchToggle(true)
    }

    const [searchText, setSearchText] = useState<string>();

    const { data, setData } = useContext(DataContext);

    const client = new MeiliSearch({
        host: 'http://localhost:7700/'
    })

    const searchTickets = async () => {
        client
            .index('ticket')
            .search(searchText)
            .then((results) => {
                const finalResult: any = []
                results.hits.map(hit => {
                    hit.attachment != null ?
                        hit.attachment = {
                            data: hit.attachment.map((item: any) => {
                                return { attributes: item };
                            })
                        }
                        :
                        ''
                    hit.chats != null ?
                        hit.chats = {
                            data: hit.chats.map((item: any) => {
                                return { attributes: item };
                            })
                        }
                        :
                        ''
                    const finalResults = {
                        attributes: hit
                    }
                    finalResult.push(finalResults);
                })
                setData(finalResult);
                setSearchText('');
            })
    }

    const clearSearch = () => {
        fetch('http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc')
            .then((resp) => resp.json())
            .then((apiData) => {
                setData(apiData.data);
            });
        setSearchText('');
    }

    return (
        <>
            <Box mx='15px' display='flex' flexDirection='column'>
                {searchToggle == false ?
                    <Box display='flex' position='fixed' width='92%' justifyContent='space-between' pt='85px' gap='5px' alignItems='center' zIndex='1' sx={{ backgroundColor: theme.palette.background.default }}>
                        <Filter />
                        <SearchIcon onClick={toggleSearch} />
                    </Box>
                    :
                    <Box display='flex' position='fixed' width='92%' justifyContent='space-between' pt='85px' gap='5px' alignItems='center' zIndex='1' sx={{ backgroundColor: theme.palette.background.default }}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <Input
                                startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                                size='small'
                                placeholder='Search...'
                                onChange={e => setSearchText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        searchTickets();
                                        e.preventDefault();
                                    }
                                }}
                                value={searchText}
                            />
                        </FormControl>
                        <Box display='flex' gap='5px' mt='-3px'>
                            <Button variant='contained' color='error' onClick={clearSearch} sx={{ minWidth: '22px', height: '22px', p: '0px' }}><ClearIcon sx={{ width: '20px', height: '20px' }} /></Button>
                            <FilterAltIcon onClick={toggleSearch} />
                        </Box>
                    </Box>
                }
                <Box mb='65px' mt='130px' px='2px'>
                    {data?.length > 0 ? data.map((ticket: any) => (
                        <TicketsAccordion key={ticket.attributes.ticket_id} data={ticket} apiData={data} />
                    ))
                        :
                        'No matches!'
                    }
                </Box>
            </Box>
        </>
    )
}

export default MobileTicketsPageLayout;
