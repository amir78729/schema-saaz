import { JsonSchemaField } from '../JsonSchemaField';
import { JsonSchema, SchemaAnnotation } from '../../types';
export type NumberFieldType = SchemaAnnotation & {
    multipleOf?: number;
    maximum?: number;
    minimum?: number;
    exclusiveMaximum?: boolean;
    exclusiveMinimum?: boolean;
};
export declare class NumberField extends JsonSchemaField {
    protected multipleOf?: number;
    protected maximum?: number;
    protected minimum?: number;
    protected exclusiveMaximum?: boolean;
    protected exclusiveMinimum?: boolean;
    constructor(name: string);
    setMultipleOf(multipleOf: number): this;
    setMaximum(maximum: number): this;
    setMinimum(minimum: number): this;
    setExclusiveMaximum(exclusiveMaximum: boolean): this;
    setExclusiveMinimum(exclusiveMinimum: boolean): this;
    getBuilderSchema(): JsonSchema;
    getSchema(): JsonSchema;
    setSchema(schema: NumberFieldType): void;
}
