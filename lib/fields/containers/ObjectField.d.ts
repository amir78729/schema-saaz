import { JsonSchemaField } from '../JsonSchemaField';
import { JsonSchema, SchemaAnnotation } from '../../types';
export type ObjectFieldType = SchemaAnnotation & {
    properties?: Record<string, JsonSchema>;
    required?: string[];
    patternProperties?: object;
    additionalProperties?: object;
};
export declare class ObjectField extends JsonSchemaField {
    protected properties?: Record<string, JsonSchema>;
    protected required?: string[];
    protected patternProperties?: object;
    protected additionalProperties?: object;
    constructor(name: string);
    addProperty(name: string, propSchema: JsonSchema): this;
    addRequired(...args: string[]): this;
    setPatternProperties(patternProperties: object): this;
    setAdditionalProperties(additionalProperties: object): this;
    setSchema(schema: ObjectFieldType): void;
    getBuilderSchema(): JsonSchema;
}
