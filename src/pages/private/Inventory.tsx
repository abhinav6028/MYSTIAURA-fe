import React from "react";
import { Button } from "@mui/material";
import SidebarFilters from "../../components/inventory/InventorySideFilter";
import ProductGrid from "../../components/inventory/ProductGrid";

const ProductListingPage: React.FC = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarFilters />

      {/* Products */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">Showing 1-10 of 60 results</p>
          <div className="flex gap-3">
            <Button variant="outlined">Filter</Button>
            <Button variant="outlined">Sort by Popularity</Button>
          </div>
        </div>
        <ProductGrid />
      </main>
    </div>
  );
};

export default ProductListingPage;
