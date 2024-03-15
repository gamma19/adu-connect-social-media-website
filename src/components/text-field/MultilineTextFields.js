import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./MultilineTextFields.css";

export default function MultilineTextFields() {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "20ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-textarea"
          label="Hikayeni paylaş!"
          placeholder="Placeholder"
          multiline
        />
      </div>
    </Box>
  );
}
