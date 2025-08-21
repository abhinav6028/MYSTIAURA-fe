import getInspiredImg from "../../assets/homepage/sectionlast.jpg";

const GetInspired = () => {
    return (
        <div className="py-10">
            <h1 className="text-2xl md:text-3xl mb-5">Get Inspired</h1>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
                <img src={getInspiredImg} alt="" />
                <img src={getInspiredImg} alt="" />
                <img src={getInspiredImg} alt="" />
                <img src={getInspiredImg} alt="" />
            </div>
        </div>
    )
}

export default GetInspired