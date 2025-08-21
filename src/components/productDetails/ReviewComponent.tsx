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
import ReviewDialog from "./ReviewModal";

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

const ReviewsAndProducts = () => {
    return (
        <div className="p-6">
            {/* Reviews Section */}
            <div className="flex justify-between items-center mb-4">
                <Typography variant="h5" className="font-semibold">
                    Reviews
                </Typography>
                <ReviewDialog />
            </div>

            <div className="space-y-6">
                {reviews.map((review, idx) => (
                    <Card key={idx} className="shadow-none border border-gray-200">
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
            <Typography
                variant="h5"
                className="font-semibold mt-10 mb-4 border-t py-5"
            >
                Similar Products
            </Typography>

            <div className="grid grid-cols-4 gap-4">
                {similarProducts.map((product, idx) => (
                    <div key={idx}>
                        <Card className="shadow-md hover:shadow-lg transition">
                            <img
                                src={product.img}
                                alt={product.title}
                                className="w-full h-[20rem] object-cover"
                            />
                            <CardContent>
                                <Typography className="font-medium">{product.title}</Typography>
                                <div className="flex items-center space-x-2 mt-1">
                                    <Typography className="font-semibold text-amber-700">
                                        {product.price}
                                    </Typography>
                                    <Typography
                                        className="line-through text-gray-400 text-sm"
                                        component="span"
                                    >
                                        {product.oldPrice}
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsAndProducts;
