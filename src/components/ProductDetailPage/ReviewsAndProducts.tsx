import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Rating,
} from "@mui/material";
import { FONT_FAMILY, formatDate } from "../../utils";
import ProductGrid from "../inventory/ProductGrid";
import ReviewDialog from "./ReviewModal";
import { useAppSelector } from "../../store/hooks";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function ReviewsAndProducts() {
    const state = useAppSelector((state) => state.user.singleProduct);
    const reviews = state?.reviews ?? [];

    const { pathname } = useLocation();

   
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [pathname]);

    return (
        <div className="py-8">
            {/* Reviews Section */}
            <div className="flex justify-between items-center mb-4 w-full">
                <h1
                    style={{ fontFamily: FONT_FAMILY }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl "
                >
                    Reviews
                </h1>

                <ReviewDialog />
            </div>

            <div className="space-y-6">
                {reviews.length > 0 ? reviews.map((review, idx) => (
                    <Card sx={{ borderRadius: 0, borderBottom: ".5px solid grey" }} key={idx} className="shadow-none">
                        <CardContent>
                            <Typography variant="h6" className="font-semibold mb-1">
                                {review.comment}
                            </Typography>
                            {/* <Typography variant="body2" className="text-gray-600 mb-2">
                                {review.details}
                            </Typography> */}
                            <div className="flex items-center mt-3">
                                <Avatar sx={{ width: 40, height: 40 }}>
                                    {review.user.name?.charAt(0).toUpperCase()}
                                </Avatar>

                                <div className="ml-3">
                                    <Typography className="font-medium">{review.user.name}</Typography>
                                    <Rating value={review.rating} readOnly size="small" />
                                    <Typography variant="caption" className="text-gray-500 block">
                                        Review by {review.title} on {formatDate(review.createdAt)}
                                    </Typography>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )) : <p>No reviews yet</p>}
            </div>

            {/* Similar Products Section */}
            <h1
                style={{ fontFamily: FONT_FAMILY }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl my-10"
            >
                Similar Products
            </h1>

            <ProductGrid />
        </div>
    )
}

export default ReviewsAndProducts
