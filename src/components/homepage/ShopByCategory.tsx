import arrowSvg from "../../assets/homepage/arrow.svg";
import selectCategory from "../../assets/homepage/selectcategory.jpg";
import { FONT_FAMILY } from "../../utils";

const categories = [
    { id: 1, name: "Rings", value: "rings" },
    { id: 2, name: "Earrings", value: "earrings" },
    { id: 3, name: "Bracelets", value: "bracelets" },
    { id: 4, name: "Pendents", value: "pendents" },
    { id: 5, name: "Necklaces", value: "necklaces" },
]
const ShopByCategory = () => {


    console.log("FONT_FAMILY", FONT_FAMILY);

    return (
        <div className="py-10">
            <h1 style={{ fontFamily: FONT_FAMILY }} className="text-4xl mb-8">Shop By Category</h1>
            <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] md:space-x-10">
                <div className="flex flex-col justify-between">
                    {
                        categories?.map((val) => {
                            return <div className="flex items-center justify-between pb-4 border-b border-b-gray-200 w-full">
                                <h1 style={{ fontFamily: FONT_FAMILY }} className="text-2xl">{val.name}</h1>
                                <span className="md:w-10 md:h-10 w-8 h-8 bg-primary flex items-center justify-center rounded-full"><img src={arrowSvg} alt="" /></span>
                            </div>
                        })
                    }
                </div>
                <div className="w-full h-[25rem] overflow-hidden">
                    <img src={selectCategory} alt="" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    )
}

export default ShopByCategory;




// <div className="py-10 px-4 sm:px-6 lg:px-20">
//     <h1
//         style={{ fontFamily: FONT_FAMILY }}
//         className="text-3xl sm:text-4xl mb-8 text-center sm:text-left"
//     >
//         Shop By Category
//     </h1>

//     <div className="grid grid-cols-1 lg:grid-cols-[65%_35%]">
//         {/* Categories List */}
//         <div className="flex flex-col justify-between space-y-4">
//             {categories?.map((val) => (
//                 <div
//                     key={val.name}
//                     className="flex items-center justify-between pb-4 border-b border-gray-200"
//                 >
//                     <h1 style={{ fontFamily: FONT_FAMILY }} className="text-xl sm:text-2xl">
//                         {val.name}
//                     </h1>
//                     <span className="w-10 h-10 bg-primary flex items-center justify-center rounded-full">
//                         <img src={arrowSvg} alt="" />
//                     </span>
//                 </div>
//             ))}
//         </div>

//         {/* Category Image */}
//         <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[25rem] overflow-hidden rounded-lg">
//             <img
//                 src={selectCategory}
//                 alt=""
//                 className="w-full h-full object-cover"
//             />
//         </div>
//     </div>
// </div>