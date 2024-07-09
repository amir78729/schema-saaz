import { JsonSchemaField } from '../JsonSchemaField';
import { SchemaAnnotation } from '../../types';

export type IntegerFieldType = SchemaAnnotation;

export class IntegerField extends JsonSchemaField {
  constructor(name: string) {
    super(name);
    this.type = 'integer';
  }
}
