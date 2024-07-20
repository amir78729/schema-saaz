import { JsonSchemaType, JsonSchema, SchemaAnnotation } from '../types';
export declare class JsonSchemaField {
    protected name: string;
    protected isRequired: boolean;
    protected type: JsonSchemaType;
    protected title?: string;
    protected description?: string;
    protected default?: unknown;
    protected readOnly?: boolean;
    protected writeOnly?: boolean;
    protected enum?: unknown[];
    protected enumNames?: string[];
    constructor(name: string);
    getName(): string;
    getIsRequired(): boolean;
    protected setType(type: JsonSchemaType): JsonSchemaField;
    private setTitle;
    private setDescription;
    setEnum(_enum: unknown[]): this;
    setEnumNames(enumNames: string[]): this;
    private setDefault;
    private setReadOnly;
    private setWriteOnly;
    private setIsRequired;
    setSchema(schema: SchemaAnnotation & {
        isRequired?: boolean;
        options?: {
            enum: unknown;
            enumNames: string;
        }[];
    }): void;
    getSchema(): JsonSchema;
    getBuilderSchema(): JsonSchema;
}
