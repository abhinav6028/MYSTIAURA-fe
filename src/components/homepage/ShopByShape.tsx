import diamond from "../../assets/homepage/diamond.jpg";

const data = [
    {
        image: diamond,
        title: "Round"
    },
    {
        image: diamond,
        title: "Cushion"
    },
    {
        image: diamond,
        title: "Emerald"
    },
    {
        image: diamond,
        title: "Pear"
    },
    {
        image: diamond,
        title: "Oval"
    },
    {
        image: diamond,
        title: "Princess"
    },
    {
        image: diamond,
        title: "Heart"
    },

]
const ShopByShape = () => {
    return (
        <div className='pb-10'>
            <h1 className="text-4xl mb-8">Shop By Shape</h1>
            <div className="grid grid-cols-7 gap-3">
                {
                    data?.map((val, index) => {
                        return (
                            <div key={index} className="flex flex-col items-center gap-3">
                                <img src={val.image} alt="" />
                                <h2>{val.title}</h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ShopByShape