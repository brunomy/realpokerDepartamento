import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

export default function DataTableSelect({ ids, setIds, rows, columns }) {
  const handleSelectionChange = (newSelection) => {
    setIds(newSelection);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        rowSelectionModel={ids}
        onRowSelectionModelChange={handleSelectionChange}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}