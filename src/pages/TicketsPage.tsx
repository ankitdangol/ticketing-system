import isMobile from '../hooks/isMobile';
import DesktopTicketsPage from './Desktop/DesktopTicketsPage';
import MobileTicketsPage from './Mobile/MobileTicketsPage';
import { createContext, useContext, useState, useEffect } from 'react';
import { RefreshContext, FilterContext } from '../App';

export const DataContext = createContext<any>({});

const TicketsPage = () => {
  const mobile = isMobile();

  const { refresh, setRefresh } = useContext(RefreshContext);

  const { homePageFilter, setHomePageFilter } = useContext(FilterContext);

  const toggleRefresh = () => {
    refresh == true ? setRefresh(false) : setRefresh(true)
  }

  const [data, setData] = useState<any>();

  useEffect(() => {
    if (homePageFilter === 'In Progress') {
      fetch('http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc&filters[status][$eq]=in progress')
        .then((resp) => resp.json())
        .then((apiData) => {
          setData(apiData.data);
        });
      setHomePageFilter('');
    }
    else if (homePageFilter === 'Passed') {
      fetch('http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc&filters[status][$eq]=passed')
        .then((resp) => resp.json())
        .then((apiData) => {
          setData(apiData.data);
        });
      setHomePageFilter('');
    }
    else {
      fetch('http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc')
        .then((resp) => resp.json())
        .then((apiData) => {
          setData(apiData.data);
        });
    }
  }, [refresh]);

  return (
    <>
      <DataContext.Provider value={{ data, setData }}>
        {mobile ?
          <MobileTicketsPage /> :
          <DesktopTicketsPage />
        }
      </DataContext.Provider >
    </>
  )
};

export default TicketsPage;
