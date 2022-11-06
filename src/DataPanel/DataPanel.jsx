import React from 'react';
import { Box, Grid, VStack } from '@chakra-ui/react';
import RedisTable from './RedisTable';
import PythonLogo from './Python.svg';
import UbuntuLogo from './Ubuntu.svg';
import ReactLogo from './React.svg';
import ServiceTable from './ServiceTable';
import Config from '../Config.jsx';
import { Logo } from './Logo';

function DataPanel() {

  return (<Box fontSize='xl'>
    <VStack spacing={8}>
      <Grid minH='100vh' p={0}>
        <VStack spacing={2}>
          <RedisTable />
          <Logo logo={PythonLogo} />
          <ServiceTable name='uvicorn' />
          <ServiceTable name='celery' />
          <Logo logo={ReactLogo} />
          <ServiceTable name={Config.frontEndKeyWord} />
          <Logo logo={UbuntuLogo} />
          <ServiceTable name='redis' />
          <ServiceTable name='rabbit' />
          <ServiceTable name='postgres' />
          <br />
          <br />
          <br />
        </VStack>
      </Grid>
    </VStack>
  </Box>);
}

export default DataPanel;