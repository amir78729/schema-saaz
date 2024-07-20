import { StringField, StringFieldType } from './fields/primitives/StringField';
import { NumberField, NumberFieldType } from './fields/primitives/NumberField';
import { ObjectField, ObjectFieldType } from './fields/containers/ObjectField';
import { ArrayField, ArrayFieldType } from './fields/containers/ArrayField';
import { IntegerField, IntegerFieldType } from './fields/primitives/IntegerField';
import { BooleanField, BooleanFieldType } from './fields/primitives/BooleanField';
import { JsonSchemaField } from './fields/JsonSchemaField';
import { RJSFSchema } from '@rjsf/utils';
import { SCHEMA_TYPE } from './constants';

export type BuiltInFormats =
  | 'date-time'
  | 'time'
  | 'date'
  | 'duration'
  | 'email'
  | 'idn-email'
  | 'hostname'
  | 'idn-hostname'
  | 'ipv4'
  | 'ipv6'
  | 'uuid'
  | 'uri'
  | 'uri-reference'
  | 'iri'
  | 'iri-reference'
  | 'uri-template'
  | 'json-pointer'
  | 'relative-json-pointer'
  | 'regex';

// TODO: fix
export type Format = BuiltInFormats | string;

export type JsonSchemaType = (typeof SCHEMA_TYPE)[keyof typeof SCHEMA_TYPE];

export interface SchemaAnnotation {
  type?: JsonSchemaType;
  title?: string;
  description?: string;
  default?: unknown;
  readOnly?: boolean;
  writeOnly?: boolean;
  enum?: string[]; // TODO: Generalize enum values
  enumNames?: string[];
}

export type JsonSchema = SchemaAnnotation &
  StringFieldType &
  NumberFieldType &
  BooleanFieldType &
  ObjectFieldType &
  ArrayFieldType &
  IntegerFieldType;

export type FieldConfig = {
  id: string;
  title: string;
  description: string;
  Class: Partial<JsonSchemaField & StringField & NumberField & BooleanField & ObjectField & ArrayField & IntegerField>;
};

export type DataVisualizationType = {
  schema: RJSFSchema;
  data: unknown;
  name?: string;
  path?: string;
};

export type NestedObject = { [key: string]: unknown };
