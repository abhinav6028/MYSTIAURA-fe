import React from "react";
import ProductCard from "./ProductCard";
import product from "../../assets/product.jpg"

const products = [
  { image: product, title: "Gold Prestige Earrings", price: 150, oldPrice: 150 },
  { image: product, title: "Rose Gold Diamond Ring", price: 280, oldPrice: 300 },
  { image: product, title: "Lotus Necklace", price: 200 },
  { image: product, title: "Diamond Engagement Ring", price: 240, oldPrice: 250 },
  { image: product, title: "Prestige Diamond Earrings", price: 140, oldPrice: 150 },
];

const ProductGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p, i) => (
        <ProductCard key={i} {...p} />
      ))}
    </div>
  );
};

export default ProductGrid;
