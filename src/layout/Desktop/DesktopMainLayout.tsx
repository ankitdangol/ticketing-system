import React from 'react';
import DesktopHeader from '../../components/Desktop/DesktopHeader';
import Sidebar from '../../components/Desktop/Sidebar';
import { Box } from '@mui/material';

const DesktopMainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <DesktopHeader />
      <Box display="flex" flexDirection="row" role="list">
        <Sidebar />
        {children}
      </Box>
    </>
  );
};

export default DesktopMainLayout;
