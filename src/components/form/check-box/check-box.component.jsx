import { Propane } from "@mui/icons-material";
import { FormControlLabel, Checkbox } from "@mui/material";
import { useField } from "formik";
import { useDebugValue } from "react";

const CheckboxInput = ({ label, ...props }) => {
  const [field] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <FormControlLabel
        control={<Checkbox {...field} color="primary" />}
        label={label}
      />
    </>
  );
};

export default CheckboxInput;
