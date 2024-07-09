import { JsonSchemaField } from '../JsonSchemaField';
import { SchemaAnnotation } from '../../types';
import { SCHEMA_TYPE } from '../../constants';

export type BooleanFieldType = SchemaAnnotation;

export class BooleanField extends JsonSchemaField {
  constructor(name: string) {
    super(name);
    this.type = SCHEMA_TYPE.BOOLEAN;
  }
}
