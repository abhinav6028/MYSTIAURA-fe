import { Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AdminLayout from "../../../components/layout/AdminLayout";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateUser, useUpdateUser } from "../../../services/api/users/users";
import { useEffect } from "react";

// ✅ Validation schema
const userSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

// ✅ Types
type UserFormValues = yup.InferType<typeof userSchema>;

const CreateUserForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UserFormValues>({
        resolver: yupResolver(userSchema) as any,
        defaultValues: { name: "", email: "", password: "" },
    });
    const navigate = useNavigate();
    const createUser = useCreateUser();
    const updateUser = useUpdateUser();
    const { state } = useLocation();
    
    useEffect(() => {
        if (state) {
          reset({
            name: state.name || "",
            email: state.email || "",
            password: "",
          });
        }
      }, [state, reset]);

    const onSubmit = (data: UserFormValues) => {
        if(state){
            updateUser.mutate({
                id: state._id,
                payload: data,
            });
        }else{
            createUser.mutate(data);
        }
    };

    return (
        <AdminLayout>
             <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold flex items-center gap-2"><ArrowLeft size={20} onClick={() => navigate(-1)} cursor="pointer" />{state ? "Update User" : "Add User"}</h1>
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>{state ? "Update User" : "Create User"}</Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="py-6 flex flex-col gap-4">
                {/* Name */}
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Name"
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    )}
                />

                {/* Email */}
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Email"
                            type="email"
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    )}
                />

                {/* Password */}
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Password"
                            type="password"
                            fullWidth
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    )}
                />
            </form>
        </AdminLayout>
    );
};

export default CreateUserForm;
