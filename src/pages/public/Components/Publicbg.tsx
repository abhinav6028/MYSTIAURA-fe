import banner from "../../../assets/homepage/herobanner-hp.jpg";

const PublicPageBG = () => {
    return <div
        className="absolute h-screen top-0 left-0 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
    >
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black opacity-20"></div>
    </div>
}

export default PublicPageBG;