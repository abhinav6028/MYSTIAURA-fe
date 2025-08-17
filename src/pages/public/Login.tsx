import React, { useState } from "react";
import banner from "../../assets/banner.jpg";
import { Box, Typography, TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Validation Schema
const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

type FormData = yup.InferType<typeof schema>;

const Login: React.FC = () => {

   const [showPassword, setShowPassword] = useState(false);
   
  const {
    handleSubmit,
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // Handle Submit
  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center"
      style={{
        background: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        width="40rem"
        bgcolor="rgba(255, 255, 255, 0.8)"
        p={6}
        borderRadius={2}
        boxShadow={3}
      >
        <Typography variant="h4" mb={3} textAlign="center" fontWeight="bold">
          Login Page
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field} // includes value, onChange, onBlur
                label="Email"
                fullWidth
                margin="normal"
                size="small"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                size="small"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Login;
