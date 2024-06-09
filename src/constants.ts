// import { RJSFSchema } from "./interface/JsonSchemaBuilder";
import { JsonSchema } from "./interface/JsonSchemaBuilder";
import { JsonSchemaType } from "./types";
import { RJSFSchema } from "@rjsf/utils";

const fieldName: RJSFSchema = {
  type: "string",
  title: "Field Name",
};

const fieldType: RJSFSchema = {
  type: "string",
  title: "Field Type",
  enum: ["string", "number", "integer", "object", "array", "boolean"],
  enumNames: ["String", "Number", "Integer", "Object", "Array", "Boolean"],
};

const isRequired: RJSFSchema = {
  type: "boolean",
  title: "Required",
};

const getTypeSpecificFields = (
  type: JsonSchemaType
): Record<string, JsonSchema> => {
  // TODO fix type
  switch (type) {
    case "string":
      return {
        maxLength: {
          type: "integer",
          title: "Max Length",
        },
        minLength: {
          type: "integer",
          title: "Min Length",
        },
        pattern: {
          type: "string",
          title: "RegEx Pattern",
        },
        format: {
          type: "string",
          title: "Format",
          enum: [
            "date-time",
            "time",
            "date",
            "duration",
            "email",
            "idn-email",
            "hostname",
            "idn-hostname",
            "ipv4",
            "ipv6",
            "uuid",
            "uri",
            "uri-reference",
            "iri",
            "iri-reference",
            "uri-template",
            "json-pointer",
            "relative-json-pointer",
            "regex",
          ], // TODO: fix
        },
      };
    case "number":
      return {
        multipleOf: {
          type: "number",
          title: "Multiple Of",
        },
        maximum: {
          type: "number",
          title: "Maximum",
        },
        minimum: {
          type: "number",
          title: "Minimum",
        },
        exclusiveMaximum: {
          type: "number",
          title: "Exclusive Maximum",
        },
        exclusiveMinimum: {
          type: "number",
          title: "Exclusive Minimum",
        },
      };
    case "boolean":
      return {};
    case "object":
      return {
        properties: {
            type: 'object',
            title: 'Properties'
        },
        patternProperties: {
            type: 'object',
            title: 'Pattern Properties'    
        },
        additionalProperties: {
            type: 'object',
            title: 'Additional Properties',
        }
      };
    case "integer":
      return {

      };
    case "array":
      return {
        items: {},
      };
    default:
      return {};
  }
};

const dependencies: RJSFSchema["dependencies"] = {
  fieldType: {
    oneOf: fieldType.enum.map((type: JsonSchemaType) => ({
      properties: {
        fieldType: { enum: [type] },
        ...getTypeSpecificFields(type),
      },
    })),
  },
};

export const propertySchema: RJSFSchema = {
  type: "object",
  title: "Add Property",
  properties: {
    fieldName,
    fieldType,
    isRequired,
  },
  dependencies,
};
