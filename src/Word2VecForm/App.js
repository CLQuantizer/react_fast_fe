import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import DataTable from './DataTable';
import {
  Button,
  Box,
  VStack,
  Input,
  Grid,
} from '@chakra-ui/react';
import { Logo } from './Logo';
import Config from '../Config';

// devlopment api
const relatedUrl = Config.glove + 'related/';
// production server
// const relatedUrl = Config.productionApi+'related/';

function App() {
  // set the title of the page
  document.title = 'Word Relatedness API';

  // define the states for the form
  const [data, setData] = useState([]);
  const [target, setTarget] = useState('whatever');

  // function that converts JSON data into list
  const makeData = (words, probs) => {
    let results = [];
    for (let i = 0; i < words.length; i++) {
      results.push({ word: words[i], prob: probs[i] });
    }
    return results;
  };

  // function that does POST with target word
  // And set the data to the state
  const getList = async (target) => {
    try {
      var url = relatedUrl + target;
      const response = await fetch(url, { method: 'GET' });
      const json = await response.json();
      var results = makeData(json.words, json.probs);
      setData(results);
      console.log('the response for \'' + target + '\' from API is:');
      console.log(results);
    } catch (error) {
      console.error(error);
    } finally {
      console.log('generating the DataTable');
    }
  };

  // react hook
  useEffect(() => {
    getList(target).then(() => {
      console.log('the word has been set to: ' + target);
    });
  }, [target]);

  // another component?
  const SearchForm = () => {
    const formik = useFormik({
      initialValues: { word: target },
      onSubmit: (values, actions) => {
        actions.setSubmitting(false);
        setTarget(values.word);
        console.log('now submitting the word: ' + values.word);
      },
    });
    return (
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor='word'>Enter a word to search for its 15 most related words<br /></label>
        <br />
        <Input id='word'
               name='word'
               type='word'
               width='auto'
               onChange={formik.handleChange}
               value={formik.values.word}
        />
        <Button type='submit'>Search</Button>
      </form>
    );
  };

  return (

    <Box textAlign='center' fontSize='xl'>
      <Grid minH='100vh' p={3}>
        <VStack spacing={8}>
          <Logo h='15vmin' pointerEvents='none' />
          <SearchForm />
          <DataTable data={data} />
        </VStack>
      </Grid>
    </Box>
  );
}

export default App;
