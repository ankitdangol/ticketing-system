import { Box, Typography } from '@mui/material';
import OverviewTicket from './OverviewTicket';
import { useContext, useEffect, useState } from 'react';
import isMobile from '../../hooks/isMobile';
import { useNavigate } from 'react-router-dom';
import { FilterContext, RefreshContext } from '../../App';

const TicketsContainer = (props: any) => {

  const [data, setData] = useState<any>();

  const { homePageFilter, setHomePageFilter } = useContext(FilterContext);

  const { refresh, setRefresh } = useContext(RefreshContext);

  const toggleRefresh = () => {
    refresh == true ? setRefresh(false) : setRefresh(true)
  }

  useEffect(() => {
    if (props.type == 'Recently Added') {
      fetch(`http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc&pagination%5Blimit%5D=3`)
        .then((resp) => resp.json())
        .then((apiData) => {
          setData(apiData.data);
        });
    }
    else if (props.type == 'In Progress') {
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

  const navigate = useNavigate();

  const handleViewAll = () => {
    if (props.type == 'Recently Added') {
      navigate('/tickets');
    }
    else if (props.type == 'In Progress') {
      setHomePageFilter('In Progress');
      toggleRefresh();
      navigate('/tickets');
    }
    else {
      setHomePageFilter('Passed');
      toggleRefresh();
      navigate('/tickets');
    }
  }

  const mobile = isMobile();

  return (
    <>
      {!mobile ?
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
            <Typography color='#3751FF' onClick={handleViewAll} sx={{ cursor: 'pointer' }}>View all</Typography>
          </Box>
          {data?.length > 0 ?
            data.map((individualData: any) => {
              return <OverviewTicket data={individualData} key={individualData.ticket_id} />
            })
            :
            ''
          }
        </Box>
        :
        <Box
          width='100%'
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
            <Typography color='#3751FF' onClick={handleViewAll}>View all</Typography>
          </Box>
          {data?.length > 0 ?
            data.map((individualData: any) => {
              return <OverviewTicket data={individualData} key={individualData.ticket_id} />
            })
            :
            ''
          }
        </Box>
      }

    </>
  );
};

export default TicketsContainer;
