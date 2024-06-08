import React from 'react';

export interface SchemaBuilderProps {
  message?: string;
}

const SchemaBuilder: React.FC<SchemaBuilderProps> = ({ message = "Hello, World!" }) => {
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default SchemaBuilder;