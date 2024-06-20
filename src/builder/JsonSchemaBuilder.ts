import {JsonSchema, JsonSchemaType, Format} from "../types";
import {deleteNestedPropertyByPath, generatePath, updateNestedObjectByPath} from "../utils";


/**
 * Builder class for constructing JSON Schema objects.
 */
export class JsonSchemaBuilder {
  private schema: JsonSchema;

  constructor() {
    this.schema = {};
  }

  setTitle(title: string): JsonSchemaBuilder {
    this.schema.title = title;
    return this;
  }

  setType(type: JsonSchemaType): JsonSchemaBuilder {
    this.schema.type = type;
    return this;
  }

  addProperty(name: string, propSchema: JsonSchema): JsonSchemaBuilder {
    if (!this.schema.properties) {
      this.schema.properties = {};
    }
    this.schema.properties[name] = propSchema;
    return this;
  }
  addNestedProperty(name: string, propSchema: JsonSchema): JsonSchemaBuilder {
    if (!this.schema.properties) {
      this.schema.properties = {};
    }
    this.schema = updateNestedObjectByPath(this.schema, name, propSchema);
    return this;
  }

  addRequired(...args: string[]): JsonSchemaBuilder {
    if (!this.schema.required) {
      this.schema.required = [];
    }
    this.schema.required.push(...args);
    return this;
  }

  setDescription(description: string): JsonSchemaBuilder {
    this.schema.description = description;
    return this;
  }

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

  setMultipleOf(multipleOf: number): JsonSchemaBuilder {
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

  setExclusiveMaximum(exclusiveMaximum: boolean): JsonSchemaBuilder {
    this.schema.exclusiveMaximum = exclusiveMaximum;
    return this;
  }

  setExclusiveMinimum(exclusiveMinimum: boolean): JsonSchemaBuilder {
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

  setMinItems(minItems: number): JsonSchemaBuilder {
    this.schema.minItems = minItems;
    return this;
  }

  setDefault(_default: unknown): JsonSchemaBuilder {
    this.schema.default = _default;
    return this;
  }

  setMaxItems(maxItems: number): JsonSchemaBuilder {
    this.schema.maxItems = maxItems;
    return this;
  }

  setPrefixItems(prefixItems: object): JsonSchemaBuilder {
    this.schema.prefixItems = prefixItems;
    return this;
  }

  setReadOnly(readOnly: boolean): JsonSchemaBuilder {
    this.schema.readOnly = readOnly;
    return this;
  }

  setWriteOnly(writeOnly: boolean): JsonSchemaBuilder {
    this.schema.writeOnly = writeOnly;
    return this;
  }

  setContentEncoding(contentEncoding: string): JsonSchemaBuilder {
    this.schema.contentEncoding = contentEncoding;
    return this;
  }

  setContentMediaType(contentMediaType: string): JsonSchemaBuilder {
    this.schema.contentMediaType = contentMediaType;
    return this;
  }

  setEnum(_enum: unknown[]): JsonSchemaBuilder {
    this.schema.enum = _enum;
    return this;
  }

  setEnumNames(enumNames: string[]): JsonSchemaBuilder {
    this.schema.enumNames = enumNames;
    return this;
  }

  deleteProperty(name: string): JsonSchemaBuilder {
    this.schema = deleteNestedPropertyByPath(this.schema, name)
    return this;
  }

  deleteRequired(name: string): JsonSchemaBuilder {
    if (this.schema.required) {
      this.schema.required = this.schema.required.filter((req: string) => req !== name);
    }
    return this;
  }

  editProperty(name: string, propSchema: JsonSchema): JsonSchemaBuilder {
    this.schema = updateNestedObjectByPath(this.schema, name, propSchema)
    return this;
  }

  build(): JsonSchema {
    return this.schema;
  }
}
