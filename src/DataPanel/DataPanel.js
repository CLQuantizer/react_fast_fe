import React from 'react';
import { Box, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import { RedisLogo } from './RedisLogo';
import { UbuntuLogo } from './UbuntuLogo';
import { PythonLogo } from './PythonLogo';
import RedisTable from './RedisTable';

function DataPanel() {

  return (<Box fontSize='xl'>
    <Grid minH='100vh' p={3}>
      <VStack spacing={8}>
        <Grid templateColumns='repeat(2, 1)' gap={6}>
          <GridItem w='100%' h='10'>
            <UbuntuLogo pointerEvents='none' />
          </GridItem>
          <GridItem w='100%' h='10'>
            <Text></Text>
          </GridItem>
        </Grid>

        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
          <GridItem w='100%' h='10'>
            <PythonLogo pointerEvents='none' />
          </GridItem>
          <GridItem w='100%' h='10'>
            <Text></Text>
          </GridItem>
        </Grid>

        <Grid templateColumns='repeat(2, 1)' gap={6}>
          <GridItem w='100%' h='10'>
            <RedisLogo pointerEvents='none' />
          </GridItem>
          <GridItem w='100%' h='10'>
            <RedisTable />
          </GridItem>
        </Grid>

      </VStack>
    </Grid>
  </Box>);
}

export default DataPanel;