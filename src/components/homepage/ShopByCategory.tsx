import arrowSvg from "../../assets/homepage/arrow.svg";
import selectCategory from "../../assets/homepage/selectcategory.jpg";
import { FONT_FAMILY, navigatePath } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { useCategories } from "../../services/api/category/category";

interface Category {
    _id: string;
    name: string;
    productCount: number;
}

const ShopByCategory = () => {

    const navigate = useNavigate();
    const { data: categories } = useCategories();
    // const categoryList = categories?.data?.categories || [];
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const categoryList = categories?.data?.categories?.filter((cat: Category) => cat.productCount !== 0) || []


    return (
        <div className="py-10">
            <h1 style={{ fontFamily: FONT_FAMILY }} className="text-4xl mb-8">
                Shop By Category
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] md:space-x-10">
                {/* LEFT SIDE: Vertical scroll */}
                <div className="w-full h-[25rem] overflow-y-auto pr-2 scrollbar-hide">
                    {categoryList?.map((val: any, index: number) => (
                        <div
                            key={index}
                            className="flex items-center justify-between pb-4 border-b border-b-gray-200 w-full cursor-pointer"
                            onClick={() =>
                                navigate(
                                    `${isAuthenticated ? '/' : ''}${navigatePath}/inventory/${val?.name}`
                                )
                            }
                        >
                            <h1
                                style={{ fontFamily: FONT_FAMILY }}
                                className="text-2xl"
                            >
                                {val?.name}
                            </h1>
                            <span
                                className="md:w-10 md:h-10 w-8 h-8 bg-primary flex items-center justify-center rounded-full cursor-pointer"
                            >
                                <img src={arrowSvg} alt="" />
                            </span>
                        </div>
                    ))}
                </div>

                {/* RIGHT SIDE: Fixed height image */}
                <div className="w-full h-[25rem] overflow-hidden">
                    <img
                        src={selectCategory}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>


    )
}

export default ShopByCategory;

