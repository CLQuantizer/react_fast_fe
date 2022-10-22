import React from 'react';
import { Box, Grid, VStack } from '@chakra-ui/react';
import RedisTable from './RedisTable';
import PythonLogo from './Python.svg';
import UbuntuLogo from './Ubuntu.svg';
import ReactLogo from './React.svg';
import ServiceTable from './ServiceTable';
import Config from '../Config';

function DataPanel() {

  return (<Box fontSize='xl'>
    <VStack spacing={8}>
      <Grid minH='100vh' p={0}>
        <VStack spacing={2}>
          <ServiceTable logo={UbuntuLogo} name='redis' />
          <ServiceTable logo={PythonLogo} name='uvicorn' />
          <ServiceTable logo={ReactLogo} name={Config.frontEndKeyWord} />
          <RedisTable />
        </VStack>
      </Grid>
    </VStack>
  </Box>);
}

export default DataPanel;