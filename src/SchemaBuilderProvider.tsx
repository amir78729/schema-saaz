// SchemaBuilderProvider.tsx

import React from "react";
import { SchemaProvider } from "./SchemaProvider";
import SchemaBuilder from "./SchemaBuilder";

const SchemaBuilderProvider: React.FC = () => {
  return (
    <SchemaProvider>
      <SchemaBuilder />
    </SchemaProvider>
  );
};

export default SchemaBuilderProvider;
