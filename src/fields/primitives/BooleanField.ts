import { JsonSchemaField } from '../JsonSchemaField';
import { SchemaAnnotation } from '../../types';

export type BooleanFieldType = SchemaAnnotation;

export class BooleanField extends JsonSchemaField {
  constructor(name: string) {
    super(name);
    this.type = 'boolean';
  }
}
