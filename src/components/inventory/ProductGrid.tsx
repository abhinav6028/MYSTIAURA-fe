import React, { useEffect } from "react";
import { Heart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../services/api/product/product";
import type { ProductCategory } from "../../types/categoryTypes";
import { finalPrice } from "../../utils";

const ProductGrid: React.FC = () => {

  const navigate = useNavigate();
  const { categoryname } = useParams();
  const { data: products } = useProducts(categoryname);
  const productsData = products?.data?.products?.products || [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:px-4 mb-5 md:mb-10">
      {Array.isArray(productsData) && productsData?.map((val: ProductCategory, index: number) => (
        <div
          key={index}
          className="bg-[#f9f9f9] flex flex-col place-items relative cursor-pointer"
          onClick={() => navigate(`/productdetailPage/${val?._id}`)}
        >
          <div className="w-full h-80 md:h-80 flex justify-center bg-[#f9f9f9]">
            <img
              src={val?.images?.[0]?.secure_url}
              alt="Ring"
              className="w-full p-3 h-auto object-contain"
            />
          </div>

          <div className="w-full flex items-center px-2 sm:px-4 pb-4 gap-2 sm:gap-2 mt-2 sm:mt-0">
            <div className="w-12 h-12 items-center justify-center bg-white flex-shrink-0 flex">
              <Heart size={20} className="text-gray-600" />
            </div>

            {/* Add to Cart Button */}
            <button className="flex-1 bg-[#660033] text-white font-semibold md:py-3 py-2 text-sm sm:text-md hover:bg-[#51052b] transition-colors w-full sm:w-auto">
              ADD TO CART
            </button>
          </div>

          {/* Title & Price */}
          <div className="w-full bg-white px-2 sm:px-4">
            <h2 className="text-sm md:text-lg text-black mb-1">
              {val?.name}
            </h2>

            <div className="w-full bg-white">
              <div className="flex items-baseline space-x-3">
                <span className="text-lg font-semibold text-[#a37557]">
                  ₹ {finalPrice(val.price, 10).toFixed(2)}
                </span>
                <span className="text-md text-gray-400 line-through">
                  ₹ {val.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* <div className="flex items-baseline space-x-3">
              <span className="text-lg font-semibold text-[#a37557]">INR {val?.price}</span>
              
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
