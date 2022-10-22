import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy } from 'react-table';
import Config from '../Config';
import RedisLogo from './redis.svg';
import { Logo } from './Logo';

const rediskeyUrl = Config.dataPanel + 'rediskeys';

const makeData = (keys, ttls) => {
  let results = [];
  for (let i = 0; i < keys.length; i++) {
    results.push({ key: keys[i], ttl: ttls[i] });
  }
  return results;
};

function RedisTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(rediskeyUrl, { method: 'GET' })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      }).then(data => {
      // console.log(data);
      setData(makeData(data.keys, data.ttls));
    });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'keys',
        accessor: 'key',
      },
      {
        Header: 'ttls',
        accessor: 'ttl',
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (<>
      <Logo logo={RedisLogo} />
      <Table variant='striped' size='sm' {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  {column.render('Header')}
                  <chakra.span pl='4'>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label='sorted descending' />
                      ) : (
                        <TriangleUpIcon aria-label='sorted ascending' />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td color='#696969' {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <br />
    </>
  );
}

export default RedisTable;
