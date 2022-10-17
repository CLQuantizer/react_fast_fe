import React from 'react';
import { Box, Button, Center, Grid, Input, Text, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import Config from '../Config';
import MyTimer from './Timer';
import MyJournals from './MyJournals';
import JournalForm from './JournalForm';

const tokenApi = Config.api + 'users/token/';

function MyPage(props) {

  const now = Math.round(new Date().getTime() / 1000);
  const exp = localStorage.getItem('expiration');
  const time = new Date();
  time.setSeconds(time.getSeconds() + (exp - now)); // 10 minutes timer

  if (props.isLoggedIn) {
    document.title = 'My Page';
    return (<Box textAlign='center'>
      <Grid minH='100vh' p={3}>
        <VStack spacing={3}>
          <Text fontSize='2xl' fontWeight='bold'>You are logged in by the token:</Text>
          <Text w='250px'>{props.accessToken}</Text>
          <MyTimer expiryTimestamp={time} setIsLoggedIn={props.setIsLoggedIn}></MyTimer>
          <Button onClick={() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('expiration');
            localStorage.removeItem("user");
            props.setIsLoggedIn(false);
          }}>Logout</Button>
          <Box>
            <JournalForm apiToken={props.accessToken} />
          </Box>
          <Text fontSize='2xl' fontWeight='bold'>Here is a list of your Journals</Text>
        </VStack>
        <MyJournals accessToken={props.accessToken} />
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
                  console.log('Get toekn response OK');
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
                console.log("setting user to: "+values.username);
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
