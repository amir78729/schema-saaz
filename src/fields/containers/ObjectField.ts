import { JsonSchemaField } from '../JsonSchemaField';
import { produce } from 'immer';
import { JsonSchema, SchemaAnnotation } from '../../types';
import { SCHEMA_TYPE } from '../../constants';

export type ObjectFieldType = SchemaAnnotation & {
  properties?: Record<string, JsonSchema>;
  required?: string[];
  patternProperties?: object; // TODO: fix type
  additionalProperties?: object; // TODO: fix type
};

export class ObjectField extends JsonSchemaField {
  protected properties?: JsonSchema;
  protected required?: string[];
  protected patternProperties?: object;
  protected additionalProperties?: object;

  constructor(name: string) {
    super(name);
    this.type = SCHEMA_TYPE.OBJECT;
  }

  addProperty(name: string, propSchema: JsonSchema): this {
    if (!this.properties) {
      this.properties = {};
    }
    this.properties[name] = propSchema;
    return this;
  }

  addRequired(...args: string[]): this {
    if (!this.required) {
      this.required = [];
    }
    this.required.push(...args);
    return this;
  }

  setPatternProperties(patternProperties: object): this {
    this.patternProperties = patternProperties;
    return this;
  }

  setAdditionalProperties(additionalProperties: object): this {
    this.additionalProperties = additionalProperties;
    return this;
  }

  setSchema(schema: ObjectFieldType) {
    super.setSchema(schema);
    Object.keys(schema.properties || {}).forEach((property) => {
      if (schema.properties) this.addProperty(property, schema.properties[property]);
    });
    if (schema.required) this.addRequired(...schema.required);
    if (schema.patternProperties) this.setPatternProperties(schema.patternProperties);
    if (schema.additionalProperties) this.setAdditionalProperties(schema.additionalProperties);
  }

  getBuilderSchema(): JsonSchema {
    const objectSchema: Record<string, JsonSchema> = {
      properties: {
        type: SCHEMA_TYPE.OBJECT,
        title: 'Properties',
      },
      patternProperties: {
        type: SCHEMA_TYPE.OBJECT,
        title: 'Pattern Properties',
      },
      additionalProperties: {
        type: SCHEMA_TYPE.OBJECT,
        title: 'Additional Properties',
      },
    };
    return produce(super.getBuilderSchema(), (draft: JsonSchema) => {
      Object.keys(objectSchema).forEach((key) => {
        if (draft.properties) draft.properties[key] = objectSchema[key];
      });
    });
  }
}
