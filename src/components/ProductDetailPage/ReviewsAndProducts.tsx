import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Rating,
} from "@mui/material";
import goldLotus from "../../assets/homepage/bestseller2 (4).png"
import engagement from "../../assets/homepage/bestseller2 (3).png"
import earings from "../../assets/homepage/bestseller2 (2).png"
import ring from "../../assets/homepage/bestseller2 (5).png"
import { FONT_FAMILY, PRIMARY_COLOUR } from "../../utils";
import ProductGrid from "../inventory/ProductGrid";
import ReviewDialog from "./ReviewModal";
// import ReviewDialog from "./ReviewModal";

const reviews = [
    {
        name: "Annette Black",
        content: "Exquisite Craftsmanship & Timeless Beauty",
        details:
            "Absolutely stunning! The craftsmanship and attention to detail are beyond compare. Truly timeless and elegant. Each piece is meticulously designed to bring out brilliance and sophistication, making every moment special.",
        rating: 5,
        date: "Feb 25, 2025",
        company: "PearlGem",
    },
    {
        name: "Darrell Steward",
        content: "Perfect Gift for Any Occasion",
        details:
            "Bought a necklace for my wife, and she loved it! A perfect blend of luxury and charm. Designed to make every celebration memorable, our jewelry captures love, elegance, and personal style effortlessly.",
        rating: 5,
        date: "Feb 25, 2025",
        company: "PearlGem",
    },
];

const similarProducts = [
    {
        title: "Rose Gold Lotus Necklace",
        price: "$200.00",
        oldPrice: "$220.00",
        img: goldLotus,
    },
    {
        title: "Diamond Engagement Ring",
        price: "$240.00",
        oldPrice: "$250.00",
        img: engagement,
    },
    {
        title: "Prestige Diamond Earrings",
        price: "$140.00",
        oldPrice: "$150.00",
        img: earings,
    },
    {
        title: "Rose Gold Diamond Ring",
        price: "$280.00",
        oldPrice: "$300.00",
        img: ring,
    },
];

function ReviewsAndProducts() {
    return (
        <div className="py-4 px-4 md:px-10 lg:px-10">
            {/* Reviews Section */}
            <div className="flex justify-between items-center mb-4 w-full">
                <h1
                    style={{ fontFamily: FONT_FAMILY }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl "
                >
                    Reviews
                </h1>

                <ReviewDialog/>
               
                {/* <ReviewDialog /> */}
            </div>

            <div className="space-y-6">
                {reviews.map((review, idx) => (
                    <Card sx={{ borderRadius: 0, borderBottom: ".5px solid grey" }} key={idx} className="shadow-none">
                        <CardContent>
                            <Typography variant="h6" className="font-semibold mb-1">
                                {review.content}
                            </Typography>
                            <Typography variant="body2" className="text-gray-600 mb-2">
                                {review.details}
                            </Typography>
                            <div className="flex items-center mt-3">
                                <Avatar src={`https://i.pravatar.cc/40?img=${idx + 1}`} />
                                <div className="ml-3">
                                    <Typography className="font-medium">{review.name}</Typography>
                                    <Rating value={review.rating} readOnly size="small" />
                                    <Typography variant="caption" className="text-gray-500 block">
                                        Review by {review.company} on {review.date}
                                    </Typography>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
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
