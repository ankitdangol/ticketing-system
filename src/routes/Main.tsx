import { Routes, Route } from 'react-router-dom';
import CreateTicketPage from '../pages/CreateTicketPage';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import MobileStatusPage from '../pages/Mobile/MobileStatusPage';
import NotificationsPage from '../pages/NotificationsPage';
import TicketsPage from '../pages/TicketsPage';
import { useState, useEffect, createContext } from 'react';
import { sisUrl } from '../config/constants';
import CallbackHandler from '../components/CallbackHandler';
import axios from 'axios';

export const UserDataContext = createContext<any>({})

const Main = () => {
  const [login, setLogin] = useState(true);

  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token == null) {
      setLogin(false);
    }

    axios.get('https://sts.sis.scieverinc.com/api/user', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      }
    })
      .then((userData) => {
        setUserData(userData);
      });
  }, []);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/tickets' element={<TicketsPage />} />
        <Route path='/create_ticket' element={<CreateTicketPage />} />
        <Route path='/notifications' element={<NotificationsPage />} />
        <Route path='/mobile_status' element={<MobileStatusPage />} />
        <Route path='/login' element={login == true ? <HomePage /> : window.location.href = sisUrl} />
        <Route path='/callback' element={<CallbackHandler />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </UserDataContext.Provider>
  );
}
export default Main;