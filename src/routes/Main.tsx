import { Routes, Route } from 'react-router-dom';
import CreateTicketPage from '../pages/CreateTicketPage';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import MobileStatusPage from '../pages/Mobile/MobileStatusPage';
import NotificationsPage from '../pages/NotificationsPage';
import TicketsPage from '../pages/TicketsPage';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/tickets' element={<TicketsPage />} />
      <Route path='/create_ticket' element={<CreateTicketPage />} />
      <Route path='/notifications' element={<NotificationsPage />} />
      <Route path='/mobile_status' element={<MobileStatusPage />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
}
export default Main;