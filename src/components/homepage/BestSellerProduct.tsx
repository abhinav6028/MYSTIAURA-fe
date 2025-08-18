import bestSeller1 from "../../assets/homepage/bestseller1.png";
import bestSeller2 from "../../assets/homepage/bestseller2 (1).png";
import bestSeller3 from "../../assets/homepage/bestseller2 (2).png";
// import bestSeller4 from "../../assets/homepage/bestseller2 (3).png";
import bestSeller5 from "../../assets/homepage/bestseller2 (4).png";
// import bestSeller6 from "../../assets/homepage/bestseller2 (5).png";
import bestSeller7 from "../../assets/homepage/bestseller2 (6).png";
import bestSeller8 from "../../assets/homepage/bestseller2 (7).png";
import subbanner from "../../assets/homepage/subbanner.png";

const bestSellerData = [
    {
        id: 1, image: bestSeller1, name: "Solitaire Diamond Engagement Ring"
    },
    {
        id: 2, image: bestSeller2, name: "Gold Prestige Intertwined Earrings"
    },
    {
        id: 3, image: bestSeller3, name: "Gold Pigeon Blood Earrings"
    },
    {
        id: 4, image: bestSeller2, name: "Rose Gold Diamond Ring"
    },
    {
        id: 5, image: bestSeller5, name: "Rose Gold Lotus Necklace"
    },
    {
        id: 6, image: bestSeller8, name: "Diamond Engagement Ring"
    },
    {
        id: 7, image: bestSeller7, name: "Prestige Diamond Earrings"
    },
    {
        id: 8, image: bestSeller8, name: "Diamond Pearl Engagement Ring"
    }
]
const BestSellerProduct = () => {
    return (
        <div className='pb-8'>
            <h1 className="text-4xl mb-8">Best Seller Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {bestSellerData?.map((val, index) => (
                    <div key={index} className="flex flex-col mb-3 shadow-sm">
                        <div className="w-full aspect-[4/3] overflow-hidden rounded-lg">
                            <img
                                src={val.image}
                                alt={val.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="mt-2 text-lg font-medium text-center pb-2">{val.name}</h3>
                    </div>
                ))}
            </div>
            <div className="py-10 h-[40rem]">
                <img src={subbanner} alt="" className="w-full h-full object-cover" />
            </div>
        </div>
    )
}

export default BestSellerProduct