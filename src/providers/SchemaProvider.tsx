import React, { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';
import { JsonSchemaBuilder } from '../builder/JsonSchemaBuilder';
import type { FieldConfig, JsonSchema, SchemaAction, TemplateType } from '../types';
import { PROPERTIES } from '../constants';
import type { RJSFSchema } from '@rjsf/utils';

export const SchemaContext = createContext<{
  schema: JsonSchema;
  dispatch: Dispatch<SchemaAction>;
  fields: FieldConfig[];
  templates: TemplateType[];
}>({
  schema: new JsonSchemaBuilder().setType('object').build(),
  dispatch: () => null,
  fields: [],
  templates: [],
});

const schemaReducer = (state: JsonSchema, action: SchemaAction): JsonSchema => {
  const builder = new JsonSchemaBuilder(state);

  switch (action.type) {
    case 'ADD_PROPERTY':
      builder.addNestedProperty(action.payload.name, action.payload.schema!);
      break;
    case 'UPDATE_PROPERTY':
      builder.editProperty(action.payload.name, action.payload.schema!);
      break;
    case 'DELETE_PROPERTY':
      builder.deleteProperty(action.payload.name);
      break;
    case 'ADD_REQUIRED':
      builder.addRequired(action.payload.name);
      break;
    case 'DELETE_REQUIRED':
      builder.deleteRequired(action.payload.name);
      break;
    default:
      return state;
  }

  return builder.build();
};

type Props = {
  children: ReactNode;
  value?: RJSFSchema;
  templates?: TemplateType[];
  extraFields?: FieldConfig[];
};

export const SchemaProvider = ({ children, extraFields = [], value, templates = [] }: Props) => {
  const [schema, dispatch] = useReducer(schemaReducer, value || new JsonSchemaBuilder().setType('object').build());

  return (
    <SchemaContext.Provider value={{ schema, dispatch, fields: [...PROPERTIES, ...extraFields], templates: templates }}>
      {children}
    </SchemaContext.Provider>
  );
};

export const useSchema = () => useContext(SchemaContext);
