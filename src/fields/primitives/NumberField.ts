import { JsonSchemaField } from '../JsonSchemaField';
import { JsonSchema, SchemaAnnotation } from '../../types';
import { produce } from 'immer';
import { SCHEMA_TYPE } from '../../constants';

export type NumberFieldType = SchemaAnnotation & {
  multipleOf?: number;
  maximum?: number;
  minimum?: number;
  exclusiveMaximum?: boolean;
  exclusiveMinimum?: boolean;
};

export class NumberField extends JsonSchemaField {
  protected multipleOf?: number;
  protected maximum?: number;
  protected minimum?: number;
  protected exclusiveMaximum?: boolean;
  protected exclusiveMinimum?: boolean;

  constructor(name: string) {
    super(name);
    this.type = SCHEMA_TYPE.NUMBER;
  }

  setMultipleOf(multipleOf: number): this {
    this.multipleOf = multipleOf;
    return this;
  }

  setMaximum(maximum: number): this {
    this.maximum = maximum;
    return this;
  }

  setMinimum(minimum: number): this {
    this.minimum = minimum;
    return this;
  }

  setExclusiveMaximum(exclusiveMaximum: boolean): this {
    this.exclusiveMaximum = exclusiveMaximum;
    return this;
  }

  setExclusiveMinimum(exclusiveMinimum: boolean): this {
    this.exclusiveMinimum = exclusiveMinimum;
    return this;
  }

  getBuilderSchema(): JsonSchema {
    const numberSchema: Record<string, JsonSchema> = {
      multipleOf: {
        type: SCHEMA_TYPE.NUMBER,
        title: 'Multiple Of',
      },
      maximum: {
        type: SCHEMA_TYPE.NUMBER,
        title: 'Maximum',
      },
      minimum: {
        type: SCHEMA_TYPE.NUMBER,
        title: 'Minimum',
      },
      exclusiveMaximum: {
        type: SCHEMA_TYPE.BOOLEAN,
        title: 'Field has exclusive maximum',
      },
      exclusiveMinimum: {
        type: SCHEMA_TYPE.BOOLEAN,
        title: 'Field has exclusive minimum',
      },
    };

    return produce(super.getBuilderSchema(), (draft: JsonSchema) => {
      Object.keys(numberSchema).forEach((key) => {
        if (draft.properties) draft.properties[key] = numberSchema[key];
      });
    });
  }

  public getSchema(): JsonSchema {
    return {
      ...super.getSchema(),
      multipleOf: this.multipleOf,
      maximum: this.maximum,
      minimum: this.minimum,
      exclusiveMaximum: this.exclusiveMaximum,
      exclusiveMinimum: this.exclusiveMinimum,
    };
  }

  public setSchema(schema: NumberFieldType): void {
    super.setSchema(schema);
    if (schema.multipleOf) this.setMultipleOf(schema.multipleOf);
    if (schema.maximum) this.setMaximum(schema.maximum);
    if (schema.minimum) this.setMinimum(schema.minimum);
    if (schema.exclusiveMaximum) this.setExclusiveMaximum(schema.exclusiveMaximum);
    if (schema.exclusiveMinimum) this.setExclusiveMinimum(schema.exclusiveMinimum);
  }
}
