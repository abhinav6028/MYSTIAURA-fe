import { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { useCreateReview } from "../../services/api/review/review";
import { useAppSelector } from "../../store/hooks";

// Validation schema
const schema = yup.object().shape({
    rating: yup.number().required("Rating is required").min(1, "Select a rating"),
    review: yup
        .string()
        .required("Review is required")
        .max(100, "Maximum 100 characters"),
});

type ReviewFormData = {
    rating: number;
    review: string;
};

const ReviewDialog = () => {
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const createReview = useCreateReview(id!);


    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<ReviewFormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            rating: 0,
            review: "",
        },
    });

    useEffect(() => {
        if (open) {
            reset();
        }
    }, [open, reset]);

    const onSubmit = async (data: ReviewFormData) => {
        const response = await createReview.mutateAsync({ ...data, productId: id });
        if (response.status === 201) {
            reset();
            setOpen(false);
        }
    };

    const { isAuthenticated } = useAppSelector((state) => state.auth);




    return (
        <div>

            <p
                onClick={() => {
                    if (isAuthenticated) setOpen(true);
                }}
                style={{
                    background: isAuthenticated ? PRIMARY_COLOUR : "#ccc", // greyed out
                    pointerEvents: isAuthenticated ? "auto" : "none", // disable click
                }}
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
                            sx={{ bgcolor: PRIMARY_COLOUR, borderRadius: 0, color: 'white', fontFamily: 'revert', py: 1 }}
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
