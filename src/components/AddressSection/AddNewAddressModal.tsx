import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PRIMARY_COLOUR } from "../../utils";
import { Plus } from "lucide-react";

// Validation schema
const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    phone: yup.string().required("Phone is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    country: yup.string().required("Country is required"),
});

type ReviewFormData = {
    name: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    };

const AddNewAddressModal = () => {
    const [open, setOpen] = useState(false);

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<ReviewFormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            phone: "",
            address: "",
            city: "",
            country: "",
        },
    });

    const onSubmit = (data: ReviewFormData) => {
        console.log("Review Submitted:", data);
        reset();
        setOpen(false);
    };

    return (
        <div>


            <p onClick={() => setOpen(true)}
                className='md:px-6 px-4 py-2 border w-fit md:mt-3 mt-2 md:mb-6 mb-1 flex cursor-pointer'> <Plus strokeWidth={1} /> <span className='ml-1'> ADD NEW ADDRESS</span> </p>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth
                PaperProps={{
                    sx: {
                        padding: "1rem",
                        width: 500
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        px: 2,
                        py: 1
                    }}
                    className="flex justify-between items-center">
                    Add New Address
                    <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent dividers sx={{ borderTop: 'none !important', paddingTop: 2 }}>

                        {/* Name */}
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Name"
                                    size="small"
                                    fullWidth
                                    margin="dense"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    variant="outlined" // make sure variant is outlined
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 0,
                                        },
                                    }}
                                />
                            )}
                        />

                        {/* Email */}
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    type="number"
                                    {...field}
                                    label="Phone Number"
                                    size="small"
                                    fullWidth
                                    margin="dense"
                                    error={!!errors.phone}
                                    helperText={errors.phone?.message}
                                    variant="outlined" // make sure variant is outlined
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 0, // sharp corners
                                        },
                                    }}
                                />
                            )}
                        />

                        {/* Review */}
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter Your Address"
                                    size="small"
                                    fullWidth
                                    margin="dense"
                                    inputProps={{ maxLength: 100 }}
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
                                    variant="outlined"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 0,
                                        },
                                    }}
                                />
                            )}
                        />

                        <Controller
                            name="city"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter City"
                                    size="small"
                                    fullWidth
                                    margin="dense"
                                    error={!!errors.city}
                                    helperText={errors.city?.message}
                                    variant="outlined" // make sure variant is outlined
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 0, // sharp corners
                                        },
                                    }}
                                />
                            )}
                        />

                        <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter Country"
                                    size="small"
                                    fullWidth
                                    margin="dense"
                                    error={!!errors.country}
                                    helperText={errors.country?.message}
                                    variant="outlined"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 0,
                                        },
                                    }}
                                />
                            )}
                        />

                        <DialogActions sx={{ bgcolor: 'red', p: 0, my: 1 }}>
                            <Button
                                type="submit"
                                fullWidth
                                sx={{ bgcolor: PRIMARY_COLOUR, borderRadius: 0, color: 'white', fontFamily: 'revert', py: 1 }}
                                className="text-white py-2 normal-case"
                                variant="outlined"
                            >
                                Submit
                            </Button>
                        </DialogActions>
                    </DialogContent>

                </form>
            </Dialog>
        </div >
    );
};

export default AddNewAddressModal;
