import { Button, TextField, IconButton, Tooltip, Select, MenuItem, type SelectChangeEvent } from "@mui/material";
import { Delete } from "@mui/icons-material";
import AdminLayout from "../../../components/layout/AdminLayout";
import CommonDataGrid from "../../../components/MuiComponents/CustomDatagrid";
import { type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers, useDeleteUser, useUpdateUser } from "../../../services/api/users/users";
import AlertDialog from "../../../components/MuiComponents/CustomDialogBox";
import type { User } from "../../../types/adminTypes";

const UsersTable = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const { data: users } = useUsers({ search: searchText });
  const [open, setOpen] = useState(false);
  const deleteUser = useDeleteUser();
  const updateUser = useUpdateUser();
  const [selectedrow,setSelectedRow] = useState<User | null>(null);

  const RoleSelectCell = (params: GridRenderCellParams) => {
    const { row, value } = params;
  
    const handleChange = (event: SelectChangeEvent) => {
      const newRole = event.target.value;
  
      updateUser.mutate({
        id: row._id,
        payload: { ...row, role: newRole },
      });
    };
  
    return (
      <Select
        value={value || "user"}
        onChange={handleChange}
        size="small"
        fullWidth
      >
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </Select>
    );
  };

  const BlockSelectCell = (params: GridRenderCellParams) => {
    const { row, value } = params;
    const updateUser = useUpdateUser();
  
    const handleChange = (event: SelectChangeEvent) => {
      const newValue = event.target.value === "block"; // true if block, false if unblock
  
      updateUser.mutate({
        id: row._id,
        payload: { ...row, is_blocked: newValue },
      });
    };
  
    return (
      <Select
        value={value ? "block" : "unblock"}
        onChange={handleChange}
        size="small"
        fullWidth
      >
        <MenuItem value="block">Block</MenuItem>
        <MenuItem value="unblock">Unblock</MenuItem>
      </Select>
    );
  };

  // ✅ Table columns
  const columns: GridColDef[] = [
    { field: "sno", headerName: "S.No", flex: 1, minWidth: 150 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      sortable: false,
      renderCell: (params) => <RoleSelectCell {...params} />,
    },
    {
      field: "is_blocked",
      headerName: "Block",
      flex: 1,
      sortable: false,
      renderCell: (params) => <BlockSelectCell {...params} />,
    },
    {
      field: "isVerified",
      headerName: "Verified",
      flex: 0.7,
      renderCell: (params) => (params.value ? "Yes" : "No"),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          {/* Delete Button */}
          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() => {setOpen(true),setSelectedRow(params.row)}}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  // ✅ Table rows (map backend users)
  const rows = users?.map((user,index) => ({
    ...user,
    id: user._id,
    sno: index + 1,
  })) || [];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    if (!selectedrow) return;
    deleteUser.mutate(selectedrow?._id);
    setOpen(false);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">User List</h1>
        <Button
          variant="contained"
          onClick={() => navigate("/admin/users/create")}
        >
          Add New User
        </Button>
      </div>

      {/* Search bar */}
      <div className="my-4">
        <TextField
          label="Search Users"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={handleSearch}
          sx={{ maxWidth: 200 }}
        />
      </div>

      {/* Table */}
      <div>
        <CommonDataGrid
          rows={rows}
          columns={columns}
          checkboxSelection={false}
          autoHeight
          pageSize={5}
        />
      </div>

      {/* Delete Dialog Box */}
      <AlertDialog
        btnname1="Delete"
        btnname2="Cancel"
        title="Delete User"
        description={selectedrow?.name || selectedrow?.email || "user"} 
        open={open}
        onClose={handleClose}
        btn2Func={handleDelete}
      />
    </AdminLayout>
  );
};

export default UsersTable;