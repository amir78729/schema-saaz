import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { Edit } from '@mui/icons-material';
import { SchemaAction, useSchema } from '../providers/SchemaProvider';
import { RJSFSchema } from '@rjsf/utils';
import { JsonSchemaField } from '../fields/JsonSchemaField';
import { JsonSchema } from '../types';

type Props = {
  field?: JsonSchemaField;
  schema: JsonSchema;
  path: string;
};

const EditFieldButton = ({ field, schema, path }: Props) => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const handleEdit = (dispatch: React.Dispatch<SchemaAction>, name: string, schema: RJSFSchema) => {
    dispatch({ type: 'UPDATE_PROPERTY', payload: { name, schema } });
  };
  const { dispatch } = useSchema();

  return (
    <>
      <Dialog open={showEditModal} onClose={() => setShowEditModal(false)}>
        <DialogTitle>
          Edit <code>{field?.getName() || '-'}</code> Field
        </DialogTitle>
        <DialogContent>
          <Form
            onSubmit={({ formData }) => {
              handleEdit(dispatch, path, formData);
              setShowEditModal(false);
            }}
            schema={field?.getBuilderSchema()}
            formData={schema}
            validator={validator}
          />
        </DialogContent>
      </Dialog>
      <IconButton color="warning" onClick={() => setShowEditModal(true)}>
        <Edit fontSize="small" />
      </IconButton>
    </>
  );
};

export default EditFieldButton;
