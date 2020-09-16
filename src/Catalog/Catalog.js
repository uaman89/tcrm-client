import React, { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import ButtonToolbar from 'rsuite/es/ButtonToolbar';
import Button from 'rsuite/es/Button';
import Icon from 'rsuite/es/Icon';
import Table from 'rsuite/es/Table';
import Divider from 'rsuite/es/Divider';

import { API_HOST } from '../constants';
import { Sync } from '../Sync/Sync';
import './Catalog.css';

export function downloadFile(blob, fileName) {
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  link.remove();
}

export const Catalog = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
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

  const exportXlsx = () => {
    setIsExporting(true);
    loadXlsx();
  };

  const loadXlsx = useCallback(
    () => {
      axios
        .get(`${API_HOST}/converter`, {
          responseType: 'blob',
          timeout: 30000,
        })
        .catch(() => {
          alert('Expoting Catalog is failed.');
          return { data: catalog };
        })
        .then(response => {
          setIsLoading(false);
          const blob = response.data;
          const fileName = `mp-catalog_${new Date()
            .toISOString()
            .substr(2, 14)
            .replace(/:/g,'')
            }.xlsx`;
          downloadFile(blob, fileName);
        });
    },
    [isExporting]
  );

  return (
    <div className="Catalog">
      <div className="sub-header">
        Catalog
        <ButtonToolbar>
          <Button onClick={() => reloadCatalog()}>
            <Icon icon="reload" /> Reload
          </Button>
          <Button onClick={() => exportXlsx()}>
            <Icon icon="file-download" /> Get KeepinCRM XLSX
          </Button>
        </ButtonToolbar>
      </div>
      <Divider className="catalog__divider">
        {isLoading ? ' is loading...' : `${catalog.length} items`}
      </Divider>
      <Table
        data={catalog}
        virtualized
        height={800}
        // autoHeight
        loading={isLoading}
        onRowClick={data => {
          console.log(data);
        }}
      >
        <Column flexGrow={1} fixed align="left">
          <HeaderCell>Tilda UID</HeaderCell>
          <Cell dataKey="id" sortable />
        </Column>
        <Column flexGrow={1} sortable fixed align="left">
          <HeaderCell>SKU</HeaderCell>
          <Cell dataKey="sku" sortable />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Picture</HeaderCell>
          <Cell>
            {rowData => (
              <img src={rowData.photo} height="45" alt={rowData.title} />
            )}
          </Cell>
        </Column>
        <Column dataKey="title" sortable flexGrow={3} align="left">
          <HeaderCell>Title</HeaderCell>
          <Cell dataKey="title" />
        </Column>
        <Column dataKey="size" sortable flexGrow={3} align="left">
          <HeaderCell>Size</HeaderCell>
          <Cell dataKey="size" />
        </Column>
        <Column dataKey="price" sortable align="right">
          <HeaderCell>Price</HeaderCell>
          <Cell>{rowData => `${rowData.price} ₴`}</Cell>
        </Column>
        <Column dataKey="Quantity" sortable align="left" fixed>
          <HeaderCell>Quantity</HeaderCell>
          <Cell dataKey="quantity" />
        </Column>
      </Table>
      <Sync onUploadComplete={reloadCatalog} />
    </div>
  );
};
