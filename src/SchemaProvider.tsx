// SchemaProvider.tsx

import React, { ReactNode, useReducer } from "react";
import { SchemaContext } from "./SchemaContext";
import type { JsonSchema } from "./interface/JsonSchemaBuilder";
import { JsonSchemaBuilder } from "./interface/JsonSchemaBuilder";

interface SchemaState {
  builder: JsonSchemaBuilder;
}

interface SchemaProviderProps {
  children: ReactNode;
}

interface SchemaAction {
  type: "ADD_PROPERTY" | "UPDATE_PROPERTY" | "ADD_REQUIRED";
  payload: { name: string; schema?: JsonSchema; value?: any };
}

const addSharedProperties = (builder: JsonSchemaBuilder, state: JsonSchema) => {
  builder.setType(state.type || "object");
  if (state.title) builder.setTitle(state.title);
  if (state.description) builder.setDescription(state.description);
  if (state.required) {
    builder.addRequired(...state.required);
  }
};

const addSpecificProperties = (
  builder: JsonSchemaBuilder,
  state: JsonSchema
) => {
  switch (state.type) {
    case "string":
      if (state.maxLength) builder.setMaxLength(state.maxLength);
      if (state.minLength) builder.setMinLength(state.minLength);
      if (state.pattern) builder.setPattern(state.pattern);
      if (state.format) builder.setFormat(state.format);
      break;
    case "number":
        if (state.multipleOf) builder.setMultiplyOf(state.multipleOf)
        if (state.maximum) builder.setMaximum(state.maximum)
        if (state.minimum) builder.setMinimum(state.minimum)
        if (state.exclusiveMaximum) builder.setExclusiveMaximum(state.exclusiveMaximum)
        if (state.exclusiveMinimum) builder.setExclusiveMinimum(state.exclusiveMinimum)
      break;
    case "object":
      if (state.properties) {
        Object.keys(state.properties).forEach((key) => {
          if (state.properties?.[key])
            builder.addProperty(key, state.properties[key]);
        });
      }
      break;
    case "array":
      if (state.items) builder.setItems(state.items);
      break;
    default:
      break;
  }
};

const schemaReducer = (state: JsonSchema, action: SchemaAction): JsonSchema => {
  const builder = new JsonSchemaBuilder();
  addSharedProperties(builder, state);
  addSpecificProperties(builder, state);
  switch (action.type) {
    case "ADD_PROPERTY":
      builder.addProperty(action.payload.name, action.payload.schema!);
      break;
    case "ADD_REQUIRED":
      builder.addRequired(action.payload.name);
      break;
    default:
      return state;
  }

  return builder.build();
};

export const SchemaProvider: React.FC<SchemaProviderProps> = ({ children }) => {
  const [schema, dispatch] = useReducer(
    schemaReducer,
    new JsonSchemaBuilder().setType("object").build()
  );

  return (
    <SchemaContext.Provider value={{ schema, dispatch }}>
      {children}
    </SchemaContext.Provider>
  );
};
