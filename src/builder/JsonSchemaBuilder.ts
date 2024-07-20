import { Format, JsonSchema, JsonSchemaType } from '../types';
import { SCHEMA_TYPE } from '../constants';

/**
 * Builder class for constructing JSON Schema objects.
 */
export class JsonSchemaBuilder {
  private schema: JsonSchema = {};

  constructor(schema?: JsonSchema) {
    if (schema) {
      this.setType(schema.type || 'object');
      if (schema.title) this.setTitle(schema.title);
      if (schema.description) this.setDescription(schema.description);
      if (schema.default) this.setDefault(schema.default);
      if (schema.readOnly) this.setReadOnly(schema.readOnly);
      if (schema.writeOnly) this.setWriteOnly(schema.writeOnly);
      if (schema.enum) this.setEnum(schema.enum);
      if (schema.enumNames) this.setEnumNames(schema.enumNames);
      switch (schema.type) {
        case SCHEMA_TYPE.STRING:
          if (schema.maxLength) this.setMaxLength(schema.maxLength);
          if (schema.minLength) this.setMinLength(schema.minLength);
          if (schema.pattern) this.setPattern(schema.pattern);
          if (schema.format) this.setFormat(schema.format);
          if (schema.contentEncoding) this.setContentEncoding(schema.contentEncoding);
          if (schema.contentMediaType) this.setContentMediaType(schema.contentMediaType);
          break;
        case SCHEMA_TYPE.NUMBER:
          if (schema.multipleOf) this.setMultipleOf(schema.multipleOf);
          if (schema.maximum) this.setMaximum(schema.maximum);
          if (schema.minimum) this.setMinimum(schema.minimum);
          if (schema.exclusiveMaximum) this.setExclusiveMaximum(schema.exclusiveMaximum);
          if (schema.exclusiveMinimum) this.setExclusiveMinimum(schema.exclusiveMinimum);
          break;
        case SCHEMA_TYPE.OBJECT:
          if (schema.properties) {
            Object.keys(schema.properties).forEach((key) => {
              if (schema.properties?.[key]) this.addProperty(key, schema.properties[key]);
            });
          }
          if (schema.required) {
            this.addRequired(...schema.required);
          }
          if (schema.patternProperties) this.setPatternProperties(schema.patternProperties);
          if (schema.additionalProperties) this.setAdditionalProperties(schema.additionalProperties);
          break;
        case SCHEMA_TYPE.ARRAY:
          if (schema.items) this.setItems(schema.items);
          if (schema.prefixItems) this.setPrefixItems(schema.prefixItems);
          if (schema.unevaluatedItems) this.setUnevaluatedItems(schema.unevaluatedItems);
          if (schema.maxItems) this.setMaxItems(schema.maxItems);
          if (schema.minItems) this.setMinItems(schema.minItems);
          break;
        default:
          break;
      }
    }
  }

  private deleteNestedPropertyByPath = (obj: JsonSchema, path: string): JsonSchema => {
    const keys = path.split('.');
    const newObject = { ...obj };

    if (keys.length === 0) {
      return newObject;
    }

    let current = newObject;
    const stack = [];

    for (let i = 0; i < keys.length - 1; i++) {
      stack.push(current);
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }

    delete current[keys[keys.length - 1]];

    for (let i = keys.length - 2; i >= 0; i--) {
      const key = keys[i];
      current = stack.pop();
      if (Object.keys(current[key]).length === 0) {
        delete current[key];
      }
    }

    return newObject;
  };

  private updateNestedObjectByPath = (obj: JsonSchema, path: string, value: unknown): JsonSchema => {
    const keys = path.split('.');
    const newObject = { ...obj };

    let current = newObject;
    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        current[key] = value;
      } else {
        current[key] = current[key] ? { ...current[key] } : {};
        current = current[key];
      }
    });

    return newObject;
  };

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
    this.schema = this.updateNestedObjectByPath(this.schema, name, propSchema);
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
    this.schema = this.deleteNestedPropertyByPath(this.schema, name);
    return this;
  }

  deleteRequired(name: string): JsonSchemaBuilder {
    if (this.schema.required) {
      this.schema.required = this.schema.required.filter((req: string) => req !== name);
    }
    return this;
  }

  editProperty(name: string, propSchema: JsonSchema): JsonSchemaBuilder {
    this.schema = this.updateNestedObjectByPath(this.schema, name, propSchema);
    return this;
  }

  build(): JsonSchema {
    return this.schema;
  }
}
