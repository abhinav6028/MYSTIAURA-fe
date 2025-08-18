import arrowSvg from "../../assets/homepage/arrow.svg";
import selectCategory from "../../assets/homepage/selectcategory.jpg";

const categories = [
    {id: 1,name: "Rings",value: "rings"},
    {id: 2,name: "Earrings",value: "earrings"},
    {id: 3,name: "Bracelets",value: "bracelets"},
    {id: 4,name: "Pendents",value: "pendents"},
    {id: 5,name: "Necklaces",value: "necklaces"},
]
const ShopByCategory = () => {
  return (
    <div className="py-10">
        <h1 className="text-4xl mb-8">Shop By Category</h1>
        <div className="grid grid-cols-[65%_35%] space-x-10">
            <div className="flex flex-col justify-between">
                {
                    categories?.map((val)=>{
                        return <div className="flex items-center justify-between pb-4 border-b border-b-gray-200">
                            <h1 className="text-2xl">{val.name}</h1>
                            <span className="w-10 h-10 bg-primary flex items-center justify-center rounded-full"><img src={arrowSvg} alt="" /></span>
                        </div>
                    })
                }
            </div>
            <div className="w-full h-full overflow-hidden">
                <img src={selectCategory} alt="" className="w-full h-full object-cover" />
            </div>
        </div>
    </div>
  )
}

export default ShopByCategory;