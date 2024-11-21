import { Button, Typography } from "@mui/material";

const SubmitButton = ({ text, isLoading = false }) => {
  return (
    <>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={isLoading}
        sx={{ mt: 3, mb: 2, minHeight: "48px", padding: "12px" }}
      >
        <Typography variant="button">
          {isLoading ? "Iniciando sesion..." : text}
        </Typography>
      </Button>
    </>
  );
};

export default SubmitButton;
