import { DataGrid, type GridColDef, type GridRowId } from "@mui/x-data-grid";

interface CommonDataGridProps<RowType = any> {
  rows: RowType[];
  columns: GridColDef[];
  checkboxSelection?: boolean;
  page?: number; // controlled from parent
  pageSize?: number; // controlled from parent
  onRowClick?: (params: any) => void;
  totalRecords?: number;
  onPaginationChange?: (page: number, pageSize: number) => void;
}

const CommonDataGrid = <RowType extends { id: GridRowId }>({
  rows,
  columns,
  checkboxSelection = false,
  page = 0,
  pageSize = 5,
  onRowClick,
  totalRecords,
  onPaginationChange,
}: CommonDataGridProps<RowType>) => {
  const handlePaginationChange = (model: { page: number; pageSize: number }) => {
    onPaginationChange?.(model.page + 1, model.pageSize); // +1 converts from 0-index to 1-index for API
  };

  return (
    <div className="h-[calc(100vh-220px)] w-full">
      <DataGrid<RowType>
        rows={rows}
        columns={columns}
        checkboxSelection={checkboxSelection}
        onRowClick={onRowClick}
        disableRowSelectionOnClick
        paginationMode="server"
        paginationModel={{ page: Math.max(0, (page ?? 1) - 1), pageSize }} // 👈 controlled by parent with guard
        onPaginationModelChange={handlePaginationChange}
        pageSizeOptions={[5, 10, 25, 50]}
        rowCount={totalRecords ?? rows.length}
        sx={{
          border: 0,
          "& .MuiDataGrid-cell": { fontFamily: "Poppins, sans-serif" },
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
