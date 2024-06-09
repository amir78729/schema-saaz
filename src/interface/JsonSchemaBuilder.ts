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

  enum?: unknown[];
  enumNames?: string[];
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  format?: Format;

  // number
  multipleOf?: number;
  maximum?: number;
  minimum?: number;
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;

  // object
  properties?: Record<string, JsonSchema>;
  patternProperties?: object; // TODO: fix type
  additionalProperties?: object; // TODO: fix type
  required?: string[];

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

  setMaxLength(maxLength: number): JsonSchemaBuilder {
    this.schema.maxLength = maxLength;
    return this;
  }

  setMinLength(minLength: number): JsonSchemaBuilder {
    this.schema.minLength = minLength;
    return this;
  }

  setPattern(pattern: string): JsonSchemaBuilder {
    this.schema.pattern = pattern;
    return this;
  }

  setFormat(format: Format): JsonSchemaBuilder {
    this.schema.format = format;
    return this;
  }

  setMultiplyOf(multipleOf: number): JsonSchemaBuilder {
    this.schema.multipleOf = multipleOf;
    return this;
  }

  setMaximum(maximum: number): JsonSchemaBuilder {
    this.schema.maximum = maximum;
    return this;
  }
  setMinimum(minimum: number): JsonSchemaBuilder {
    this.schema.minimum = minimum;
    return this;
  }
  setExclusiveMaximum(exclusiveMaximum: number): JsonSchemaBuilder {
    this.schema.exclusiveMaximum = exclusiveMaximum;
    return this;
  }
  setExclusiveMinimum(exclusiveMinimum: number): JsonSchemaBuilder {
    this.schema.exclusiveMinimum = exclusiveMinimum;
    return this;
  }

  setPatternProperties(patternProperties: object): JsonSchemaBuilder {
    this.schema.patternProperties = patternProperties;
    return this;
  }
  setAdditionalProperties(additionalProperties: object): JsonSchemaBuilder {
    this.schema.additionalProperties = additionalProperties;
    return this;
  }

  setUnevaluatedItems(unevaluatedItems: boolean | object): JsonSchemaBuilder {
    this.schema.unevaluatedItems = unevaluatedItems;
    return this;
  }

  setMinItems(minItems: number) {
    this.schema.minItems = minItems;
    return this;
  }

  setDefault(_default: unknown) {
    this.schema.default = _default;
    return this;
  }

  setMaxItems(maxItems: number) {
    this.schema.maxItems = maxItems;
    return this;
  }

  setPrefixItems(prefixItems: object) {
    this.schema.prefixItems = prefixItems;
    return this;
  }
  setReadOnly(readOnly: boolean) {
    this.schema.readOnly = readOnly;
    return this;
  }
  setWriteOnly(writeOnly: boolean) {
    this.schema.writeOnly = writeOnly;
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
