import { Box, Typography } from '@mui/material';

type colorProps = {
  pill: string;
};

const Pills = (props: colorProps) => {
  const pills = [
    {
      name: 'HIGHEST',
      hexCode: '#E20000',
    },
    {
      name: 'HIGH',
      hexCode: '#FB7800',
    },
    {
      name: 'MEDIUM',
      hexCode: '#FEC400',
    },
    {
      name: 'LOW',
      hexCode: '#93A795',
    },
    {
      name: 'FEATURE',
      hexCode: '#A142FF',
    },
    {
      name: 'BUG',
      hexCode: '#000000',
    },
    {
      name: 'TASK',
      hexCode: '#4A00E8',
    },
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

  const selectedPill = pills.filter((pill) => pill.name.toUpperCase() == props.pill.toUpperCase());

  return (
    <>
      {selectedPill.map((pill) => {
        return (
          <Box
            sx={{
              bgcolor: `${pill.hexCode}`,
              color: 'white',
              px: '10px',
              width: '80px',
              height: '25px',
              borderRadius: '7px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            key={pill.name}
          >
            <Typography fontWeight='bold' fontSize='10px' >
              {pill.name}
            </Typography>
          </Box>
        );
      })}
    </>
  );
};

export default Pills;
