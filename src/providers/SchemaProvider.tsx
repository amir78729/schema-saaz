// SchemaProvider.tsx

import React, {createContext, Dispatch, ReactNode, useContext, useReducer} from "react";
import {JsonSchemaBuilder} from "../builder/JsonSchemaBuilder";
import {FieldConfig, JsonSchema} from "../types";
import {PROPERTIES} from "../constants";


interface SchemaAction {
  type: "ADD_PROPERTY" | "UPDATE_PROPERTY" | "ADD_REQUIRED";
  payload: { name: string; schema?: JsonSchema; value?: any };
}

const addAnnotations = (builder: JsonSchemaBuilder, state: JsonSchema) => {
  builder.setType(state.type || "object");
  if (state.title) builder.setTitle(state.title);
  if (state.description) builder.setDescription(state.description);
  if (state.default) builder.setDefault(state.default);
  if (state.readOnly) builder.setReadOnly(state.readOnly);
  if (state.writeOnly) builder.setWriteOnly(state.writeOnly);
};


interface SchemaAction {
  type: "ADD_PROPERTY" | "UPDATE_PROPERTY" | "ADD_REQUIRED";
  payload: { name: string; schema?: JsonSchema; value?: any };
}

const sampleSchema = {
  "title": "Example Schema",
  "description": "A rich JSON schema example without dependencies and no nested objects.",
  "type": "object",
  "properties": {
    "id": {
      "title": "Identifier",
      "description": "A unique identifier for the item.",
      "type": "string",
      "pattern": "^[a-zA-Z0-9-]+$"
    },
    "name": {
      "title": "Name",
      "description": "The name of the item.",
      "type": "string",
      "minLength": 1
    },
    "price": {
      "title": "Price",
      "description": "The price of the item.",
      "type": "number",
      "minimum": 0
    },
    "tags": {
      "title": "Tags",
      "description": "Tags associated with the item.",
      "type": "array",
      "items": {
        "type": "string"
      },
      "uniqueItems": true
    },
    "length": {
      "title": "Length",
      "description": "The length of the item.",
      "type": "number",
      "minimum": 0
    },
    "width": {
      "title": "Width",
      "description": "The width of the item.",
      "type": "number",
      "minimum": 0
    },
    "height": {
      "title": "Height",
      "description": "The height of the item.",
      "type": "number",
      "minimum": 0
    },
    "latitude": {
      "title": "Latitude",
      "description": "Latitude of the warehouse location.",
      "type": "number",
      "minimum": -90,
      "maximum": 90
    },
    "longitude": {
      "title": "Longitude",
      "description": "Longitude of the warehouse location.",
      "type": "number",
      "minimum": -180,
      "maximum": 180
    },
    "inStock": {
      "title": "In Stock",
      "description": "Indicates if the item is in stock.",
      "type": "boolean"
    }
  },
  "required": ["id", "name", "price"],
  "additionalProperties": false
}

export const SchemaContext = createContext<{
  schema: JsonSchema;
  dispatch: Dispatch<SchemaAction>;
  fields: FieldConfig[];
}>({
  schema: sampleSchema,
  // schema: new JsonSchemaBuilder().setType("object").build(),
  dispatch: () => null,
  fields: []
});

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
      if (state.contentEncoding)
        builder.setContentEncoding(state.contentEncoding);
      if (state.contentMediaType)
        builder.setContentMediaType(state.contentMediaType);
      break;
    case "number":
      if (state.multipleOf) builder.setMultipleOf(state.multipleOf);
      if (state.maximum) builder.setMaximum(state.maximum);
      if (state.minimum) builder.setMinimum(state.minimum);
      if (state.exclusiveMaximum)
        builder.setExclusiveMaximum(state.exclusiveMaximum);
      if (state.exclusiveMinimum)
        builder.setExclusiveMinimum(state.exclusiveMinimum);
      break;
    case "object":
      if (state.properties) {
        Object.keys(state.properties).forEach((key) => {
          if (state.properties?.[key])
            builder.addProperty(key, state.properties[key]);
        });
      }
      if (state.required) {
        builder.addRequired(...state.required);
      }
      if (state.patternProperties)
        builder.setPatternProperties(state.patternProperties);
      if (state.additionalProperties)
        builder.setAdditionalProperties(state.additionalProperties);

      break;
    case "array":
      if (state.items) builder.setItems(state.items);
      if (state.prefixItems) builder.setPrefixItems(state.prefixItems);
      if (state.unevaluatedItems)
        builder.setUnevaluatedItems(state.unevaluatedItems);
      if (state.maxItems) builder.setMaxItems(state.maxItems);
      if (state.minItems) builder.setMinItems(state.minItems);
      break;
    default:
      break;
  }
};

const schemaReducer = (state: JsonSchema, action: SchemaAction): JsonSchema => {
  const builder = new JsonSchemaBuilder();

  addAnnotations(builder, state);

  addSpecificProperties(builder, state);

  if (state.enum) builder.setEnum(state.enum);
  if (state.enumNames) builder.setEnumNames(state.enumNames);
  
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

type Props = {
  extraFields: FieldConfig[];
  children: ReactNode;

}
export const SchemaProvider = ({ children, extraFields }: Props) => {
  const [schema, dispatch] = useReducer(
    schemaReducer,
      sampleSchema
    // new JsonSchemaBuilder().setType("object").build()
  );

  return (
    <SchemaContext.Provider value={{ schema, dispatch, fields: [...PROPERTIES, ...extraFields] }}>
      {children}
    </SchemaContext.Provider>
  );
};

export const useSchema = () => useContext(SchemaContext);
