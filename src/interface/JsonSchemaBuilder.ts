import { JsonSchemaType } from "../types";
import { BuiltInFormats, Format } from "./types";

export interface JsonSchema {
  // TODO: categorize
  type?: JsonSchemaType;

  // annotation
  title?: string;
  description?: string;
  default?: unknown;
  readOnly?: boolean;
  writeOnly?: boolean;

  // enumerated values
  enum?: unknown[];
  enumNames?: string[];

  // string
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  format?: Format;
  contentEncoding?: string;
  contentMediaType?: string;

  // number
  multipleOf?: number;
  maximum?: number;
  minimum?: number;
  exclusiveMaximum?: boolean;
  exclusiveMinimum?: boolean;

  // object
  properties?: Record<string, JsonSchema>;
  required?: string[];
  patternProperties?: object; // TODO: fix type
  additionalProperties?: object; // TODO: fix type

  // array
  items?: JsonSchema | JsonSchema[];
  prefixItems?: object; // TODO: fix type
  unevaluatedItems?: boolean | object;
  maxItems?: number;
  minItems?: number;
}

/**
 * Builder class for constructing JSON Schema objects.
 */
export class JsonSchemaBuilder {
  private schema: JsonSchema;

  constructor() {
    this.schema = {};
  }

  /**
   * Sets the title of the schema.
   * @param {string} title - The title of the schema.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setTitle(title: string): JsonSchemaBuilder {
    this.schema.title = title;
    return this;
  }

  /**
   * Sets the type of the schema.
   * @param {string} type - The type of the schema.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setType(type: JsonSchemaType): JsonSchemaBuilder {
    this.schema.type = type;
    return this;
  }

  /**
   * Adds a property to the schema.
   * @param {string} name - The name of the property.
   * @param {JsonSchema} propSchema - The schema of the property.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  addProperty(name: string, propSchema: JsonSchema): JsonSchemaBuilder {
    if (!this.schema.properties) {
      this.schema.properties = {};
    }
    this.schema.properties[name] = propSchema;
    return this;
  }

  /**
   * Adds required properties to the schema.
   * @param {...string[]} args - The names of the required properties.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  addRequired(...args: string[]): JsonSchemaBuilder {
    if (!this.schema.required) {
      this.schema.required = [];
    }
    this.schema.required.push(...args);
    return this;
  }

  /**
   * Sets the description of the schema.
   * @param {string} description - The description of the schema.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setDescription(description: string): JsonSchemaBuilder {
    this.schema.description = description;
    return this;
  }

  /**
   * Sets the items schema for an array type.
   * @param {JsonSchema | JsonSchema[]} itemSchema - The schema or schemas for the array items.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setItems(itemSchema: JsonSchema | JsonSchema[]): JsonSchemaBuilder {
    this.schema.items = itemSchema;
    return this;
  }

  /**
   * Sets the maximum length of a string.
   * @param {number} maxLength - The maximum length.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setMaxLength(maxLength: number): JsonSchemaBuilder {
    this.schema.maxLength = maxLength;
    return this;
  }

  /**
   * Sets the minimum length of a string.
   * @param {number} minLength - The minimum length.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setMinLength(minLength: number): JsonSchemaBuilder {
    this.schema.minLength = minLength;
    return this;
  }

  /**
   * Sets the pattern of a string.
   * @param {string} pattern - The pattern.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setPattern(pattern: string): JsonSchemaBuilder {
    this.schema.pattern = pattern;
    return this;
  }

  /**
   * Sets the format of a string.
   * @param {Format} format - The format.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setFormat(format: Format): JsonSchemaBuilder {
    this.schema.format = format;
    return this;
  }

  /**
   * Sets the multiple of a number.
   * @param {number} multipleOf - The multiple of value.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setMultipleOf(multipleOf: number): JsonSchemaBuilder {
    this.schema.multipleOf = multipleOf;
    return this;
  }

  /**
   * Sets the maximum value of a number.
   * @param {number} maximum - The maximum value.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setMaximum(maximum: number): JsonSchemaBuilder {
    this.schema.maximum = maximum;
    return this;
  }

  /**
   * Sets the minimum value of a number.
   * @param {number} minimum - The minimum value.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setMinimum(minimum: number): JsonSchemaBuilder {
    this.schema.minimum = minimum;
    return this;
  }

  /**
   * Sets the exclusive maximum flag for a number.
   * @param {boolean} exclusiveMaximum - The exclusive maximum flag.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setExclusiveMaximum(exclusiveMaximum: boolean): JsonSchemaBuilder {
    this.schema.exclusiveMaximum = exclusiveMaximum;
    return this;
  }

  /**
   * Sets the exclusive minimum flag for a number.
   * @param {boolean} exclusiveMinimum - The exclusive minimum flag.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setExclusiveMinimum(exclusiveMinimum: boolean): JsonSchemaBuilder {
    this.schema.exclusiveMinimum = exclusiveMinimum;
    return this;
  }

  /**
   * Sets the pattern properties for an object.
   * @param {object} patternProperties - The pattern properties.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setPatternProperties(patternProperties: object): JsonSchemaBuilder {
    this.schema.patternProperties = patternProperties;
    return this;
  }

  /**
   * Sets the additional properties for an object.
   * @param {object} additionalProperties - The additional properties.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setAdditionalProperties(additionalProperties: object): JsonSchemaBuilder {
    this.schema.additionalProperties = additionalProperties;
    return this;
  }

  /**
   * Sets the unevaluated items for an array.
   * @param {boolean | object} unevaluatedItems - The unevaluated items.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setUnevaluatedItems(unevaluatedItems: boolean | object): JsonSchemaBuilder {
    this.schema.unevaluatedItems = unevaluatedItems;
    return this;
  }

  /**
   * Sets the minimum number of items in an array.
   * @param {number} minItems - The minimum number of items.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setMinItems(minItems: number): JsonSchemaBuilder {
    this.schema.minItems = minItems;
    return this;
  }

  /**
   * Sets the default value of the schema.
   * @param {unknown} _default - The default value.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setDefault(_default: unknown): JsonSchemaBuilder {
    this.schema.default = _default;
    return this;
  }

  /**
   * Sets the maximum number of items in an array.
   * @param {number} maxItems - The maximum number of items.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setMaxItems(maxItems: number): JsonSchemaBuilder {
    this.schema.maxItems = maxItems;
    return this;
  }

  /**
   * Sets the prefix items for an array.
   * @param {object} prefixItems - The prefix items.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setPrefixItems(prefixItems: object): JsonSchemaBuilder {
    this.schema.prefixItems = prefixItems;
    return this;
  }

  /**
   * Sets the read-only flag for the schema.
   * @param {boolean} readOnly - The read-only flag.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setReadOnly(readOnly: boolean): JsonSchemaBuilder {
    this.schema.readOnly = readOnly;
    return this;
  }

  /**
   * Sets the write-only flag for the schema.
   * @param {boolean} writeOnly - The write-only flag.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setWriteOnly(writeOnly: boolean): JsonSchemaBuilder {
    this.schema.writeOnly = writeOnly;
    return this;
  }

  /**
   * Sets the content encoding for a string.
   * @param {string} contentEncoding - The content encoding.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setContentEncoding(contentEncoding: string): JsonSchemaBuilder {
    this.schema.contentEncoding = contentEncoding;
    return this;
  }

  /**
   * Sets the content media type for a string.
   * @param {string} contentMediaType - The content media type.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setContentMediaType(contentMediaType: string): JsonSchemaBuilder {
    this.schema.contentMediaType = contentMediaType;
    return this;
  }

  /**
   * Sets the enumeration values for the schema.
   * @param {unknown[]} _enum - The enumeration values.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setEnum(_enum: unknown[]): JsonSchemaBuilder {
    this.schema.enum = _enum;
    return this;
  }

  /**
   * Sets the enumeration names for the schema.
   * @param {string[]} enumNames - The enumeration names.
   * @returns {JsonSchemaBuilder} The builder instance.
   */
  setEnumNames(enumNames: string[]): JsonSchemaBuilder {
    this.schema.enumNames = enumNames;
    return this;
  }

  /**
   * Builds and returns the JSON Schema.
   * @returns {JsonSchema} The constructed JSON Schema.
   */
  build(): JsonSchema {
    return this.schema;
  }
}
