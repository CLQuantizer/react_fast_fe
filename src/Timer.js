import React from 'react';
import { useTimer } from 'react-timer-hook';
import { Box, Text } from '@chakra-ui/react';

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
      <Text fontWeight='bold'>It will expire in </Text>
      <Box fontSize='30px'>
        <Text color='teal'>{hours}:{minutes}:{seconds}</Text>
      </Box>
    </>
    // {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}
    // {/* <button onClick={start}>Start</button>
    // <button onClick={pause}>Pause</button>
    // <button onClick={resume}>Resume</button>
    // <button onClick={() => {
    //   // Restarts to 5 minutes timer
    //   const time = new Date();
    //   time.setSeconds(time.getSeconds() + 300);
    //   restart(time)
    // }}>Restart</button> */}
  );
}

export default MyTimer;