import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { API_HOST } from '../constants';
import './Sync.css';

export function Sync() {
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const data = new FormData();
      data.append('catalog', file);
      axios.post(`${API_HOST}/upload`, data, {}).then(
        res => {
          console.log(res.statusText);
          alert('catalog has been uploaded');
        },
        err => {
          alert('error');
          console.error(err);
        }
      );
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="Sync">
      <input
        {...getInputProps({
          accept: '.csv',
        })}
      />
      <p>Drag 'n' drop CSV file here, or click to select a file</p>
    </div>
  );
}
