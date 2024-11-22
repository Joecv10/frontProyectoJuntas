// SignIn.jsx
import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Avatar,
  Grid,
  Link as MuiLink,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../form/text-input/text-input.component";
import PasswordInput from "../form/psw-input/psw-input.component";
import CheckboxInput from "../form/check-box/check-box.component";
import SubmitButton from "../form/button/button.component";

const SignIn = () => {
  const [serverError, setServerError] = useState("");
  const [networkError, setNetworkError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validation schema using Yup
  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Ingresa un e-mail valido.")
      .required("Se requiere de un e-mail."),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres de longitud.")
      .required("Se requiere de una contraseña."),
    rememberMe: Yup.boolean(),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    setServerError("");
    setNetworkError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful authentication
        // Store token (consider using more secure storage like HTTP-only cookies)
        localStorage.setItem("token", data.token);
        // Redirect to dashboard or desired page
        navigate("/dashboard");
      } else {
        // Server-side errors
        setServerError(data.message || "La autenticación fallo.");
      }
    } catch (error) {
      // Network or unexpected errors
      setNetworkError("Algo salió mal. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        {/* Display server-side or network errors */}
        {serverError && (
          <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
            {serverError}
          </Alert>
        )}
        {networkError && (
          <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
            {networkError}
          </Alert>
        )}
        <Formik
          initialValues={{
            email: "",
            password: "",
            rememberMe: false,
          }}
          validationSchema={SignInSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form style={{ width: "100%", marginTop: "1rem" }} noValidate>
              <TextInput
                label="E-mail"
                name="email"
                placeholder="Ingresa tu correo"
                required
              />
              <PasswordInput
                label="Contraseña"
                name="password"
                placeholder="Ingresa tu contraseña"
                required
              />
              <CheckboxInput label="Recordarme" name="rememberMe" />
              <SubmitButton
                text="Iniciar Sesión"
                isLoading={isLoading || isSubmitting}
              />
              <Grid container>
                <Grid item xs>
                  <MuiLink href="/forgot-password" variant="body2">
                    Olvidaste de tu contraseña?
                  </MuiLink>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default SignIn;
