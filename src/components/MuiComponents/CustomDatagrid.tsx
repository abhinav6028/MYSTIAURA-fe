import React, { useState } from "react";
import { DataGrid, type GridColDef, type GridRowId } from "@mui/x-data-grid";

interface CommonDataGridProps<RowType = any> {
    rows: RowType[];
    columns: GridColDef[];
    checkboxSelection?: boolean;
    autoHeight?: boolean;
    pageSize?: number;
    onRowClick?: (params: any) => void;
}

const CommonDataGrid = <RowType extends { id: GridRowId }>({
    rows,
    columns,
    checkboxSelection = false,
    autoHeight = true,
    pageSize = 5,
    onRowClick,
}: CommonDataGridProps<RowType>) => {
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize,
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
                sx={{
                  "& .MuiDataGrid-cell:focus": {
                    outline: "none",
                  },
                  "& .MuiDataGrid-cell:focus-within": {
                    outline: "none",
                  },
                }}
            />
        </div>
    );
};

export default CommonDataGrid;
