import React from 'react';
import { useSchema } from '../SchemaContext';

interface StringFieldProps {
  name: string;
}

const StringField: React.FC<StringFieldProps> = ({ name }) => {
  const { dispatch } = useSchema();
  
  return (
    <div>
      <label>{name}</label>
      <input
        type="text"
        onChange={(e) => dispatch({ type: 'UPDATE_PROPERTY', payload: { name, value: e.target.value } })}
      />
    </div>
  );
};

export default StringField;