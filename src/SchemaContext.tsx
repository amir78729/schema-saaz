// SchemaContext.tsx

import { createContext, Dispatch, useContext } from "react";
import { JsonSchemaBuilder } from "./interface/JsonSchemaBuilder";
import type { JsonSchema } from "./interface/JsonSchemaBuilder";


interface SchemaAction {
  type: "ADD_PROPERTY" | "UPDATE_PROPERTY" | "ADD_REQUIRED";
  payload: { name: string; schema?: JsonSchema; value?: any };
}

export const SchemaContext = createContext<{
  schema: JsonSchema;
  dispatch: Dispatch<SchemaAction>;
}>({
  schema: new JsonSchemaBuilder().setType("object").build(),
  dispatch: () => null,
});

export const useSchema = () => useContext(SchemaContext);
