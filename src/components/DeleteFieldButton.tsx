import React, { useState } from 'react';
import { Delete } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, IconButton, Typography } from '@mui/material';

type Props = {
  onDelete: () => void;
};

const DeleteFieldButton = ({ onDelete }: Props) => {
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState<boolean>(false);

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
              onDelete?.();
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
