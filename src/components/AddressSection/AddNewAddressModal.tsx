import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PRIMARY_COLOUR } from "../../utils";
import { Plus } from "lucide-react";
import { useCreateAddress, useUpdateAddress } from "../../services/api/selectAddress/selectAddress";
import { Country, State, type ICountry, type IState } from "country-state-city";
import { useAppSelector } from "../../store/hooks";


// ----------------- Form Types -----------------
// Raw input from UI (what the user types)
type AddressFormInput = {
  name: string;
  addressLine1: string;
  addressLine2: string | undefined; // required key with possibly undefined
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
};

// Transformed output after Yup resolver (empty string -> undefined)
type AddressFormOutput = {
  _id?: string; // for editing existing address
  name: string;
  addressLine1: string;
  addressLine2?: string; // optional key in output
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
};

// ----------------- Validation Schema -----------------
const schema = yup.object({
  name: yup.string().required("Name is required"),
  addressLine1: yup.string().required("Address Line 1 is required"),
  addressLine2: yup
    .string()
    .optional()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value)), // optional
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  postalCode: yup.string().required("Postal Code is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
}).required();

// ----------------- Component -----------------
const AddNewAddressModal = ({ open, setOpen, selectedData, setAddressList }: {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  selectedData: AddressFormOutput,
  setAddressList: Dispatch<SetStateAction<any[]>>;
}) => {

  const createAddressMutation = useCreateAddress();
  const updateAddressMutation = useUpdateAddress();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);


  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);

  const { handleSubmit, control, formState: { errors }, reset } = useForm<AddressFormInput, any, AddressFormOutput>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      phone: "",
    },
  });

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedData) {
      reset(selectedData); // fill form with selected data
    } else {
      reset(); // clear form
    }
  }, [selectedData, reset]);

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit: SubmitHandler<any> = (data) => {
    // console.log("data", data);
    if (isAuthenticated) {
      if (selectedData) {
        updateAddressMutation.mutate({ ...data, _id: selectedData._id }, {
          onSuccess: () => {
            reset();
            setOpen(false);
          },
        });
      } else {
        createAddressMutation.mutate(data, {
          onSuccess: () => {
            reset();
            setOpen(false);
          },
        });
      }
    } else {


      const existingAddresses = JSON.parse(
        localStorage.getItem("localAdress") || "[]"
      );

      existingAddresses.push(data);

      localStorage.setItem(
        "localAdress",
        JSON.stringify(existingAddresses)
      );
      setAddressList(existingAddresses)
      setOpen(false);
    }

  };



  return (
    <div>
      {/* Trigger Button */}
      <p
        onClick={() => setOpen(true)}
        className="md:px-6 px-4 py-2 border w-fit md:mt-3 mt-2 md:mb-6 mb-1 flex cursor-pointer"
      >
        <Plus strokeWidth={1} /> <span className="ml-1"> ADD NEW ADDRESS</span>
      </p>

      {/* Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { padding: "1rem", width: 500 } }}
      >
        <DialogTitle sx={{ px: 2, py: 1 }} className="flex justify-between items-center">
          Add New Address
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers sx={{ borderTop: 'none !important', paddingTop: 2 }}>
            {/* Name */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  size="small"
                  fullWidth
                  margin="dense"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  variant="outlined"
                  sx={{
                    "& .MuiInputBase-root": {
                      width: { xs: "110%", sm: "100%" }, // wider on xs, normal on sm+
                    },
                    ml: { xs: -1, sm: 0 }, // shift only on small screens
                    "& .MuiOutlinedInput-root": { borderRadius: 0 },
                  }}
                />

              )}
            />

            {/* Address Line 1 */}
            <Controller
              name="addressLine1"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address Line 1"
                  size="small"
                  fullWidth
                  margin="dense"
                  error={!!errors.addressLine1}
                  helperText={errors.addressLine1?.message}
                  variant="outlined"
                  sx={{
                    "& .MuiInputBase-root": {
                      width: { xs: "110%", sm: "100%" }, // wider on xs, normal on sm+
                    },
                    ml: { xs: -1, sm: 0 }, // shift only on small screens
                    "& .MuiOutlinedInput-root": { borderRadius: 0 },
                  }}
                />
              )}
            />

            {/* Address Line 2 */}
            <Controller
              name="addressLine2"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address Line 2 (Optional)"
                  size="small"
                  fullWidth
                  margin="dense"
                  error={!!errors.addressLine2}
                  helperText={errors.addressLine2?.message}
                  variant="outlined"
                  sx={{
                    "& .MuiInputBase-root": {
                      width: { xs: "110%", sm: "100%" }, // wider on xs, normal on sm+
                    },
                    ml: { xs: -1, sm: 0 }, // shift only on small screens
                    "& .MuiOutlinedInput-root": { borderRadius: 0 },
                  }}
                />
              )}
            />

            {/* City */}
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  size="small"
                  fullWidth
                  margin="dense"
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  variant="outlined"
                  sx={{
                    "& .MuiInputBase-root": {
                      width: { xs: "110%", sm: "100%" }, // wider on xs, normal on sm+
                    },
                    ml: { xs: -1, sm: 0 }, // shift only on small screens
                    "& .MuiOutlinedInput-root": { borderRadius: 0 },
                  }}
                />
              )}
            />

            {/* Country */}
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={countries}
                  getOptionLabel={(option) => option.name}
                  value={countries.find((c) => c.name === field.value) || null}
                  onChange={(_, selectedCountry) => {
                    // store country NAME
                    field.onChange(selectedCountry?.name || "");

                    if (selectedCountry) {
                      // load states using ISO Code (CORRECT)
                      const stateList = State.getStatesOfCountry(selectedCountry.isoCode);
                      setStates(stateList);
                    }

                    // reset state
                    reset((prev) => ({ ...prev, state: "" }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      size="small"
                      fullWidth
                      margin="dense"
                      error={!!errors.country}
                      helperText={errors.country?.message}
                      sx={{
                        "& .MuiInputBase-root": {
                          width: { xs: "110%", sm: "100%" },
                        },
                        ml: { xs: -1, sm: 0 },
                        "& .MuiOutlinedInput-root": { borderRadius: 0 },
                      }}
                    />
                  )}
                />
              )}
            />


            {/* State */}
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={states}
                  getOptionLabel={(option) => option.name}
                  value={states.find((s) => s.name === field.value) || null}
                  onChange={(_, selectedState) => {
                    // store state NAME instead of isoCode
                    field.onChange(selectedState?.name || "");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="State"
                      size="small"
                      fullWidth
                      margin="dense"
                      error={!!errors.state}
                      helperText={errors.state?.message}
                      sx={{
                        "& .MuiInputBase-root": {
                          width: { xs: "110%", sm: "100%" },
                        },
                        ml: { xs: -1, sm: 0 },
                        "& .MuiOutlinedInput-root": { borderRadius: 0 },
                      }}
                    />
                  )}
                />
              )}
            />

            {/* Postal Code */}
            <Controller
              name="postalCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Postal Code"
                  size="small"
                  fullWidth
                  margin="dense"
                  error={!!errors.postalCode}
                  helperText={errors.postalCode?.message}
                  variant="outlined"
                  sx={{
                    "& .MuiInputBase-root": {
                      width: { xs: "110%", sm: "100%" }, // wider on xs, normal on sm+
                    },
                    ml: { xs: -1, sm: 0 }, // shift only on small screens
                    "& .MuiOutlinedInput-root": { borderRadius: 0 },
                  }}
                />
              )}
            />

            {/* Phone */}
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Phone"
                  size="small"
                  fullWidth
                  margin="dense"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  variant="outlined"
                  sx={{
                    "& .MuiInputBase-root": {
                      width: { xs: "110%", sm: "100%" }, // wider on xs, normal on sm+
                    },
                    ml: { xs: -1, sm: 0 }, // shift only on small screens
                    "& .MuiOutlinedInput-root": { borderRadius: 0 },
                  }}
                />
              )}
            />

            <DialogActions sx={{ p: 0, my: 1 }}>
              <Button
                type="submit"
                fullWidth
                sx={{
                  bgcolor: PRIMARY_COLOUR,
                  borderRadius: 0,
                  color: "white",
                  fontFamily: "revert",
                  py: 1,
                }}
                className="text-white py-2 normal-case"
                variant="outlined"
              >
                Submit
              </Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default AddNewAddressModal;
