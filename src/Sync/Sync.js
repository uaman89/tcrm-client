import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { API_HOST } from '../constants';
import './Sync.css';
import {Icon} from "rsuite";

export function Sync({ onUploadComplete }) {
  const [isProcessing, setProcessing] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    setProcessing(true);
    acceptedFiles.forEach(file => {
      const data = new FormData();
      data.append('catalog', file);
      axios
        .post(`${API_HOST}/catalog`, data, {})
        .then(
          () => {
            console.info('catalog has been uploaded');
            onUploadComplete();
          },
          err => {
            alert('error');
            console.error(err);
          }
        )
        .then(() => {
          setProcessing(false);
        });
    });
  }, [onUploadComplete]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="Sync">
      <input
        {...getInputProps({
          accept: '.csv',
        })}
      />
      {isProcessing
        ? <div>p r <Icon icon="cog" size="1x" spin /> c e s  s i n g ...</div>
        : "Drag 'n' drop CSV file here, or click to select a file"
      }
    </div>
  );
}
