import TicketsAccordion from '../../components/Mobile/TicketsAccordion';
import { Box } from '@mui/material';
import { useContext } from 'react';
import { RefreshContext } from '../../App';
import Filter from '../../components/Filter';
import { DataContext } from '../../pages/TicketsPage';

const MobileTicketsPageLayout = () => {

    const { refresh, setRefresh } = useContext(RefreshContext);

    const { data, setData } = useContext(DataContext);

    const toggleRefresh = () => {
        refresh == true ? setRefresh(false) : setRefresh(true)
    }

    const titles = ['Type', 'Priority', 'Status']

    return (
        <>
            <Box mt='90px' mx='15px'>
                <Filter />
                <Box>
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
