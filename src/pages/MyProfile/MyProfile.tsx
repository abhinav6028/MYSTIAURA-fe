import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import LayoutContainer from '../../components/layout/LayoutContainer';
import InnerSideBar from '../../components/UI/InnerSideBar';
import { useUserProfile, useUpdateUserProfile } from '../../services/api/users/users';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ----------------- Validation Schema -----------------
const profileSchema = yup.object({
  name: yup.string().required("Name is required"),
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits"), // ✅ same as AddNewAddressModal
});

// ----------------- Type for form -----------------
type ProfileFormValues = yup.InferType<typeof profileSchema>;

export default function MyProfile() {
  const { data, isLoading } = useUserProfile();
  const updateProfile = useUpdateUserProfile();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: "",
      mobile: "",
    },
  });

  // Prefill form when user data is fetched
  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        mobile: data.mobile || "",
        // address: data.address || "",
      });
    }
  }, [data, reset]);

  const onSubmit = (formData: ProfileFormValues) => {
    // Send updated data to backend
    updateProfile.mutate(formData);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <LayoutContainer>
      <div className="p-0 md:p-6 lg:p-6 flex">
        <InnerSideBar />
        <main className="flex items-center justify-center w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full md:w-[70%] p-4"
          >
            {/* Name */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />

            {/* Mobile */}
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mobile"
                  type="tel"
                  fullWidth
                  variant="outlined"
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                />
              )}
            />

            {/* Address */}
            {/* <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address"
                  fullWidth
                  variant="outlined"
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              )}
            /> */}

            {/* Submit Button */}
            <Button type="submit" variant="contained" className="mt-4">
              Update Profile
            </Button>
          </form>
        </main>
      </div>
    </LayoutContainer>
  );
}
