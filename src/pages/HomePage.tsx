import isMobile from '../hooks/isMobile';
import MobileHomePage from './Mobile/MobileHomePage';
import DesktopHomePage from './Desktop/DesktopHomePage';

const HomePage = () => {
  const mobile = isMobile();
  return (
    <>
      {mobile ?
        <MobileHomePage /> :
        <DesktopHomePage />
      }
    </>
  );
};

export default HomePage;
