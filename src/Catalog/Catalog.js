import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_HOST } from '../constants';
import { Table } from 'rsuite';

export function Catalog() {
  const [isLoading, setIsLoading] = useState(true);
  const [catalog, setCatalog] = useState([]);
  const { Column, HeaderCell, Cell } = Table;

  useEffect(
    () => {
      if (!catalog.length) {
        axios.get(`${API_HOST}/catalog`).then(response => {
          setCatalog(response.data);
          setIsLoading(false);
        });
      }
    },
    [catalog]
  );

  return (
    <div className="Catalog">
      Catalog {isLoading ? ' is loading...' : `(${catalog.length} items) :`}
      <hr />
      <Table
        data={catalog}
        virtualized
        // autoHeight={true}
          height={750}
        loading={isLoading}
        onRowClick={data => {
          console.log(data);
        }}
      >
        <Column flexGrow={1} align="left" fixed>
          <HeaderCell>Tilda UID</HeaderCell>
          <Cell dataKey="Tilda UID" sortable/>
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Picture</HeaderCell>
          <Cell>
            {rowData => (
              <img src={rowData.Photo } height="45" alt={rowData.Title} />
            )}
          </Cell>
        </Column>
        <Column dataKey="Title" sortable flexGrow={3} align="left">
          <HeaderCell>Title</HeaderCell>
          <Cell dataKey="Title" />
        </Column>
        <Column dataKey="Price" sortable align="right">
          <HeaderCell>Price</HeaderCell>
          <Cell>{rowData => `${(+rowData.Price).toFixed(0)} ₴`}</Cell>
        </Column>
        <Column dataKey="Quantity" sortable align="left" fixed>
          <HeaderCell>Quantity</HeaderCell>
          <Cell dataKey="Quantity" />
        </Column>
      </Table>
    </div>
  );
}
