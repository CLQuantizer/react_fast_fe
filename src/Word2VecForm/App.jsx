import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import DataTable from './DataTable';
import {
  Button, Box, Text, VStack, Input, Grid, GridItem,
} from '@chakra-ui/react';
import { Logo } from './Logo';
import Config from '../Config.jsx';
import SynonymTable from './SynonymTable';

// devlopment api
const relatedUrl = Config.glove + 'related/';
const synUrl = Config.infra + 'synonyms/';
// production server
// const relatedUrl = Config.productionApi+'related/';

function App() {
  // set the title of the page
  document.title = 'Word Relatedness API';

  // define the states for the form
  const [data, setData] = useState([]);
  const [syns, setSyns] = useState([]);
  const [target, setTarget] = useState('Word');

  // function that converts JSON data into list
  const makeData = (data) => {
    let words = data.words;
    let probs = data.probs;
    let results = [];
    for (let i = 0; i < words.length; i++) {
      results.push({ word: words[i], prob: probs[i] });
    }
    return results;
  };

  const makeSyns = (syns) => {
    let res = [];
    for (let i = 0; i < syns.length; i++) {
      res.push({ word: syns[i] });
    }
    return res;
  };

  // function that does POST with target word
  // And set the data to the state

  // react hook
  useEffect(() => {
    fetch(relatedUrl + target)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      }).then(data => {
      // console.log('the response for [' + target + '] from API is: ' + data.toString());
      let results = makeData(data);
      setData(results);
    }).catch(error => {
      console.error(error);
    }).finally(() => {
      console.log('fetching syns');
      fetch(synUrl + target)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        }).then(syns => {
        // console.log('syns: ' + syns.toString());
        let res = makeSyns(syns);
        setSyns(res);
      });
    });
  }, [target]);

  // another component?
  const SearchForm = () => {
    const formik = useFormik({
      initialValues: { word: target }, onSubmit: (values, actions) => {
        actions.setSubmitting(false);
        setTarget(values.word);
        console.log('now submitting the word: ' + values.word);
      },
    });
    return (<form onSubmit={formik.handleSubmit}>
      <label htmlFor='word'><Text fontSize={18}>Find the 15 neighbours<br />of a word in <u><a
        href={'https://nlp.stanford.edu/projects/glove/'}>GloVe</a></u><br /></Text></label>
      <br />
      <Input id='word'
             fontSize={15}
             name='word'
             type='word'
             width='auto'
             onChange={formik.handleChange}
             value={formik.values.word}
      />
      <Button fontSize={15} type='submit'>Search</Button>
    </form>);
  };

  return (

    <Box mx='auto' textAlign='center' justify='center'>
      <VStack spacing={8}>
        <Logo h='15vmin' pointerEvents='none' />
        <SearchForm />
        <Box pl={1} pr={1}>
          <Grid templateColumns='repeat(2, 1fr)' gap={1}>
            <GridItem w='40%'>
              <DataTable data={data} />
            </GridItem>

            <GridItem w='20%'>
              <SynonymTable data={syns} />
            </GridItem>
          </Grid>
        </Box>
      </VStack>
    </Box>);
}

export default App;
