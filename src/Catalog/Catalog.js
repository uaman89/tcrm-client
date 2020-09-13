import React, { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import Button from 'rsuite/es/Button';
import Icon from 'rsuite/es/Icon';
import Table from 'rsuite/es/Table';
import Divider from 'rsuite/es/Divider';

import { API_HOST } from '../constants';
import './Catalog.css';
import { Sync } from '../Sync/Sync';

export const Catalog = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [catalog, setCatalog] = useState([]);
  const { Column, HeaderCell, Cell } = Table;

  const load = useCallback(
    () => {
      axios
        .get(`${API_HOST}/catalog`)
        .catch(() => {
          alert('Loading Catalog is failed.');
          return { data: catalog };
        })
        .then(response => {
          setCatalog(response.data);
          setIsLoading(false);
        });
    },
    [isLoading]
  );

  useEffect(() => {
    load();
  }, []);

  const reloadCatalog = () => {
    setIsLoading(true);
    load();
  };

  return (
    <div className="Catalog">
      <div className="sub-header">
        Catalog
        <Button onClick={() => reloadCatalog()}>
          <Icon icon="reload" /> Reload
        </Button>
      </div>
      <Divider className="catalog__divider">
        {isLoading ? ' is loading...' : `${catalog.length} items`}
      </Divider>
      <Table
        data={catalog}
        virtualized
        height={700}
        // autoHeight
        loading={isLoading}
        onRowClick={data => {
          console.log(data);
        }}
      >
        <Column flexGrow={1} align="left" fixed>
          <HeaderCell>Tilda UID</HeaderCell>
          <Cell dataKey="Tilda UID" sortable />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Picture</HeaderCell>
          <Cell>
            {rowData => (
              <img src={rowData.Photo} height="45" alt={rowData.Title} />
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
      <Sync onUploadComplete={reloadCatalog} />
    </div>
  );
};
