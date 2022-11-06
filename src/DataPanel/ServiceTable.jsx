import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useTable } from 'react-table';
import Config from '../Config.jsx';

const serviceUrl = Config.dataPanel + 'services/';

const makeData = (name, services) => {
  let results = [];
  for (let i = 0; i < services.length; i++) {
    results.push({ name: name + i.toString(), service: services[i] });
  }
  return results;
};

function ServiceTable(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(serviceUrl + props.name, { method: 'GET' })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      }).then(data => {
      // console.log(data);
      setData(makeData(data.name, data.services));
    });
  }, [props.name]);

  const columns = React.useMemo(() => [{
    Header: 'name', accessor: 'name',
  }, {
    Header: 'services', accessor: 'service',
  }], []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (<>
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

export default ServiceTable;
