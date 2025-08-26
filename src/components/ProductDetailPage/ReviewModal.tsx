import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Rating,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PRIMARY_COLOUR } from "../../utils";

// Validation schema
const schema = yup.object().shape({
    rating: yup.number().required("Rating is required").min(1, "Select a rating"),
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").email("Invalid email"),
    review: yup
        .string()
        .required("Review is required")
        .max(100, "Maximum 100 characters"),
});

type ReviewFormData = {
    rating: number;
    name: string;
    email: string;
    review: string;
};

const ReviewDialog = () => {
    const [open, setOpen] = useState(false);

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<ReviewFormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            rating: 0,
            name: "",
            email: "",
            review: "",
        },
    });

    const onSubmit = (data: ReviewFormData) => {
        console.log("Review Submitted:", data);
        reset();
        setOpen(false);
    };

    return (
        <div>


            <p
                onClick={() => setOpen(true)}
                style={{ background: PRIMARY_COLOUR }}
                className="text-white py-3 px-5 cursor-pointer"
            >
                WRITE A REVIEW
            </p>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth
                PaperProps={{
                    sx: {
                        padding: "1rem",
                    },
                }}
            >
                <DialogTitle className="flex justify-between items-center">
                    Write A Review
                    <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent dividers>
                        {/* Rating */}
                        <div className="mb-1">
                            <Controller
                                name="rating"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Rating
                                            {...field}
                                            value={field.value}
                                            onChange={(_, val) => field.onChange(val)}
                                            precision={0.5}
                                            size="large"
                                        />
                                        {errors.rating && (
                                            <Typography color="error" variant="caption" display="block">
                                                {errors.rating.message}
                                            </Typography>
                                        )}
                                    </>
                                )}
                            />
                        </div>

                        {/* Name */}
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Name"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    variant="outlined" // make sure variant is outlined
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 0, // sharp corners
                                        },
                                    }}
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
                                    label="Email Address"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
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
                            name="review"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter Your Review"
                                    fullWidth
                                    margin="normal"
                                    multiline
                                    rows={3}
                                    inputProps={{ maxLength: 100 }}
                                    error={!!errors.review}
                                    helperText={
                                        errors.review
                                            ? errors.review.message
                                            : `${field.value.length}/100`
                                    }
                                    variant="outlined"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 0,
                                        },
                                    }}
                                />
                            )}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button
                            type="submit"
                            fullWidth
                            sx={{ bgcolor: PRIMARY_COLOUR, borderRadius: 0, color: 'white', fontFamily: 'revert', py: 1}}
                            className="text-white py-2 normal-case"
                            variant="outlined"
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default ReviewDialog;
