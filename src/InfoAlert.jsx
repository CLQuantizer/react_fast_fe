import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import MyTimer from './MyPage/Timer';

function InfoAlert(props) {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: props.isVisible })

  return isVisible ? (
    <Alert status='success'>
      <AlertIcon />
      <Box w='250px'>
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription >
          {props.body}
        </AlertDescription>
        <MyTimer expiryTimestamp={props.expiryTimestamp} setIsLoggedIn={props.setIsLoggedIn}></MyTimer>
      </Box>
      <CloseButton
        alignSelf='flex-start'
        position='relative'
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  ) : (
    <Button onClick={onOpen}>Show Login status</Button>
  )
}

export default InfoAlert;