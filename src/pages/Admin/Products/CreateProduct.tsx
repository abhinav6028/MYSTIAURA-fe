import { useRef, useState } from 'react'
import TableHeader from '../../../components/UI/TableFormHeader';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormValues {
    productName: string;
    material: string;
    description: string;
    actualPrice: number;
    discountPrice: number;
    stock: number;
    discountType: string;
    productCategory: string;
}

const schema = yup.object({
    productName: yup.string().required("Product name is required"),
    material: yup.string().required("Material is required"),
    description: yup.string().required("Description is required"),
    actualPrice: yup
        .number()
        .typeError("Actual price must be a number")
        .positive()
        .required("Actual price is required"),
    discountPrice: yup
        .number()
        .typeError("Discount price must be a number")
        .positive()
        .required("Discount price is required"),
    stock: yup
        .number()
        .typeError("Stock must be a number")
        .integer()
        .required("Stock is required"),
    discountType: yup.string().required("Discount type is required"),
    productCategory: yup.string().required("Category is required"),
});

function CreateProduct() {

    const [selectedImage, setSelectedImage] = useState(0)
    const [previews, setPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current!.click();
    };

    const handleFileChange = (event: any) => {
        const files = Array.from(event.target.files || []) as File[];
        const imageUrls = files.map((file) => URL.createObjectURL(file));

        setPreviews((prev) => [...prev, ...imageUrls]);
    };
    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema), // connect Yup validation
        mode: "onBlur" // validate on blur
    });

    const handleFormSubmit = () => {
        alert("Form submitted successfully!");

        // const formData = new FormData();
        // formData.append("productName", data.productName);
        // formData.append("material", data.material);
        // formData.append("description", data.description);
        // formData.append("actualPrice", String(data.actualPrice));
        // formData.append("discountPrice", String(data.discountPrice));
        // formData.append("stock", String(data.stock));
        // formData.append("discountType", data.discountType);
        // formData.append("productCategory", data.productCategory);

        // // Attach images
        // if (fileInputRef.current?.files) {
        //     Array.from(fileInputRef.current.files).forEach((file) => {
        //         formData.append("images", file);
        //     });
        // }

        // // Call API
        // createProduct.mutate(formData);
    };

    return (
        <div>

            <div className="w-full min-h-screen flex justify-center bg-[#F6F6F6]">
                <div className="w-11/12">
                    <form action="" noValidate>


                        <TableHeader
                            headerName="Add New Product"
                            // routingPath='/admin/products/create'
                            buttonName='Add Product'
                            componentType='toForm'
                            onButtonClick={handleSubmit(handleFormSubmit)}
                        />

                        <div className="w-full flex justify-center min-h-screen bg-gray-50 py-4 mb-6">
                            <div className="max-w-6xl mx-auto">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Left Column - General Information */}
                                    <div className="space-y-6 flex flex-col">
                                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                            <div className="p-6 border-b border-gray-200">
                                                <h2 className="text-lg font-medium text-gray-700">General Information</h2>
                                            </div>
                                            <div className="p-6 space-y-4">
                                                <div>
                                                    <label htmlFor=" " className="block text-sm font-medium text-gray-600 mb-1">
                                                        Name Product
                                                    </label>
                                                    <Controller
                                                        name="productName"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <input
                                                                id='productName'
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                                                                {...field} // includes value, onChange, onBlur
                                                            />
                                                        )}
                                                    />
                                                    {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName.message}</p>}
                                                </div>

                                                <div>
                                                    <label htmlFor="productName" className="block text-sm font-medium text-gray-600 mb-1">
                                                        Material
                                                    </label>
                                                    <Controller
                                                        name="material"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <input
                                                                id="material"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                    {/* {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName.message}</p>} */}

                                                </div>

                                                <div>
                                                    <label htmlFor="productDescription" className="block text-sm font-medium text-gray-600 mb-1">
                                                        Description Product
                                                    </label>
                                                    <Controller
                                                        name="description"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <textarea
                                                                {...field}
                                                                id="description"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent min-h-[100px] resize-vertical"
                                                            />
                                                        )}
                                                    />

                                                </div>

                                            </div>
                                        </div>

                                        {/* Pricing and Stock */}
                                        <div className="mt-auto rounded-lg shadow-sm border border-gray-200">
                                            <div className="p-6 border-b border-gray-200">
                                                <h2 className="text-lg font-medium text-gray-700">Pricing And Stock</h2>
                                            </div>
                                            <div className="p-6 space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="basePrice" className="block text-sm font-medium text-gray-600 mb-1">
                                                            Actual Price
                                                        </label>

                                                        <Controller
                                                            name="actualPrice"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <input
                                                                    {...field}
                                                                    id="actualPrice"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="stock" className="block text-sm font-medium text-gray-600 mb-1">
                                                            Discount Price
                                                        </label>

                                                        <Controller
                                                            name="discountPrice"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <input
                                                                    {...field}
                                                                    id="discountPrice"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="discount" className="block text-sm font-medium text-gray-600 mb-1">
                                                            Stock
                                                        </label>
                                                        <Controller
                                                            name="stock"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <input
                                                                    {...field}
                                                                    id="stock"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="discountType" className="block text-sm font-medium text-gray-600 mb-1">
                                                            Discount Type
                                                        </label>
                                                        <Controller
                                                            name="discountType"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <select
                                                                    {...field}
                                                                    id="discountType"
                                                                    defaultValue="chinese-new-year"
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

                                    {/* Right Column - Upload Image and Category */}
                                    <div className="space-y-6">

                                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                            <div className="p-6 border-b border-gray-200">
                                                <h2 className="text-lg font-medium text-gray-700">Category</h2>
                                            </div>
                                            <div className="p-6 space-y-4">
                                                <div>
                                                    <label htmlFor="productCategory" className="block text-sm font-medium text-gray-600 mb-1">
                                                        Product Category
                                                    </label>

                                                    <Controller
                                                        name="productCategory"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <select
                                                                {...field}
                                                                id="productCategory"
                                                                defaultValue="jacket"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white"
                                                            >
                                                                <option value="jacket">Jacket</option>
                                                                <option value="shirt">Shirt</option>
                                                                <option value="pants">Pants</option>
                                                                <option value="accessories">Accessories</option>
                                                            </select>
                                                        )}
                                                    />

                                                </div>

                                                <button type="button" className="w-full px-4 py-2 cursor-pointer bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-md transition-colors">
                                                    Add Category
                                                </button>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                            <div className="p-6 border-b border-gray-200">
                                                <h2 className="text-lg font-medium text-gray-700">Upload Img</h2>
                                            </div>
                                            <div className="p-6">
                                                <div className="space-y-4">
                                                    {/* Main Product Image */}
                                                    <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                                                        <img
                                                            src={previews[selectedImage] || "/placeholder.svg"}
                                                            alt="Product"
                                                            className="max-w-full max-h-64 object-contain"
                                                        />
                                                    </div>

                                                    {/* Thumbnail Images */}
                                                    <div className="flex gap-2">
                                                        {previews.map((image, index) => (
                                                            <button
                                                                type="button"
                                                                key={index}
                                                                onClick={() => setSelectedImage(index)}
                                                                className={`w-16 h-16 rounded-lg border-2 overflow-hidden transition-colors ${selectedImage === index ? "border-blue-300" : "border-gray-200 hover:border-gray-300"
                                                                    }`}
                                                            >
                                                                <img
                                                                    src={image || "/placeholder.svg"}
                                                                    alt={`Product view ${index + 1}`}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </button>
                                                        ))}

                                                        <div>
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
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M12 4v16m8-8H4"
                                                                    />
                                                                </svg>
                                                            </button>

                                                            {/* Hidden file input */}
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                multiple
                                                                ref={fileInputRef}
                                                                style={{ display: 'none' }}
                                                                onChange={handleFileChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Category */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>



            </div>
        </div>
    )
}

export default CreateProduct
