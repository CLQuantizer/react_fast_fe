import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useTable } from 'react-table';
import Config from '../Config.jsx';
import RedisLogo from './redis.svg';
import { Logo } from './Logo';

const rediskeyUrl = Config.dataPanel + 'rediskeys';

const makeData = (data) => {
  let keys = data.keys;
  let ttls = data.ttls;
  let len = keys.length;
  let results = [];
  for (let i = 0; i < len; i++) {
    results.push({ key: keys[i], ttl: ttls[i] });
  }
  results.sort((a, b) => {
    return a.ttl < b.ttl;
  });
  return results;
};

const updateData = (dataArray, x) => {
  let results = [];
  for (let i = 0; i < dataArray.length; i++) {
    let newTtl = dataArray[i].ttl - x;
    if (newTtl <= 0) {
      newTtl = 0;
    }
    results.push({ key: dataArray[i].key, ttl: newTtl });
  }
  return results;
};

function RedisTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('UseEffect called');
    fetch(rediskeyUrl, { method: 'GET' })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      }).then(data => {
      setData(makeData(data));
      return [makeData(data), Math.floor(Date.now() / 1000)];
    }).then(res => {
        setInterval(() => {
          let timeDiff = Math.floor(Date.now() / 1000) - res[1];
          // console.log("時間差: "+timeDiff.toString());
          let newData = updateData(res[0], timeDiff);
          setData(newData);
        }, 1000);
      },
    );
  }, []);

  const columns = React.useMemo(() => [{
    Header: 'keys', accessor: 'key',
  }, {
    Header: 'ttls', accessor: 'ttl',
  }], []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (<>
    <Logo logo={RedisLogo} />
    <Table variant='striped' size='sm' {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (<Tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (<Th
            key={column.Header}
            isNumeric={column.isNumeric}
          >
            {column.render('Header')}
          </Th>))}
        </Tr>))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (<Tr {...row.getRowProps()}>
            {row.cells.map((cell) => (
              <Td color='#696969' {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                {cell.render('Cell')}
              </Td>))}
          </Tr>);
        })}
      </Tbody>
    </Table>
    <br />
  </>);
}

export default RedisTable;
