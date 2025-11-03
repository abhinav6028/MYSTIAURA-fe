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
        paginationModel={{ page: Math.max(0, (page ?? 1) - 1), pageSize }}
        onPaginationModelChange={handlePaginationChange}
        pageSizeOptions={[5, 10, 25, 50]}
        rowCount={totalRecords ?? rows.length}
        sx={{
          border: 0,

          // ✅ Row height auto-adjusts to content
          "& .MuiDataGrid-row": {
            minHeight: "70px !important",
            maxHeight: "none !important",
          },

          // ✅ Allow multiline wrapping
          "& .MuiDataGrid-cell": {
            fontFamily: "Poppins, sans-serif",
            whiteSpace: "normal !important", // allow wrapping
            wordBreak: "break-word !important",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            lineHeight: "normal !important", // remove fixed line height
            padding: "8px",
          },

          "& .MuiDataGrid-cellContent": {
            textAlign: "center",
            width: "100%",
            whiteSpace: "normal !important",
            wordBreak: "break-word !important",
          },

          "& .MuiDataGrid-columnHeaders": {
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            textAlign: "center",
            minHeight: "60px !important",
          },

          "& .MuiDataGrid-columnHeaderTitle": {
            width: "100%",
            textAlign: "center",
            whiteSpace: "normal !important",
          },
        }}

      />

    </div>
  );
};

export default CommonDataGrid;