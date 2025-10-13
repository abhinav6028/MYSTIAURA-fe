import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import AdminLayout from "../../../components/layout/AdminLayout";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCategories } from "../../../services/api/category/category";
import { useProducts } from "../../../services/api/product/product";
import { useEffect, useState } from "react";
import { useCreateOrders, useOrderWithId, useUpdateOrders } from "../../../services/api/orders/orders";

const schema = yup.object({
    items: yup
        .array()
        .of(
            yup.object({
                category: yup.string().required("Category is required"),
                product: yup.string().required("Product is required"),
                price: yup
                    .number()
                    .typeError("Price must be a number")
                    .required("Price is required"),
                quantity: yup
                    .number()
                    .typeError("Quantity must be a number")
                    .required("Quantity is required"),
            })
        )
        .min(1, "At least one product is required"),
    customerName: yup.string().required("Customer Name is required"),
    phone: yup.string().required("Phone number is required"),
    addressLine1: yup.string().required("Address Line 1 is required"),
    addressLine2: yup.string().required("Address Line 2 is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    postalCode: yup.string().required("Postal Code is required"),
    country: yup.string().required("Country is required"),
    totalAmount: yup
        .number()
        .typeError("Amount must be a number")
        .required("Amount is required"),
    status: yup.string().required("Status is required"),
});

type FormValues = yup.InferType<typeof schema>;

export default function CreateOrders() {
    const navigate = useNavigate();
    // Track selected categories for each item by index
    const [selectedCategories, setSelectedCategories] = useState<{ [key: number]: string }>({});

    const { id: orderId } = useParams();
    const { data: singleProduct } = useOrderWithId(orderId || "");

    const { data: categories } = useCategories();
    const categoryList = categories?.data?.categories || [];
    const filteredCategory = categoryList.filter(
        (c: any) => c?.productCount !== 0
    );

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
        watch,
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        mode: "onBlur",
        defaultValues: {
            items: [{ category: "", product: "", price: 0, quantity: 1 }],
            customerName: "",
            phone: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            totalAmount: 0,
            status: "",
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    const createOrders = useCreateOrders();
    const updateOrders = useUpdateOrders();

    useEffect(() => {
        if (singleProduct) {
            const items = singleProduct.items?.map((it: any, idx: number) => {
                // Set selected category for each item
                const category = it.category || "";
                setSelectedCategories((prev) => ({ ...prev, [idx]: category }));

                return {
                    category,
                    product: it.product?._id || it.product || "",
                    price: it.price || 0,
                    quantity: it.quantity || 1,
                };
            }) || [];

            const formValues = {
                items,
                customerName: singleProduct?.shippingAddress?.name || "",
                phone: singleProduct?.shippingAddress?.phone || "",
                addressLine1: singleProduct?.shippingAddress?.addressLine1 || "",
                addressLine2: singleProduct?.shippingAddress?.addressLine2 || "",
                city: singleProduct?.shippingAddress?.city || "",
                state: singleProduct?.shippingAddress?.state || "",
                postalCode: singleProduct?.shippingAddress?.postalCode || "",
                country: singleProduct?.shippingAddress?.country || "",
                totalAmount: singleProduct?.totalAmount || 0,
                status: singleProduct?.status || "In Progress",
            };

            reset(formValues);
        }
    }, [singleProduct, reset]);

    const onSubmit = (data: FormValues) => {
        const payLoad = {
            items: data.items.map((item) => ({
                product: item.product,
                price: item.price,
                quantity: item.quantity,
            })),
            shippingAddress: {
                name: data.customerName,
                phone: data.phone,
                addressLine1: data.addressLine1,
                addressLine2: data.addressLine2,
                city: data.city,
                state: data.state,
                postalCode: data.postalCode,
                country: data.country,
            },
            totalAmount: data.totalAmount,
            status: data.status,
        };

        console.log("Payload with updated values:", payLoad);

        if (orderId && singleProduct) {
            updateOrders.mutate({ payload: payLoad, id: orderId });
        } else {
            createOrders.mutate(payLoad);
        }
    };

    // Component to handle products for each category
    const ProductDropdown = ({ index }: { index: number }) => {
        const selectedCategory = selectedCategories[index] || "";

        const { data: products } = useProducts({
            category: selectedCategory,
        });

        const filteredProducts = products?.data?.products?.products || [];

        return (
            <Controller
                name={`items.${index}.product`}
                control={control}
                render={({ field }) => (
                    <div className="flex flex-col w-100">
                        <TextField
                            {...field}
                            select
                            label="Product"
                            fullWidth
                            size="small"
                            error={!!errors.items?.[index]?.product}
                            InputLabelProps={{ shrink: true }}
                        >
                            <MenuItem value="">Select Product</MenuItem>
                            {filteredProducts.map((prod: any) => (
                                <MenuItem key={prod._id} value={prod._id}>
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={prod?.images?.[0]?.secure_url}
                                            alt=""
                                            className="w-[30px] h-[30px] object-cover"
                                        />
                                        <Typography>{prod.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            (stock: {prod.stock})
                                        </Typography>
                                    </div>
                                </MenuItem>
                            ))}
                        </TextField>
                        {errors.items?.[index]?.product?.message && (
                            <span className="text-red-500 text-xs h-5 mt-1">
                                {errors.items?.[index]?.product?.message || ""}
                            </span>
                        )}
                    </div>
                )}
            />
        );
    };

    return (
        <AdminLayout>
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <ArrowLeft
                        size={20}
                        onClick={() => navigate(-1)}
                        cursor="pointer"
                    />
                    {orderId ? "Update Order" : "Add Order"}
                </h1>
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                    {orderId ? "Update Order" : "Create Order"}
                </Button>
            </div>

            {/* FORM */}
            <div className="mt-5">
                <form className="space-y-6">
                    <h2 className="font-semibold text-lg">Address</h2>

                    {/* Row 3: Customer Name + Address Line 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Controller
                            name="customerName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Customer Name"
                                    fullWidth
                                    size="small"
                                    error={!!errors.customerName}
                                    helperText={errors.customerName?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                            )}
                        />

                        <Controller
                            name="addressLine1"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Address Line 1"
                                    fullWidth
                                    size="small"
                                    error={!!errors.addressLine1}
                                    helperText={errors.addressLine1?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                            )}
                        />
                    </div>

                    {/* Row 4: Address Line 2 + City */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Controller
                            name="addressLine2"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Address Line 2"
                                    fullWidth
                                    size="small"
                                    error={!!errors.addressLine2}
                                    helperText={errors.addressLine2?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                            )}
                        />

                        <Controller
                            name="city"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="City"
                                    fullWidth
                                    size="small"
                                    error={!!errors.city}
                                    helperText={errors.city?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                            )}
                        />
                    </div>

                    {/* Row 5: State + Country */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Controller
                            name="state"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="State"
                                    fullWidth
                                    size="small"
                                    error={!!errors.state}
                                    helperText={errors.state?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                            )}
                        />

                        <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Country"
                                    fullWidth
                                    size="small"
                                    error={!!errors.country}
                                    helperText={errors.country?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                            )}
                        />
                    </div>

                    {/* Row 6: Postal Code + Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Controller
                            name="postalCode"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Postal Code"
                                    fullWidth
                                    size="small"
                                    error={!!errors.postalCode}
                                    helperText={errors.postalCode?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                            )}
                        />

                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Phone"
                                    fullWidth
                                    size="small"
                                    error={!!errors.phone}
                                    helperText={errors.phone?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                            )}
                        />
                    </div>

                    {/* Row 7: Amount + Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Controller
                            name="totalAmount"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Total Amount"
                                    fullWidth
                                    size="small"
                                    type="number"
                                    error={!!errors.totalAmount}
                                    helperText={errors.totalAmount?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                            )}
                        />

                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    label="Status"
                                    fullWidth
                                    size="small"
                                    error={!!errors.status}
                                    helperText={errors.status?.message}
                                    InputLabelProps={{ shrink: true }}
                                >
                                    <MenuItem value="">Select Status</MenuItem>
                                    <MenuItem value="In Progress">In Progress</MenuItem>
                                    <MenuItem value="Delivered">Delivered</MenuItem>
                                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                                </TextField>
                            )}
                        />
                    </div>

                    <div className="flex items-center justify-between mt-8">
                        <h2 className="font-semibold text-lg">Products</h2>
                        <Button
                            variant="outlined"
                            onClick={() =>
                                append({ category: "", product: "", price: 0, quantity: 1 })
                            }
                        >
                            Add Product
                        </Button>
                    </div>

                    <div className="border rounded-md p-4">
                        {fields.map((item, index) => (
                            <div
                                key={item.id}
                                className="flex flex-wrap justify-between gap-4 p-4 my-3 bg-gray-50 rounded-md relative"
                            >
                                {/* Category */}
                                <Controller
                                    name={`items.${index}.category`}
                                    control={control}
                                    render={({ field }) => (
                                        <div className="flex flex-col w-64">
                                            <TextField
                                                {...field}
                                                select
                                                label="Category"
                                                fullWidth
                                                size="small"
                                                error={!!errors.items?.[index]?.category}
                                                InputLabelProps={{ shrink: true }}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                    setSelectedCategories((prev) => ({
                                                        ...prev,
                                                        [index]: e.target.value,
                                                    }));
                                                }}
                                            >
                                                <MenuItem value="">Select Category</MenuItem>
                                                {filteredCategory.map((cat: any) => (
                                                    <MenuItem key={cat._id} value={cat.name}>
                                                        {cat.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                            {errors.items?.[index]?.category?.message && (
                                                <span className="text-red-500 text-xs h-5 mt-1">
                                                    {errors.items?.[index]?.category?.message || ""}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                />

                                {/* Product - Now using separate component */}
                                <ProductDropdown index={index} />

                                {/* Quantity */}
                                <Controller
                                    name={`items.${index}.quantity`}
                                    control={control}
                                    render={({ field }) => (
                                        <div className="flex flex-col w-40">
                                            <TextField
                                                {...field}
                                                label="Qty"
                                                fullWidth
                                                size="small"
                                                type="number"
                                                error={!!errors.items?.[index]?.quantity}
                                                InputLabelProps={{ shrink: true }}
                                            />
                                            {errors.items?.[index]?.quantity?.message && (
                                                <span className="text-red-500 text-xs h-5 mt-1">
                                                    {errors.items?.[index]?.quantity?.message || ""}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                />

                                {/* Price */}
                                <Controller
                                    name={`items.${index}.price`}
                                    control={control}
                                    render={({ field }) => (
                                        <div className="flex flex-col w-40">
                                            <TextField
                                                {...field}
                                                label="Price"
                                                fullWidth
                                                size="small"
                                                type="number"
                                                error={!!errors.items?.[index]?.price}
                                                InputLabelProps={{ shrink: true }}
                                            />
                                            {errors.items?.[index]?.price?.message && (
                                                <span className="text-red-500 text-xs h-5 mt-1">
                                                    {errors.items?.[index]?.price?.message || ""}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                />

                                {/* Remove Button */}
                                {fields.length > 1 && (
                                    <div className="flex flex-col justify-start mt-1">
                                        <Button
                                            color="error"
                                            size="small"
                                            onClick={() => {
                                                remove(index);
                                                // Clean up selected category for this index
                                                setSelectedCategories((prev) => {
                                                    const newCategories = { ...prev };
                                                    delete newCategories[index];
                                                    return newCategories;
                                                });
                                            }}
                                            variant="outlined"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
