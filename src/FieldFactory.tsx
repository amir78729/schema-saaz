// FieldFactory.tsx
import React from "react";
import StringField from "./fields/StringField";

interface FieldFactoryProps {
  name: string;
  schema: any;
}

const FieldFactory: React.FC<FieldFactoryProps> = ({ name, schema }) => {
  switch (schema?.type) {
    case "string":
      return <StringField name={name} />;
    default:
      return null;
  }
};

export default FieldFactory;
