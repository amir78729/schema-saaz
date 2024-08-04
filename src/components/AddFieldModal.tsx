import { Box, Button, Dialog, FormControl, IconButton, InputLabel, MenuItem, Stack, TextField, Tooltip } from '@mui/material';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import React from 'react';
import { useSchema } from '../providers/SchemaProvider';
import type { JsonSchema } from '../types';
import { JsonSchemaField } from '../fields/JsonSchemaField';
import Select from '@mui/material/Select';
import { Add } from '@mui/icons-material';
import { generatePath } from '../utils';

type Props = {
  parentPath: string;
};

const AddFieldModal = ({ parentPath }: Props) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string | null>(null);
  const [type, setType] = React.useState<string | null>(null);
  const [field, setField] = React.useState<null | JsonSchemaField>(null);
  const { dispatch, fields, templates } = useSchema();
  const [step, setStep] = React.useState<number>(0);

  const handleSelectType = () => {
    const SelectedFieldClass = fields.find((f) => f.id === type)?.Class;
    if (name && type && SelectedFieldClass) {
      setField(new SelectedFieldClass(name));
      setStep(1);
    }

    const SelectedTemplateSchema = templates.find((f) => f.id === type)?.schema;
    if (name && type && SelectedTemplateSchema) {
      dispatch({
        type: 'ADD_PROPERTY',
        payload: {
          name: generatePath(parentPath, name || 'newField'),
          schema: SelectedTemplateSchema,
        },
      });
      dispatch({
        type: 'ADD_REQUIRED',
        payload: {
          name: generatePath(parentPath, name || 'newField'),
        },
      });
      setOpen(false);
      setType(null);
      setName(null);
      setStep(0);
    }
  };

  const handleSubmit = (formData: JsonSchema) => {
    if (field) {
      field.setSchema(formData);
      dispatch({
        type: 'ADD_PROPERTY',
        payload: {
          name: generatePath(parentPath, field.getName() || 'newField'),
          schema: field.getSchema(),
        },
      });
      if (field.getIsRequired()) {
        dispatch({
          type: 'ADD_REQUIRED',
          payload: {
            name: generatePath(parentPath, field.getName() || 'newField'),
          },
        });
      }
      setOpen(false);
      setType(null);
      setName(null);
      setStep(0);
    }
  };

  const handleTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setName(input);
  };

  return (
    <>
      <Tooltip title="Add Property" arrow placement="left">
        <IconButton onClick={() => setOpen(true)}>
          <Add />
        </IconButton>
      </Tooltip>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <Box p={3} key={JSON.stringify(fields)}>
          <h1>
            {step !== 0 && <Button onClick={() => setStep(0)}>back</Button>}
            Adding Field
          </h1>
          {step === 0 && (
            <Stack gap={3}>
              <TextField
                label="Field Name"
                helperText="This name should be a valid JS name, only containing english characters, underline and numbers"
                value={name}
                onChange={handleTitleChanged}
              />

              <FormControl>
                <InputLabel htmlFor="field-type">Field Type</InputLabel>
                <Select defaultValue="" value={type} id="field-type" label="Field Type" onChange={(e) => setType(e.target.value)}>
                  {fields.map((property) => (
                    <MenuItem title={property.description} key={property.id} value={property.id}>
                      {property.title}
                    </MenuItem>
                  ))}
                  {templates?.map((property) => (
                    <MenuItem title={property.description} key={property.id} value={property.id}>
                      {property.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button disabled={!name || !type} variant="contained" onClick={() => handleSelectType()}>
                Continue
              </Button>
            </Stack>
          )}
          {step === 1 && (
            <>
              <p>
                Please complete the info for the <code>name</code> field
              </p>
              {field && (
                <Form
                  formData={field.getSchema()}
                  schema={field.getBuilderSchema()}
                  validator={validator}
                  onSubmit={({ formData }) => handleSubmit(formData)}
                />
              )}
            </>
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default AddFieldModal;
