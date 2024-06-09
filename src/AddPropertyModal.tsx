import {
  Button,
  Dialog,
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Box,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// import Form from "@rjsf/core";
import Form from "@rjsf/mui";

import validator from "@rjsf/validator-ajv8";
import React from "react";
import { useSchema } from "./SchemaContext";
import { JsonSchema } from "./interface/JsonSchemaBuilder";
import { JsonSchemaType } from "./types";
import { propertySchema } from "./constants";

type AddPropertyFormFields = {
  fieldName: string;
  fieldType: JsonSchemaType;
  isRequired: boolean;
};

const AddPropertyModal = () => {
  const [open, setOpen] = React.useState<boolean>(true);
  const { dispatch, schema } = useSchema();

  const addProperty = (formData: object) => {
    const { fieldName, fieldType, isRequired, ...restProps } =
      formData as AddPropertyFormFields;

    const propertySchema = { type: fieldType, ...restProps } as JsonSchema;

    if (fieldType === "object") {
      propertySchema.properties = {};
    }

    if (fieldType === "array") {
      propertySchema.items = {};
    }

    dispatch({
      type: "ADD_PROPERTY",
      payload: {
        name: fieldName || `new_${fieldType}_field`,
        schema: propertySchema,
      },
    });

    if (isRequired) {
      dispatch({
        type: "ADD_REQUIRED",
        payload: { name: fieldName || `new_${fieldType}_field` },
      });
    }

    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Property</Button>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <Box p={3}>
          <Form
            schema={propertySchema}
            validator={validator}
            onSubmit={({ formData }) => addProperty(formData)}
          />
        </Box>
      </Dialog>
    </>
  );
};

export default AddPropertyModal;
