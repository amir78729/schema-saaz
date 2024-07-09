import { JsonSchemaField } from '../JsonSchemaField';
import { SchemaAnnotation } from '../../types';
import { SCHEMA_TYPE } from '../../constants';

export type IntegerFieldType = SchemaAnnotation;

export class IntegerField extends JsonSchemaField {
  constructor(name: string) {
    super(name);
    this.type = SCHEMA_TYPE.INTEGER;
  }
}
