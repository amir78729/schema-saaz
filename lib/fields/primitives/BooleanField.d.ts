import { JsonSchemaField } from '../JsonSchemaField';
import { SchemaAnnotation } from '../../types';
export type BooleanFieldType = SchemaAnnotation;
export declare class BooleanField extends JsonSchemaField {
    constructor(name: string);
}
