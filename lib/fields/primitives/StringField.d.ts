import { JsonSchemaField } from '../JsonSchemaField';
import { Format, SchemaAnnotation, JsonSchema } from '../../types';
export type StringFieldType = SchemaAnnotation & {
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    format?: Format;
    contentEncoding?: string;
    contentMediaType?: string;
};
export declare class StringField extends JsonSchemaField {
    protected maxLength?: number;
    protected minLength?: number;
    protected pattern?: string;
    protected format?: Format;
    protected contentEncoding?: string;
    protected contentMediaType?: string;
    constructor(name: string);
    setMaxLength(maxLength: number): this;
    setMinLength(minLength: number): this;
    setPattern(pattern: string): this;
    setFormat(format: Format): this;
    setContentEncoding(contentEncoding: string): this;
    setContentMediaType(contentMediaType: string): this;
    getBuilderSchema(): JsonSchema;
    setSchema(schema: StringFieldType): void;
    getSchema(): JsonSchema;
}
