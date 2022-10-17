import React, { useEffect, useState } from 'react';
import {
  Box, Text, VStack, Grid, ListItem, UnorderedList,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import Config from '../Config';

const journalUrl = Config.api + 'users/read/alljournals/';

function Journals() {
  document.title = 'Journals';
  const [ListOfJournals, setListOfJournals] = useState([]);
  const results = ListOfJournals.map((j) =>
    <ListItem p='2' mt='15' key={j['title']}>
      <Text fontSize='2xl' fontWeight='bold'>{j['title']}</Text>
      <Text fontSize='m' fontWeight='bold' color='#285E61'>By {j['author']} on: {j['date']}</Text>
      <ReactMarkdown>{j['body']}</ReactMarkdown>
    </ListItem>
  );
  // const [ListOfJournals, setListOfJournal] = useState([]);
  // setListOfJournal(getData);
  useEffect(() => {
    fetch(journalUrl, { method: 'GET' })
      .then(response => {
        if (response.ok) {
          console.log('the response for from API is:');
          console.log(response.body);
          return response.json();
        }
        throw response;
      })
      .then(data=>{
        setListOfJournals(data);
      })
      .catch(error=>{
        console.log("error: "+error);
      });
  }, []);


  return (<Box maxW='lg' textAlign='left'>
      <Grid minH='100vh' p={3}>
        <VStack spacing={8}>
          <UnorderedList fontSize='sm'>
            {results}
          </UnorderedList>
        </VStack>
      </Grid>
    </Box>

  );
}

export default Journals;