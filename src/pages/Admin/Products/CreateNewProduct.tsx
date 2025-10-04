import { Autocomplete, Button, TextField } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useRef, useState } from "react";
import type { IAdminFormInputs } from "../../../types/adminTypes";
import { useCreateProduct, useProductWithId, useUpdateProduct } from "../../../services/api/product/product";
import AdminLayout from "../../../components/layout/AdminLayout";
import { useCategories } from "../../../services/api/category/category";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDeleteImage } from "../../../services/api/imageUpload";
import { useQueryClient } from "@tanstack/react-query";

const schema = yup.object({
    name: yup.string().required("Product name is required"),
    description: yup.string().required("Description is required"),
    price: yup.number().required("Actual price is required").positive(),
    category: yup.string().required("Product category is required"),
    material: yup.string().required("Material is required"),
    discountPrice: yup.number().required("Discount price is required").min(0),
    stock: yup.number().required("Stock is required").min(0),
    discountType: yup.string().required("Discount type is required"),
}).required();

const CreateNewProducts = () => {

    const { control, handleSubmit, setValue, formState: { errors } } = useForm<IAdminFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            material: "",
            description: "",
            price: 0,
            discountPrice: 0,
            stock: 0,
            discountType: "chinese-new-year",
            category: "jacket",
        },
    });
    const navigate = useNavigate();
    const createProduct = useCreateProduct();
    const { data: category } = useCategories();
    const updateProduct = useUpdateProduct();
    const deleteImage = useDeleteImage();
    const { id: productId } = useParams();
    const { data: singleProduct } = useProductWithId(productId || "");

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [previews, setPreviews] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState(0);
    const [files, setFiles] = useState<File[]>([]);
    const [backendImages, setBackendImages] = useState<{ _id: string; secure_url: string }[]>([]);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (singleProduct) {
            setValue("name", singleProduct.name);
            setValue("material", singleProduct.material || "");
            setValue("description", singleProduct.description || "");
            setValue("price", singleProduct.price || 0);
            setValue("discountPrice", singleProduct.discountPrice || 0);
            setValue("stock", singleProduct.stock || 0);
            setValue("discountType", singleProduct.discountType || "chinese-new-year");
            setValue("category", singleProduct.category?._id || "jacket");
        }

        if (singleProduct?.images) {
            const imageIds = singleProduct.images.map((img: { secure_url: string }) => img.secure_url);
            setPreviews(imageIds);
        }

    }, [singleProduct]);

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
        const payload = {
            ...data,
            images: files,
            imageContainer: singleProduct?.images
                ? singleProduct.images.map((img: { _id: string }) => img._id)
                : [],
        };
        if (singleProduct) {
            updateProduct.mutate({
                _id: singleProduct._id,
                payload,
            });
            return;
        } else {
            createProduct.mutate(payload);
        }
    };

    const handleDeleteImg = (image: string, index: number) => {

        // If it's a newly uploaded blob (local preview)
        if (image.startsWith("blob:")) {
            setSelectedImage(0);

            const updatedFiles = [...files];
            const updatedPreviews = [...previews];

            updatedFiles.splice(index, 1);
            updatedPreviews.splice(index, 1);

            setFiles(updatedFiles);
            setPreviews(updatedPreviews);

            return;
        }

        const target = singleProduct?.images?.find((img) => img.secure_url === image);
        if (!target) return;

        // Call API to delete the image
        deleteImage.mutate(
            { productId: singleProduct?._id || "", imageId: target._id },
            {
                onSuccess: () => {

                    const updated = backendImages.filter((img) => img._id !== target._id);

                    setBackendImages(updated);
                    setPreviews(updated.map((img) => img.secure_url));
                    setSelectedImage(0);
                    queryClient.invalidateQueries({
                        queryKey: ["products", productId], // match your useProductWithId key
                    });
                },
                onError: (err) => {
                    console.error("Failed to delete image:", err);
                },
            }
        );
    };


    return (
        <AdminLayout>
            <div className="py-2">
                <div className="flex justify-between items-center mb-4">
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft size={20} />
                        <h1 className="text-xl font-bold">{singleProduct ? "Update Product" : "Add New Product"}</h1>
                    </div>
                    <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                        {singleProduct ? "Update Product" : "Create Product"}
                    </Button>
                </div>
                <div>
                    <form className="w-full min-h-screen bg-gray-50 py-6">
                        <div className="px-4">
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
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
                                                    Product Name
                                                </label>
                                                <Controller
                                                    name="name"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            id="name"
                                                            {...field}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                                                        />
                                                    )}
                                                />
                                                {errors.name && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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
                                                    <label htmlFor="price" className="block text-sm font-medium text-gray-600 mb-1">
                                                        Actual Price
                                                    </label>
                                                    <Controller
                                                        name="price"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <input
                                                                id="price"
                                                                type="number"
                                                                onWheel={(e) => e.currentTarget.blur()}
                                                                {...field}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                                                            />
                                                        )}
                                                    />
                                                    {errors.price && (
                                                        <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
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
                                                name="category"
                                                control={control}
                                                render={({ field, fieldState }) => {
                                                    // map the field.value (_id string) to the actual category object
                                                    const selectedCategory = category?.data?.find((cat: any) => cat._id === field.value) || null;

                                                    return (
                                                        <Autocomplete
                                                            options={category?.data || []}             // all categories
                                                            getOptionLabel={(option) => option.name}
                                                            isOptionEqualToValue={(option, value) => option._id === value._id}
                                                            value={selectedCategory}             // full object, not string
                                                            onChange={(_, value) => field.onChange(value?._id)} // store _id in form
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    label="Category"
                                                                    size="small"
                                                                    error={!!fieldState.error}
                                                                    helperText={fieldState.error?.message}
                                                                />
                                                            )}
                                                        />
                                                    );
                                                }}
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
                                                        className={`w-16 h-16 relative rounded-lg border-2 transition-colors ${selectedImage === index ? "border-blue-300" : "border-gray-200 hover:border-gray-300"
                                                            }`}
                                                    >
                                                        <img
                                                            src={image}
                                                            alt={`Thumbnail ${index + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <IoIosCloseCircleOutline size={20} color="red" onClick={() => handleDeleteImg(image, index)} className="absolute top-[-16px] right-[-10px] cursor-pointer" />
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
        </AdminLayout>
    );
};

export default CreateNewProducts;
