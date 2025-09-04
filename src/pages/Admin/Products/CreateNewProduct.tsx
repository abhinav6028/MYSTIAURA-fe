import { Button } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef, useState } from "react";
import type { IAdminFormInputs } from "../../../types/adminTypes";
import { useCreateProduct } from "../../../services/api/product/product";

const schema = yup.object({
    productName: yup.string().required("Product name is required"),
    material: yup.string().required("Material is required"),
    description: yup.string().required("Description is required"),
    actualPrice: yup.number().required("Actual price is required").positive(),
    discountPrice: yup.number().required("Discount price is required").min(0),
    stock: yup.number().required("Stock is required").min(0),
    discountType: yup.string().required("Discount type is required"),
    productCategory: yup.string().required("Product category is required"),
}).required();

const CreateNewProducts = () => {

    const { control, handleSubmit, formState: { errors } } = useForm<IAdminFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            productName: "",
            material: "",
            description: "",
            actualPrice: 0,
            discountPrice: 0,
            stock: 0,
            discountType: "chinese-new-year",
            productCategory: "jacket",
        },
    });
    const navigate = useNavigate();
    const createProduct = useCreateProduct();

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [previews, setPreviews] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState(0);
    const [files, setFiles] = useState<File[]>([]);

    const handleButtonClick = () => fileInputRef.current?.click();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles) return;

        const fileArray = Array.from(selectedFiles);

        // Limit total images to 5
        const remainingSlots = 5 - files.length;
        const filesToAdd = fileArray.slice(0, remainingSlots);

        setFiles((prev) => [...prev, ...filesToAdd]);

        // For previews
        const urls = filesToAdd.map((file) => URL.createObjectURL(file));
        setPreviews((prev) => [...prev, ...urls]);

        // Reset input so same file can be selected again
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const onSubmit: SubmitHandler<IAdminFormInputs> = (data) => {
        createProduct.mutate(data);
    };

    return (
        <div className="m-[2rem] py-2">
            <div className="flex justify-between items-center mb-4">
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft size={20} />
                    <h1 className="text-xl font-bold">Add New Product</h1>
                </div>
                <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                    Add New Product
                </Button>
            </div>
            <div>
                <form className="w-full min-h-screen bg-gray-50 py-6">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column - General Information & Pricing */}
                            <div className="space-y-6">
                                {/* General Information */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                    <div className="p-6 border-b border-gray-200">
                                        <h2 className="text-lg font-medium text-gray-700">General Information</h2>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        {/* Product Name */}
                                        <div>
                                            <label htmlFor="productName" className="block text-sm font-medium text-gray-600 mb-1">
                                                Product Name
                                            </label>
                                            <Controller
                                                name="productName"
                                                control={control}
                                                render={({ field }) => (
                                                    <input
                                                        id="productName"
                                                        {...field}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                                                    />
                                                )}
                                            />
                                            {errors.productName && (
                                                <p className="text-red-500 text-sm mt-1">{errors.productName.message}</p>
                                            )}
                                        </div>

                                        {/* Material */}
                                        <div>
                                            <label htmlFor="material" className="block text-sm font-medium text-gray-600 mb-1">
                                                Material
                                            </label>
                                            <Controller
                                                name="material"
                                                control={control}
                                                render={({ field }) => (
                                                    <input
                                                        id="material"
                                                        {...field}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                                                    />
                                                )}
                                            />
                                            {errors.material && (
                                                <p className="text-red-500 text-sm mt-1">{errors.material.message}</p>
                                            )}
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">
                                                Description
                                            </label>
                                            <Controller
                                                name="description"
                                                control={control}
                                                render={({ field }) => (
                                                    <textarea
                                                        id="description"
                                                        {...field}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent min-h-[100px] resize-vertical"
                                                    />
                                                )}
                                            />
                                            {errors.description && (
                                                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Pricing & Stock */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                    <div className="p-6 border-b border-gray-200">
                                        <h2 className="text-lg font-medium text-gray-700">Pricing & Stock</h2>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Actual Price */}
                                            <div>
                                                <label htmlFor="actualPrice" className="block text-sm font-medium text-gray-600 mb-1">
                                                    Actual Price
                                                </label>
                                                <Controller
                                                    name="actualPrice"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            id="actualPrice"
                                                            type="number"
                                                            onWheel={(e) => e.currentTarget.blur()}
                                                            {...field}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                                                        />
                                                    )}
                                                />
                                                {errors.actualPrice && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.actualPrice.message}</p>
                                                )}
                                            </div>

                                            {/* Discount Price */}
                                            <div>
                                                <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-600 mb-1">
                                                    Discount Price
                                                </label>
                                                <Controller
                                                    name="discountPrice"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            id="discountPrice"
                                                            type="number"
                                                            onWheel={(e) => e.currentTarget.blur()}
                                                            {...field}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                                                        />
                                                    )}
                                                />
                                                {errors.discountPrice && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.discountPrice.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Stock */}
                                            <div>
                                                <label htmlFor="stock" className="block text-sm font-medium text-gray-600 mb-1">
                                                    Stock
                                                </label>
                                                <Controller
                                                    name="stock"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            id="stock"
                                                            type="number"
                                                            onWheel={(e) => e.currentTarget.blur()}
                                                            {...field}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                                                        />
                                                    )}
                                                />
                                                {errors.stock && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
                                                )}
                                            </div>

                                            {/* Discount Type */}
                                            <div>
                                                <label htmlFor="discountType" className="block text-sm font-medium text-gray-600 mb-1">
                                                    Discount Type
                                                </label>
                                                <Controller
                                                    name="discountType"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <select
                                                            id="discountType"
                                                            {...field}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white"
                                                        >
                                                            <option value="chinese-new-year">Chinese New Year Discount</option>
                                                            <option value="seasonal">Seasonal Discount</option>
                                                            <option value="clearance">Clearance Sale</option>
                                                        </select>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Category & Images */}
                            <div className="space-y-6">
                                {/* Category */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                    <div className="p-6 border-b border-gray-200">
                                        <h2 className="text-lg font-medium text-gray-700">Category</h2>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <Controller
                                            name="productCategory"
                                            control={control}
                                            render={({ field }) => (
                                                <select
                                                    id="productCategory"
                                                    {...field}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white"
                                                >
                                                    <option value="jacket">Jacket</option>
                                                    <option value="shirt">Shirt</option>
                                                    <option value="pants">Pants</option>
                                                    <option value="accessories">Accessories</option>
                                                </select>
                                            )}
                                        />
                                        <Button
                                            type="button"
                                            variant="outlined"
                                            fullWidth
                                            className="hover:bg-blue-50"
                                            onClick={() => console.log("Add Category")}
                                        >
                                            Add Category
                                        </Button>
                                    </div>
                                </div>

                                {/* Image Upload */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                    <div className="p-6 border-b border-gray-200">
                                        <h2 className="text-lg font-medium text-gray-700">Upload Images</h2>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        {/* Main Image */}
                                        <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center w-full h-64">
                                            {previews[selectedImage] ? (
                                                <img
                                                    src={previews[selectedImage]}
                                                    alt="Product"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-gray-400 text-center">No image available</span>
                                            )}
                                        </div>

                                        {/* Thumbnails */}
                                        <div className="flex gap-2 items-center">
                                            {previews.map((image, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => setSelectedImage(index)}
                                                    className={`w-16 h-16 rounded-lg border-2 overflow-hidden transition-colors ${selectedImage === index ? "border-blue-300" : "border-gray-200 hover:border-gray-300"
                                                        }`}
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`Thumbnail ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            ))}

                                            {/* Upload Button */}
                                            <button
                                                type="button"
                                                className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-blue-300 transition-colors"
                                                onClick={handleButtonClick}
                                            >
                                                <svg
                                                    className="w-6 h-6 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    ref={fileInputRef}
                                                    style={{ display: "none" }}
                                                    onChange={handleFileChange}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default CreateNewProducts;
