import BottomNavbar from '../../components/Mobile/BottomNavbar';
import MobileHeader from '../../components/Mobile/MobileHeader';
import PropTypes from 'prop-types';

const MobileMainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  MobileMainLayout.propTypes = {
    children: PropTypes.node.isRequired
  }

  return (
    <>
      <MobileHeader />
      {children}
      <BottomNavbar />
    </>
  );
};

export default MobileMainLayout;
