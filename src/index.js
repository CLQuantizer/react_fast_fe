import { 
  ChakraProvider,
  Button,
  Box,
  Link,
  Grid,
  GridItem,
  theme,
} from '@chakra-ui/react';
import React, {StrictMode, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Routes,Route,} from "react-router-dom";

import App from './App';
import MyPage from './MyPage';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Journals from './Journals'
import Config from './Config';

const serverUrl = Config.server;

function Index(){
      const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
      const [expiration, setExpiration] = useState(0);
      const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('accessToken') !== null);

    const readToken = async(isLoggedIn)=>{
      if(isLoggedIn){return;}
      const token = localStorage.getItem('accessToken');
      const exp = localStorage.getItem('expiration');
      if(token && exp){
        if(exp >Math.round(new Date().getTime()/1000)){
          console.log('token is valid');
          setAccessToken(localStorage.getItem('accessToken'));
          setExpiration(localStorage.getItem('expiration'));
          setIsLoggedIn(true);
        }else{
          setAccessToken('');
          setExpiration(0);
          setIsLoggedIn(false);
        }
      }else{
        setAccessToken('');
        setExpiration(0);
        setIsLoggedIn(false);
      }
    }

    useEffect(()=>{
      if(accessToken!==''){
        readToken(isLoggedIn).then(()=>{console.log('now I am logged in right?: '+isLoggedIn);});}
    },[isLoggedIn]);

  return (
  <StrictMode>
  <ChakraProvider theme={theme}>
  <Box textAlign="center" fontSize="xl">
    <Grid minH="5vh" p={3}>
      <ColorModeSwitcher justifySelf="flex-end" />
    </Grid>

    <Grid templateColumns='repeat(3, 1fr)' gap={6}>
      <GridItem w='100%' h='10' >
        <Button variant = 'outline'>
          <Link href ={serverUrl}>Home</Link>
        </Button>
      </GridItem>

      <GridItem w='100%' h='10'>
        <Button variant = 'outline'>
          <Link href = {serverUrl +'journals/'}>Journals</Link>
        </Button>
      </GridItem>

      <GridItem w='100%' h='10'>
        <Button variant = 'outline'>
          {/* <Link href ={serverUrl+'login/'}>{isLoggedIn===true ? 'Login':'logout' }</Link> */}
          <Link href ={serverUrl+'login/'}>Login</Link>
        </Button>
      </GridItem>

    </Grid>
  </Box>
  <br/>
    <BrowserRouter>
    <Routes>
      <Route path = "" element={<App/>}/>
      <Route path = "journals/" element={<Journals/>}/>
      <Route path = "login/" element={<MyPage 
          accessToken={accessToken}
          isLoggedIn={isLoggedIn}
          expiration={expiration}
          setAccessToken={setAccessToken} 
          setIsLoggedIn={setIsLoggedIn}
          setExpiration={setExpiration}
        />}
      />
    </Routes>
    </BrowserRouter>
  </ChakraProvider>  
</StrictMode>);
}

ReactDOM.render(<Index/>, document.getElementById('root'));

