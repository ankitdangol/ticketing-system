import { Box, Typography, useTheme } from '@mui/material';
import isMobile from '../../hooks/isMobile';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { NavLink, useLocation } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const OverviewHeader = () => {
  const theme = useTheme();
  const mobile = isMobile();
  const location = useLocation();

  return (
    <>
      {mobile ? (
        <Box sx={{ backgroundColor: theme.palette.background.default, display: 'flex', justifyContent: 'space-between', position: 'fixed', left: '15px', right: '15px', mt: '80px', pb: '10px', pt:'5px' }}>
          <Typography fontWeight='bold' flex={1}>Overview</Typography>
          <Box display='flex' gap='1px' flex={1} justifyContent='center' mt='7px'>
            <NavLink to='/'>
              <ChevronLeftIcon sx={{ mt: '-6px', p: '0px', color: 'black' }} />
            </NavLink>
            {location.pathname === '/' ?
              <>
                <FiberManualRecordIcon sx={{ width: '10px', height: '10px' }} />
                <FiberManualRecordOutlinedIcon sx={{ width: '10px', height: '10px' }} />
              </>
              :
              <>
                <FiberManualRecordOutlinedIcon sx={{ width: '10px', height: '10px' }} />
                <FiberManualRecordIcon sx={{ width: '10px', height: '10px' }} />
              </>
            }

            <NavLink to='/mobile_status'>
              <ChevronRightIcon sx={{ mt: '-6px', p: '0px', color: 'black' }} />
            </NavLink>

          </Box>
          <Typography flex={1} textAlign='end'>{new Date().toLocaleDateString('en-GB')}</Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h6' fontWeight='bold'>Overview</Typography>
          <Typography>{new Date().toLocaleDateString('en-GB')}</Typography>
        </Box>
      )
      }
    </>
  );
};

export default OverviewHeader;
