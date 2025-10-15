import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../services/api/product/product";
import type { ProductCategory } from "../../types/categoryTypes";
// import { finalPrice } from "../../utils";
import { useAppSelector } from "../../store/hooks";

const ProductGrid: React.FC = () => {
  const navigate = useNavigate();
  const { categoryname } = useParams();
  const { categoryFilter } = useAppSelector((state) => state.user);
  const category = Array.isArray(categoryFilter?.category) && categoryFilter.category.length > 0
    ? categoryFilter.category.includes(categoryname || "")
      ? categoryFilter.category.join(",") // if it includes categoryname → keep joined
      : categoryFilter.category.join(",") // not included but not empty → still joined
    : categoryname;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // fetch products with pagination
  const { data: products } = useProducts({
    category: category,
    page: currentPage,
    limit: pageSize,
    minPrice: categoryFilter?.minPrice,
    maxPrice: categoryFilter?.maxPrice,
  });
  const productsData = products?.data?.products?.products || [];
  const totalProducts = products?.data?.products?.count || 0;

  // calculate total pages
  const totalPages = Math.ceil(totalProducts / pageSize);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);


  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <div className="md:px-4 mb-10">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-5">
        {Array.isArray(productsData) &&
          productsData.map((val: ProductCategory, index: number) => (
            <div
              key={index}
              className="bg-[#f9f9f9] flex flex-col place-items relative cursor-pointer"
              onClick={() => navigate(isAuthenticated ? `/user/productdetailPage/${val?._id}` : `/productdetailPage/${val?._id}`)}
            >
              <div className="w-full h-80 md:h-80 flex justify-center bg-[#f9f9f9]">
                <img
                  src={val?.images?.[0]?.secure_url}
                  alt={val?.name || "Product"}
                  className="w-full p-3 h-auto object-contain"
                />
              </div>

              <div className="w-full flex items-center px-2 sm:px-4 pb-4 gap-2 sm:gap-2 mt-2 sm:mt-0">
                <div className="w-12 h-12 items-center justify-center bg-white flex-shrink-0 flex">
                  <Heart size={20} className="text-gray-600" />
                </div>

                <button className="flex-1 bg-[#660033] text-white font-semibold md:py-3 py-2 text-sm sm:text-md hover:bg-[#51052b] transition-colors w-full sm:w-auto">
                  ADD TO CART
                </button>
              </div>

              <div className="w-full px-2 sm:px-4">
                <h2 className="text-sm md:text-lg text-black mb-1">
                  {val?.name}
                </h2>

                <div className="w-full">
                  <div className="flex items-baseline space-x-3">
                    <span className="text-lg font-semibold text-[#a37557]">
                      ₹ {val.discountPrice}
                    </span>
                    <span className="text-md text-gray-400 line-through">
                      ₹ {val.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          {/* Prev */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
          >
            Prev
          </button>

          {/* Page numbers */}
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 cursor-pointer rounded ${currentPage === i + 1
                ? "bg-[#660033] text-white"
                : "bg-gray-200"
                }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
