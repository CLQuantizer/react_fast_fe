import React, {useState} from 'react';
import {Formik} from 'formik';
import {
    Text, VStack, Center, Button,
} from '@chakra-ui/react';
import Config from '../Config.jsx';
import {AutoResizeTextarea} from './AutoResizeTextArea';
import SubmitAlert from './SubmitAlert';

const journalUrl = Config.api + 'users/write/journals/';
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const submissionType = {Success: 'Success', Duplicate: 'Duplicate'};

function JournalForm(props) {
    const [submitted, setSubmitted] = useState(0);
    return (<VStack spacing={8}>
        <Text fontSize='2xl' fontWeight='bold'>To add another journal<br/>👇</Text>
        <Formik
            initialValues={{title: 'Another day', body: 'Si je devrais résumer ma vie aujourd\'hui...'}}
            validate={values => {
                const errors = {};
                if (!values.title) {
                    errors.title = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
                const d = new Date();
                let day = d.getDate();
                let date = (day<10?"0"+day.toString():day) + '/' + monthNames[d.getMonth()] + '/' + d.getFullYear().toString();
                fetch(journalUrl, {
                    method: 'POST', headers: {
                        'accept': 'application/json',
                        'Authorization': 'Bearer ' + props.apiToken,
                        'Content-Type': 'application/json',
                    }, body: JSON.stringify({
                        'title': values.title.toString(), 'date': date, 'body': values.body.toString(),
                    }),
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    } else if (response.status === 400) {
                        setSubmitted(submissionType.Duplicate);
                        return null;
                    } else {
                        return null;
                    }
                }).then(data => {
                    if (data !== null) {
                        props.setNewJournal(data);
                        setSubmitted(submissionType.Success);
                    }
                });
                setTimeout(() => {
                    // alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({
                  values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, /* and other goodies */
              }) => (<form onSubmit={handleSubmit}>
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
                    <SubmitAlert setSubmitted={setSubmitted} submitted={submitted}/>)}
                </VStack>
            </form>)}
        </Formik>
    </VStack>);
}

export default JournalForm;