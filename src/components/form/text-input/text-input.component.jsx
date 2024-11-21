import { TextField } from "@mui/material";
import { useField } from "formik";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label={label}
        {...field}
        {...props}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
      />
    </>
  );
};

export default TextInput;
