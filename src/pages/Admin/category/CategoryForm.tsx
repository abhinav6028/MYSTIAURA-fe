import AdminLayout from "../../../components/layout/AdminLayout";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useRef, useState } from "react";
import { useCategoryWithId, useCreateCategory, useUpdateCategory } from "../../../services/api/category/category";

const categorySchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().optional(),
    image: yup
        .mixed<FileList | string>()
        .test("fileRequired", "Image is required", (value) => {
            if (typeof value === "string") {
                return value.length > 0;
            }
            return value instanceof FileList && value.length > 0;
        }),
});

type CategoryFormValues = yup.InferType<typeof categorySchema>;

const CategoryForm = () => {

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        watch,
    } = useForm<CategoryFormValues>({
        resolver: yupResolver(categorySchema) as any,
        defaultValues: { name: "", description: "", image: "" },
    });
    const createCategory = useCreateCategory();
    const updateCategory = useUpdateCategory();
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const { id: categoryId } = useParams();
    const { data: singleCategory } = useCategoryWithId(categoryId || "");
    const imageValue = watch("image");

    useEffect(() => {
        if (singleCategory) {
            reset({
                name: singleCategory.name,
                description: singleCategory.description,
                image: singleCategory.image?.secure_url || "",
              });
        }
    }, [singleCategory, reset]);

    useEffect(() => {
        if (imageValue instanceof FileList && imageValue.length > 0) {
            setPreview(URL.createObjectURL(imageValue[0]));
        } else if (typeof imageValue === "string") {
            setPreview(imageValue);
        } else {
            setPreview(null);
        }
    }, [imageValue]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setValue("image", event.target.files as FileList);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const onSubmit = (data: CategoryFormValues) => {
        const payload = {
            ...data,
            image: typeof data.image === "string"
                ? singleCategory?.image?._id
                :   data.image && data.image.length > 0
                    ? Array.from(data.image) // new upload
                    : undefined,
        }
        if (categoryId) {
            updateCategory.mutate({ _id: categoryId, payload });
        } else {
            createCategory.mutate(payload);
        }
    };

    return (
        <AdminLayout>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold flex items-center gap-2"><ArrowLeft size={20} onClick={() => navigate(-1)} cursor="pointer" />{categoryId ? "Update Category" : "Add Category"}</h1>
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>{categoryId ? "Update Category" : "Create Category"}</Button>
            </div>
            <div className="mt-5">
                <form className="space-y-6">
                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Name"
                                    fullWidth
                                    size="small"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />

                        {/* Description */}
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Description"
                                    fullWidth
                                    multiline
                                    rows={1}
                                    size="small"
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                />
                            )}
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="p-6 bg-gray-100 rounded-lg flex flex-col items-center justify-center w-full h-80">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Category"
                                className="w-full h-full object-cover rounded-md"
                            />
                        ) : (
                            <span className="text-gray-400 text-center">No image selected</span>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />

                        {errors.image && (
                            <p className="text-red-500 text-sm mt-2">{errors.image.message}</p>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={handleButtonClick}
                            className="mt-4"
                        >
                            Upload Image
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}

export default CategoryForm;