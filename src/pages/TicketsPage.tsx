import isMobile from '../hooks/isMobile';
import DesktopTicketsPage from './Desktop/DesktopTicketsPage';
import MobileTicketsPage from './Mobile/MobileTicketsPage';

const TicketsPage = () => {
  const mobile = isMobile();

  return (
    <>
      {mobile ?
        <MobileTicketsPage /> :
        <DesktopTicketsPage />
      }
    </>
  )
};

export default TicketsPage;
