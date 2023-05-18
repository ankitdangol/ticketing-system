import { Box, Stack, Typography } from '@mui/material';
import isMobile from '../../hooks/isMobile';
import OverviewHeader from './OverviewHeader';
import { useState, useEffect } from 'react';

const StatusBlock = () => {

  const [data, setData] = useState<any>();

  useEffect(() => {
    fetch('http://localhost:1337/api/tickets?fields=status')
      .then((resp) => resp.json())
      .then((apiData) => {
        setData(apiData.data);
      });
  }, []);

  const blockColor = [
    {
      name: 'backlog',
      hexCode: '#515B52',
    },
    {
      name: 'todo',
      hexCode: '#93A795',
    },
    {
      name: 'in progress',
      hexCode: '#FF7A00',
    },
    {
      name: 'pr',
      hexCode: '#1468B6',
    },
    {
      name: 'pr done',
      hexCode: '#0085FF',
    },
    {
      name: 'done',
      hexCode: '#0ED9CD',
    },
    {
      name: 'tested',
      hexcode: '#00800D',
    },
    {
      name: 'passed',
      hexCode: '#00E309',
    },
    {
      name: 'redo',
      hexCode: '#E30000',
    },
  ];

  const numberOfTickets = (color: any) => {
    const length = data?.length > 0 ? data.filter((ticket: any) => ticket.attributes.status === color.name) : 'undefined';
    return length.length
  }

  const mobile = isMobile();

  return (
    <>
      {!mobile ?
        <Stack direction='row' mt='20px' justifyContent='space-between' gap='10px'>
          {blockColor?.map((blockColor) => {
            const number = numberOfTickets(blockColor)
            return (
              <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                pb='5px'
                sx={{
                  width: '100%',
                  height: '65px',
                  borderRadius: '10px',
                  bgcolor: `${blockColor?.hexCode || '#00800D'}`,
                }}
                key={blockColor.name}
              >
                <Typography fontWeight='bold' fontSize='23px'>{number}</Typography>
                <Typography fontSize='12px'>{blockColor.name.toUpperCase()}</Typography>
              </Box>
            );
          })
          }
        </Stack >
        :
        <Box display='flex' flexDirection='column'>
          <OverviewHeader />
          <Box display='flex' flexWrap='wrap' gap='10px' mx='15px' mt='121px' zIndex='1'>
            {blockColor?.map((blockColor) => {
              const number = numberOfTickets(blockColor)
              return (
                <Box
                  display='flex'
                  flexDirection='column'
                  flexBasis='31%'
                  justifyContent='center'
                  alignItems='center'
                  sx={{
                    width: '100%',
                    height: '153px',
                    borderRadius: '10px',
                    bgcolor: `${blockColor?.hexCode || '#00800D'}`,
                  }}
                  key={blockColor.name}
                >
                  <Typography fontWeight='bold' fontSize='30px'>{number}</Typography>
                  <Typography fontWeight='bold' fontSize='13px'>{blockColor.name.toUpperCase()}</Typography>
                </Box>
              );
            })
            }
          </Box>
        </Box>

      }
    </>
  );
};

export default StatusBlock;
