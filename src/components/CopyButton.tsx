import React, { useState } from 'react';
import { CopyAll } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useSchema } from '../providers/SchemaProvider';

const CopyButton = () => {
  const { schema } = useSchema();
  const [buttonText, setButtonText] = useState('Copy');
  const handleCopy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(schema));
    setButtonText('Copied!');
    setTimeout(() => setButtonText('Copy'), 2000);
  };
  return (
    <Button onClick={() => handleCopy()} startIcon={<CopyAll />}>
      {buttonText}
    </Button>
  );
};

export default CopyButton;
