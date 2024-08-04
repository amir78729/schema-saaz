import React, { useState } from 'react';
import { Delete } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, IconButton, Typography } from '@mui/material';
import { useSchema } from '../providers/SchemaProvider';
import type { SchemaAction } from '../types';

type Props = {
  path: string;
};

const DeleteFieldButton = ({ path }: Props) => {
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState<boolean>(false);
  const { dispatch } = useSchema();
  const handleDelete = (dispatch: React.Dispatch<SchemaAction>, name: string) => {
    dispatch({ type: 'DELETE_PROPERTY', payload: { name } });
    dispatch({ type: 'DELETE_REQUIRED', payload: { name } });
  };
  return (
    <>
      <Dialog open={showDeleteConfirmationModal} onClose={() => setShowDeleteConfirmationModal(false)}>
        <DialogContent>
          <Typography>Are you sure you want to delete this field?</Typography>
        </DialogContent>
        <DialogActions>
          <Button fullWidth color="error" onClick={() => setShowDeleteConfirmationModal(false)}>
            Cancel
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={() => {
              handleDelete(dispatch, path);
              setShowDeleteConfirmationModal(false);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <IconButton color="error" onClick={() => setShowDeleteConfirmationModal(true)}>
        <Delete fontSize="small" />
      </IconButton>
    </>
  );
};

export default DeleteFieldButton;
