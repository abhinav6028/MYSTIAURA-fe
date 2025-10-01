import { useState } from "react";
import { DataGrid, type GridColDef, type GridRowId } from "@mui/x-data-grid";

interface CommonDataGridProps<RowType = any> {
  rows: RowType[];
  columns: GridColDef[];
  checkboxSelection?: boolean;
  autoHeight?: boolean;
  pageSize?: number;
  onRowClick?: (params: any) => void;
  totalRecords?: number; 
}

const CommonDataGrid = <RowType extends { id: GridRowId }>({
  rows,
  columns,
  checkboxSelection = false,
  autoHeight = true,
  pageSize = 5,
  onRowClick,
  totalRecords,
}: CommonDataGridProps<RowType>) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: pageSize,
  });

  return (
    <div className="w-full">
      <DataGrid<RowType>
        rows={rows}
        columns={columns}
        checkboxSelection={checkboxSelection}
        autoHeight={autoHeight}
        onRowClick={onRowClick}
        disableRowSelectionOnClick
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25, 50]}
        rowCount={totalRecords ?? rows.length} 
        paginationMode="server"
        sx={{
          border: 0,
          "& .MuiDataGrid-cell": {
            fontFamily: "Poppins, sans-serif",
          },
          "& .MuiDataGrid-columnHeaders": {
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
          },
        }}
      />
    </div>
  );
};

export default CommonDataGrid;