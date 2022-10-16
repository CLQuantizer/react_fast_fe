import React from 'react';
import Formik from 'formik';
import {
  Text,
  VStack,
  Center,
  Button,
} from '@chakra-ui/react';
import Config from './Config';
import { AutoResizeTextarea } from './AutoResizeTextArea';

const journalUrl = Config.api + 'users/write/journals/';

const postJournal = async (apiToken, title, body) => {
  await fetch(journalUrl, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Authorization': 'Bearer ' + apiToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'title': title.toString(),
      'date': Date.now().toString(),
      'body': body.toString(),
    }),
  });
};

function JournalForm(props) {
  return (
    <VStack spacing={8}>
      <Formik
        initialValues={{ title: 'Another day', body: 'Si je devrais résumer ma vie aujourd\'hui...' }}
        validate={values => {
          const errors = {};
          if (!values.title) {
            errors.title = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          postJournal(props.apiToken, values.title, values.body);
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
          <form onSubmit={handleSubmit}>
            <VStack>
              <AutoResizeTextarea
                type='title'
                name='title'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />

              <Text>{errors.title && touched.title && errors.title}</Text>
              <AutoResizeTextarea
                type='body'
                name='body'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.body}
              />
              {errors.body && touched.body && errors.body}

              <Center>
                <Button type='submit' disabled={isSubmitting}>
                  Submit
                </Button>
              </Center>
            </VStack>
          </form>
        )}
      </Formik>
    </VStack>
  );
}

export default JournalForm;