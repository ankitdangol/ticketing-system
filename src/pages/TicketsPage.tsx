import isMobile from '../hooks/isMobile';
import DesktopTicketsPage from './Desktop/DesktopTicketsPage';
import MobileTicketsPage from './Mobile/MobileTicketsPage';
import { createContext, useContext, useState, useEffect } from 'react';
import { RefreshContext, TicketsContext } from '../App';
import { useSearchParams } from 'react-router-dom';
import { MeiliSearch } from 'meilisearch';
import { token } from '../config/constants';

export const DataContext = createContext<any>({});

const TicketsPage = () => {
  const mobile = isMobile();

  const { refresh, setRefresh } = useContext(RefreshContext);

  const { tickets, setTickets } = useContext(TicketsContext);

  const [data, setData] = useState<any>();

  const [searchparams] = useSearchParams();

  const client = new MeiliSearch({
    host: 'http://localhost:7700/'
  })

  useEffect(() => {
    const headers = { 'Authorization': `Bearer ${token}` };
    if (tickets === 'In Progress') {
      fetch('http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc&filters[status][$eq]=in progress', { headers })
        .then((resp) => resp.json())
        .then((apiData) => {
          setData(apiData.data);
        });
      setTickets('');
    }
    else if (tickets === 'Passed') {
      fetch('http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc&filters[status][$eq]=passed', { headers })
        .then((resp) => resp.json())
        .then((apiData) => {
          setData(apiData.data);
        });
      setTickets('');
    }
    else if (tickets === 'search') {
      client
        .index('ticket')
        .search(searchparams.get('data'))
        .then((results) => {
          const finalResult: any = []
          results.hits.map(hit => {
            hit.attachment != null ?
              hit.attachment = {
                data: hit.attachment.map((item: any) => {
                  return { attributes: item };
                })
              }
              :
              ''
            hit.chats != null ?
              hit.chats = {
                data: hit.chats.map((item: any) => {
                  return { attributes: item };
                })
              }
              :
              ''
            const finalResults = {
              attributes: hit
            }
            finalResult.push(finalResults);
          })
          setData(finalResult);
        })
    }
    else {
      fetch('http://localhost:1337/api/tickets?populate=*&sort=createdAt%3Adesc', { headers })
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
