import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface ProductCardProps {
    image: string;
    title: string;
    price: number;
    oldPrice?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, price, oldPrice }) => {
    return (
        <Card className="shadow-md hover:shadow-lg transition rounded-lg w-full">
            {/* <div className="w-full flex justify-end pr-2">
                <IconButton>
                    <FavoriteBorderIcon />
                </IconButton>
            </div> */}
            <CardMedia component="img" image={image} alt={title} className="p-4 h-80 object-cover" />
            <CardContent>
                <Typography variant="body1" className="font-semibold !text-2xl">
                    {title}
                </Typography>
                <div className="flex justify-start gap-2">
                    <Typography color="primary" className="font-bold">
                        ${price.toFixed(2)}
                    </Typography>
                    {oldPrice && (
                        <Typography className="line-through text-gray-500">${oldPrice.toFixed(2)}</Typography>
                    )}
                </div>
                {/* <Button variant="contained" color="primary" className="mt-3">
                    Add to Cart
                </Button> */}
            </CardContent>
        </Card>
    );
};

export default ProductCard;
