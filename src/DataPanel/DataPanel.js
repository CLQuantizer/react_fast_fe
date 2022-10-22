import React from 'react';
import { Box, Grid, VStack } from '@chakra-ui/react';
import RedisTable from './RedisTable';
import RedisLogo from './redis.svg';
import PythonLogo from './Python.svg';
import UbuntuLogo from './Ubuntu.svg';
import ReactLogo from './React.svg';
import ServiceTable from './ServiceTable';
import Config from '../Config';
import { Logo } from './Logo';

function DataPanel() {

  return (
    <Box fontSize='xl'>
      <VStack spacing={8}>
        <Grid minH='100vh' p={3}>
          <VStack spacing={8}>
            <Logo logo={UbuntuLogo}/>
            <ServiceTable name='redis' />
            <Logo logo={PythonLogo}/>
            <ServiceTable name='uvicorn' />
            <Logo logo={ReactLogo}/>
            <ServiceTable name={Config.frontEndKeyWord} />
            <Logo logo={RedisLogo}/>
            <RedisTable />
          </VStack>
        </Grid>
      </VStack>
    </Box>
  )
    ;
}

export default DataPanel;