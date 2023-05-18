import { Box, Typography } from '@mui/material';
import OverviewTicket from './OverviewTicket';
import { useEffect, useState } from 'react';

const TicketsContainer = (props: any) => {

  const [data, setData] = useState<any>();

  useEffect(() => {
    if (props.type == 'Recently added') {
      fetch(`http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc&pagination%5Blimit%5D=3`)
        .then((resp) => resp.json())
        .then((apiData) => {
          setData(apiData.data);
        });
    }
    else if (props.type == 'In progress') {
      fetch(`http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc&filters[status][$eq]=in progress&pagination%5Blimit%5D=3`)
        .then((resp) => resp.json())
        .then((apiData) => {
          setData(apiData.data);
        });
    }
    else {
      fetch(`http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc&filters[status][$eq]=passed&pagination%5Blimit%5D=3`)
        .then((resp) => resp.json())
        .then((apiData) => {
          setData(apiData.data);
        });
    }
  }, [])

  return (
    <>
      <Box
        width='275px'
        bgcolor='white'
        p='10px'
        pb='15px'
        border='dashed'
        borderRadius='10px'
        borderColor='gray'
        display='flex'
        flexDirection='column'
        gap='10px'
        height='393px'
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mx: '5px' }}>
          <Typography>{props.type}</Typography>
          <Typography color='#3751FF'>View all</Typography>
        </Box>
        {data?.length > 0 ?
          data.map((data: any) => {
            return <OverviewTicket data={data} key={data.ticket_id} />
          })
          :
          ''
        }
      </Box>
    </>
  );
};

export default TicketsContainer;
