import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import EditFieldButton from './EditFieldButton';
import DeleteFieldButton from './DeleteFieldButton';
import FieldPreview from './FieldPreview';
import { Visibility } from '@mui/icons-material';
import { JsonSchemaField } from '../fields/JsonSchemaField';
import { JsonSchema } from '../types';
type Props = {
  field?: JsonSchemaField;
  schema: JsonSchema;
  path: string;
};
const PreviewFieldButton = ({ field, schema, path }: Props) => {
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);

  return (
    <>
      <IconButton color="info" onClick={() => setShowPreviewModal(true)}>
        <Visibility fontSize="small" />
      </IconButton>
      <Dialog open={showPreviewModal} onClose={() => setShowPreviewModal(false)}>
        <DialogTitle>
          <code>{field?.getName() || '-'}</code> Field{' '}
          {field && (
            <span>
              <EditFieldButton field={field} schema={schema} path={path} />
            </span>
          )}
          {field && (
            <span>
              <DeleteFieldButton path={path} />
            </span>
          )}
        </DialogTitle>
        <DialogContent>
          <FieldPreview name={field?.getName() || ''} schema={field?.getBuilderSchema()} data={schema} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PreviewFieldButton;
