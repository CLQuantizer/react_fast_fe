import {
    Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton, useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

function SubmitAlert(props) {
    let message;
    let code;
    if (props.submitted === "Duplicate") {
        message = "Another journal with the same title already exists.";
        code = "error";
    } else if (props.submitted === "Success") {
        message = "you have successfully submitted a new journal";
        code = "success";
    } else {
        message = "unknown error";
        code = "error"
    }
    const {
        isOpen: isVisible, onClose
    } = useDisclosure({
        defaultIsOpen: true, onClose() {
            props.setSubmitted(0);
        }
    });

    return isVisible ? (<Alert status={code}>
        <AlertIcon/>
        <Box w='250px'>
            <AlertTitle>{code}</AlertTitle>
            <AlertDescription>
                {message}
            </AlertDescription>
        </Box>
        <CloseButton
            alignSelf='flex-start'
            position='relative'
            right={-1}
            top={-1}
            onClick={onClose}
        />
    </Alert>) : (<></>);
}

export default SubmitAlert;