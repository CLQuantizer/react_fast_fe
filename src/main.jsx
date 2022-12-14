import {
  ChakraProvider, Button, Box, Link, Grid, GridItem, theme,
} from '@chakra-ui/react';
import React, { StrictMode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './Word2VecForm/App.jsx';
import MyPage from './MyPage/MyPage';
import DataPanel from './DataPanel/DataPanel.jsx';
import { ColorModeSwitcher } from './ColorModeSwitcher.jsx';
import Journals from './JournalsPage/Journals';
import Config from './Config.jsx';

const publicUrl= Config.publicUrl;

const fetchExpiration = async () => {
  return localStorage.getItem('expiration');
};
const fetchAccessToken = async () => {
  return localStorage.getItem('accessToken');
};
const fetchUser = async () => {
  return localStorage.getItem('user');
};

function Main() {
  // check expiration then check accessToken
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [expiration, setExpiration] = useState(localStorage.getItem('expiration'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(localStorage.getItem('user'));

  useEffect(() => {
    fetchExpiration()
      .then(expirationString => {
        if (parseInt(expirationString) >= Math.round(new Date().getTime() / 1000)) {
          console.log('not expired');
          return true;
        }
        return false;
      })
      .then(notExpired => {
        if (notExpired === true) {
          return fetchAccessToken();
        } else {
          return 'No token available';
        }
      })
      .then(token => {
        console.log('token: ' + token);
        if (token !== 'No token available') {
          setIsLoggedIn(true);
          setAccessToken(token);
          return fetchUser();
        } else {
          return 'there';
        }
      })
      .then(username => {
        setUser(username);
      }).catch(e => {
      console.log(e);
    });
  }, []);

  return (<StrictMode>
    <ChakraProvider theme={theme}>
      <Box textAlign='center' fontSize='xl'>
        <Grid minH='5vh' p={3}>
          <ColorModeSwitcher justifySelf='flex-end' />
        </Grid>

        <Grid templateColumns='repeat(3, 1fr)' gap={6}>
          <GridItem w='100%' h='10'>
            <Button variant='outline'>
              <Link href={publicUrl}>Home</Link>
            </Button>
          </GridItem>

          <GridItem w='100%' h='10'>
            <Button variant='outline'>
              <Link href={publicUrl + 'journals/'}>Journals</Link>
            </Button>
          </GridItem>

          <GridItem w='100%' h='10'>
            <Button variant='outline'>
              {/* <Link href ={serverUrl+'login/'}>{isLoggedIn===true ? 'Login':'logout' }</Link> */}
              <Link href={publicUrl + 'login/'}>{isLoggedIn ? 'Hi ' + user : 'login'}</Link>
            </Button>
          </GridItem>

        </Grid>
      </Box>
      <br />
      <BrowserRouter>
        <Routes>
          <Route path='' element={<App />} />
          <Route path='journals/' element={<Journals />} />
          <Route path='dataPanel' element={<DataPanel />}></Route>
          <Route path='login/' element={<MyPage
            accessToken={accessToken}
            isLoggedIn={isLoggedIn}
            expiration={expiration}
            setAccessToken={setAccessToken}
            setIsLoggedIn={setIsLoggedIn}
            setExpiration={setExpiration}
            setUser={setUser}
          />}
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>);
}

ReactDOM.render(<Main />, document.getElementById('root'));

