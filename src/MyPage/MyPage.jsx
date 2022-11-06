import React, { useState } from 'react';
import { Box, Button, Center, Grid, Input, Text, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import Config from '../Config.jsx';
import MyJournals from './MyJournals';
import JournalForm from './JournalForm';
import InfoAlert from '../InfoAlert';

const tokenApi = Config.api + 'users/token/';

function MyPage(props) {
  
  const now = Math.round(new Date().getTime() / 1000);
  const exp = localStorage.getItem('expiration');
  const time = new Date();
  time.setSeconds(time.getSeconds() + (exp - now)); // 10 minutes timer

  const [newJournal, setNewJournal] = useState([]);

  if (props.isLoggedIn) {
    document.title = 'My Page';
    return (<Box textAlign='center'>
      <Grid minH='100vh' p={3}>
        <Center>
          <VStack spacing={3}>
            <InfoAlert
              expiryTimestamp={time} setIsLoggedIn={props.setIsLoggedIn}
              body={'You are logged in by the token: ' + props.accessToken.toString().substring(0, 10) + '******** (256digits)'}></InfoAlert>
            {/*<MyTimer expiryTimestamp={time} setIsLoggedIn={props.setIsLoggedIn}></MyTimer>*/}
            <Button onClick={() => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('expiration');
              localStorage.removeItem('user');
              props.setIsLoggedIn(false);
            }}>Logout</Button>
            <Box>
              <JournalForm apiToken={props.accessToken} setNewJournal={setNewJournal} />
            </Box>
            <Text fontSize='2xl' fontWeight='bold'>Here is a list of your Journals</Text>
            <MyJournals accessToken={props.accessToken} newJournal={newJournal} />
          </VStack>
        </Center>
      </Grid>
    </Box>);
  } else {
    document.title = 'Login';
    return (<Center>
      <Box p='4' maxW='lg' textAlign='left'>
        <Text fontSize='2xl' mb='5'>Login in for more functionality</Text>
        <Formik
          initialValues={{ username: '', password: '' }}
          validate={values => {
            const errors = {};
            if (!values.username) {
              errors.username = 'Username Required';
            }
            return errors;
          }}
          onSubmit={(values) => {
            fetch(tokenApi, {
              body: `grant_type=&username=${values.username}&password=${values.password}&scope=&client_id=&client_secret=`,
              headers: {
                Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded',
              },
              method: 'POST',
            })
              .then(response => {
                if (response.ok) {
                  console.log('Get token response OK');
                  return response.json();
                }
              })
              .then(data => {
                localStorage.setItem('accessToken', data.access_token);
                localStorage.setItem('expiration', 899 + Math.round(new Date().getTime() / 1000));
                props.setAccessToken(data.access_token);
                props.setExpiration(899 + Math.round(new Date().getTime() / 1000));
                localStorage.setItem('user', values.username);
                props.setUser(values.username);
                console.log('setting user to: ' + values.username);
                if (data.access_token) {
                  props.setIsLoggedIn(true);
                } else {
                  props.setIsLoggedIn(false);
                }
              });
          }}
        >
          {({
              values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, /* and other goodies */
            }) => (<Form onSubmit={handleSubmit}>
            <VStack>
              <Input
                width='80%'
                type='text'
                name='username'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                placeholder='username/用戶名'
              />
              <Text color='#2C7A7B' fontSize='sm'>{errors.username && touched.username && errors.username}</Text>

              <Input
                width='80%'
                type='password'
                name='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder='password/密碼'
              />

              <Button type='submit' disabled={isSubmitting} mt='5'>
                Submit
              </Button>
            </VStack>
          </Form>)}
        </Formik>
      </Box>
    </Center>);// end of LoginBox
  }
}

export default MyPage;
