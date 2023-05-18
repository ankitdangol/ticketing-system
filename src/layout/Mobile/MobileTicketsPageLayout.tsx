import TicketsAccordion from '../../components/Mobile/TicketsAccordion';
import { Box } from '@mui/material';
import Dropdown from '../../components/Mobile/Dropdown';
import { useEffect, useState, useContext } from 'react';
import { RefreshContext } from '../../App';

const MobileTicketsPageLayout = () => {

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

    const titles = ['Type', 'Priority', 'Status']

    return (
        <>
            <Box mt='80px' mx='15px'>
                <Box display='flex'>
                    {titles.map((title) => (
                        <Dropdown title={title} key={title} />
                    ))}
                </Box>
                <Box>
                    {data?.length > 0 ? data.map((ticket: any) => (
                        <TicketsAccordion key={ticket.attributes.ticket_id} data={ticket} apiData={data} />
                    ))
                        :
                        'undefined'
                    }
                </Box>
            </Box>
        </>
    )
}

export default MobileTicketsPageLayout;
