import React, { useEffect, useRef, useState } from "react";
import SidebarFilters from "../../components/inventory/InventorySideFilter";
import ProductGrid from "../../components/inventory/ProductGrid";
import { PRIMARY_COLOUR } from "../../utils";
import { ListFilter, X } from "lucide-react";

const ProductListingPage: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      const headerOffset = 0;
      const elementPosition = scrollRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex" ref={scrollRef}>
      {/* Sidebar for desktop */}
      <div className="hidden lg:block">
        <SidebarFilters />
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg transform ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Filters</h2>
          <button onClick={handleSidebarToggle}>
            <X size={20} />
          </button>
        </div>
        <SidebarFilters />
      </div>

      {/* Overlay when sidebar is open */}
      {isSidebarVisible && (
        <div
          className="fixed inset-0  bg-opacity-50 z-40 lg:hidden"
          onClick={handleSidebarToggle}
        />
      )}

      {/* Products */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          {/* Filter Button only on mobile */}
          <button
            onClick={handleSidebarToggle}
            style={{ background: PRIMARY_COLOUR }}
            className="text-white py-3 px-4 rounded md:hidden flex items-center gap-1.5"
          >
            <ListFilter size={16} /> Filter
          </button>
        </div>

        <ProductGrid />
      </main>
    </div>
  );
};

export default ProductListingPage;























// import React, { useEffect, useRef, useState } from "react";
// import SidebarFilters from "../../components/inventory/InventorySideFilter";
// import ProductGrid from "../../components/inventory/ProductGrid";
// import { MenuItem, Select } from "@mui/material";
// import { PRIMARY_COLOUR } from "../../utils";
// import { ListFilter } from "lucide-react";
// // import type { UserState } from "../../types/userTypes";
// // import { useSelector } from "react-redux";

// const ProductListingPage: React.FC = () => {


//   // const state = useSelector((state: {user: UserState}) => state?.user?.selectedProductCategory as any);

//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (scrollRef.current) {
//       const headerOffset = 0; // height of your fixed header in px
//       const elementPosition = scrollRef.current.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: "smooth",
//       });
//     }
//   }, []);

//   // const [lang, setLang] = useState()


//   return (
//     <div className="flex" ref={scrollRef}>
//       {/* Sidebar */}
//       <div className="hidden lg:block">
//         <SidebarFilters />
//       </div>

//       {/* Products */}
//       <main className="flex-1 p-6">
//         <div className="flex justify-between items-center mb-6">
//           {/* <p className="text-gray-600">Showing {filteredCount === 0 ? 0 : 1}-{filteredCount <= 8 ? filteredCount : 8} of {filteredCount} results</p> */}
//           <div className="flex gap-3">
//             <button style={{ background: PRIMARY_COLOUR, }} className="text-white py-4 px-3 md:px-5 flex items-center gap-1.5 cursor-pointer"> <ListFilter size={16} /> Filter</button>
//           </div>
//         </div>

//         <ProductGrid />
//       </main>
//     </div>
//   );
// };

// export default ProductListingPage;
