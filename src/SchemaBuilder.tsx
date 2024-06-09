// SchemaBuilder.tsx

import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import React from "react";
import AddPropertyModal from "./AddPropertyModal";
import { useSchema } from "./SchemaContext";


const SchemaBuilder: React.FC = () => {
  const { dispatch, schema } = useSchema();
  
  return (
    <div>
      <Form schema={schema} validator={validator} />
      <pre>{JSON.stringify(schema, null, 2)}</pre>
      <AddPropertyModal />
    </div>
  );
};

export default SchemaBuilder;
