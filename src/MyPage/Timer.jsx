import React from 'react';
import { useTimer } from 'react-timer-hook';
import { Text } from '@chakra-ui/react';

function MyTimer({ expiryTimestamp, setIsLoggedIn }) {
  const {
    seconds,
    minutes,
    hours,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      console.warn('onExpire called');
      setIsLoggedIn(false);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('expiration');
    },
  });

  return (
    <>
      <Text >It will expire in <b>{hours}:{minutes}:{seconds}</b></Text>
    </>
  );
}

export default MyTimer;