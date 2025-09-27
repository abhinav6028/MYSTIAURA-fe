import React, { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import SidebarFilters from "../../components/inventory/InventorySideFilter";
import ProductGrid from "../../components/inventory/ProductGrid";
import { PRIMARY_COLOUR } from "../../utils";
import { ListFilter } from "lucide-react";
import type { UserState } from "../../types/userTypes";
import { useSelector } from "react-redux";

const ProductListingPage: React.FC = () => {

  const [lang, setLang] = useState("EN");

  const state = useSelector((state: {user: UserState}) => state?.user?.selectedProductCategory as any);
  const filteredCount = state?.data?.products?.count;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <SidebarFilters />
      </div>

      {/* Products */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">Showing 1-{filteredCount <= 8 ? filteredCount : 8} of {filteredCount} results</p>
          <div className="flex gap-3">
            <button style={{ background: PRIMARY_COLOUR, }} className="text-white px-3 md:px-5 flex items-center gap-1.5 cursor-pointer"> <ListFilter size={16} /> Filter</button>
            <Select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              variant="standard"
              disableUnderline
              className="text-sm border px-3"
            >
              <MenuItem value="EN">Sort by Popularity</MenuItem>
              <MenuItem value="FR">FR</MenuItem>
              <MenuItem value="ES">ES</MenuItem>
            </Select>

          </div>
        </div>

        <ProductGrid />
      </main>
    </div>
  );
};

export default ProductListingPage;
