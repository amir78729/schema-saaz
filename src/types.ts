import {StringFieldType} from "./fields/primitive/StringField";
import {NumberFieldType} from "./fields/primitive/NumberField";
import {ObjectFieldType} from "./fields/container/ObjectField";
import {ArrayFieldType} from "./fields/container/ArrayField";
import {IntegerFieldType} from "./fields/primitive/IntegerField";
import {BooleanFieldType} from "./fields/primitive/BooleanField";
import {JsonSchemaField} from "./fields/JsonSchemaField";

export type BuiltInFormats =
    | "date-time"
    | "time"
    | "date"
    | "duration"
    | "email"
    | "idn-email"
    | "hostname"
    | "idn-hostname"
    | "ipv4"
    | "ipv6"
    | "uuid"
    | "uri"
    | "uri-reference"
    | "iri"
    | "iri-reference"
    | "uri-template"
    | "json-pointer"
    | "relative-json-pointer"
    | "regex";

// TODO: fix
export type Format = BuiltInFormats | string;


export type JsonSchemaType =
    | "string"
    | "number"
    | "integer"
    | "object"
    | "array"
    | "boolean";


export interface SchemaAnnotation {
    type?: JsonSchemaType;
    title?: string;
    description?: string;
    default?: unknown;
    readOnly?: boolean;
    writeOnly?: boolean;
    enum?: unknown[];
    enumNames?: string[];
}

export type JsonSchema =
    SchemaAnnotation
    & StringFieldType
    & NumberFieldType
    & BooleanFieldType
    & ObjectFieldType
    & ArrayFieldType
    & IntegerFieldType

export type FieldConfig = {
    id: string;
    title: string;
    description: string;
    Class: JsonSchemaField;
}