import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  VStack,
  Grid,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import Config from '../Config';

const meUrl = Config.api + 'users/read/me/';
const myJournalsUrl = Config.api + 'users/read/journals/';

// use props here to pass in the access token
function MyJournals(props) {
  const [MyJournals, setMyJournals] = useState([]);

  useEffect(() => {
      fetch(myJournalsUrl, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + props.accessToken,
        }, method: 'GET',
      }).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      }).then(data => {
          setMyJournals(data);
        },
      ).catch(error => {
          console.log('error: ' + error);
        },
      );
    }, [props.accessToken],
  );

  return (<Box maxW='lg' textAlign='left'>
      <Grid minH='100vh' p={3}>
        <VStack spacing={8}>
          <UnorderedList fontSize='sm'>
            {MyJournals.map((j) =>
              <ListItem p='2' mt='15' key={j['title']}>
                <Text fontSize='2xl' fontWeight='bold'>{j['title']}</Text>
                <Text fontSize='m' fontWeight='bold' color='#285E61'>By you on: {j['date']}</Text>
                <ReactMarkdown>{j['body']}</ReactMarkdown>
              </ListItem>)}
          </UnorderedList>
        </VStack>
      </Grid>
    </Box>

  );
}

export default MyJournals;