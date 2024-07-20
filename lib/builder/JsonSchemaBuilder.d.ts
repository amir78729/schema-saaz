import { Format, JsonSchema, JsonSchemaType } from '../types';
/**
 * Builder class for constructing JSON Schema objects.
 */
export declare class JsonSchemaBuilder {
    private schema;
    constructor(schema?: JsonSchema);
    private deleteNestedPropertyByPath;
    private updateNestedObjectByPath;
    setTitle(title: string): JsonSchemaBuilder;
    setType(type: JsonSchemaType): JsonSchemaBuilder;
    addProperty(name: string, propSchema: JsonSchema): JsonSchemaBuilder;
    addNestedProperty(name: string, propSchema: JsonSchema): JsonSchemaBuilder;
    addRequired(...args: string[]): JsonSchemaBuilder;
    setDescription(description: string): JsonSchemaBuilder;
    setItems(itemSchema: JsonSchema | JsonSchema[]): JsonSchemaBuilder;
    setMaxLength(maxLength: number): JsonSchemaBuilder;
    setMinLength(minLength: number): JsonSchemaBuilder;
    setPattern(pattern: string): JsonSchemaBuilder;
    setFormat(format: Format): JsonSchemaBuilder;
    setMultipleOf(multipleOf: number): JsonSchemaBuilder;
    setMaximum(maximum: number): JsonSchemaBuilder;
    setMinimum(minimum: number): JsonSchemaBuilder;
    setExclusiveMaximum(exclusiveMaximum: boolean): JsonSchemaBuilder;
    setExclusiveMinimum(exclusiveMinimum: boolean): JsonSchemaBuilder;
    setPatternProperties(patternProperties: object): JsonSchemaBuilder;
    setAdditionalProperties(additionalProperties: object): JsonSchemaBuilder;
    setUnevaluatedItems(unevaluatedItems: boolean | object): JsonSchemaBuilder;
    setMinItems(minItems: number): JsonSchemaBuilder;
    setDefault(_default: unknown): JsonSchemaBuilder;
    setMaxItems(maxItems: number): JsonSchemaBuilder;
    setPrefixItems(prefixItems: object): JsonSchemaBuilder;
    setReadOnly(readOnly: boolean): JsonSchemaBuilder;
    setWriteOnly(writeOnly: boolean): JsonSchemaBuilder;
    setContentEncoding(contentEncoding: string): JsonSchemaBuilder;
    setContentMediaType(contentMediaType: string): JsonSchemaBuilder;
    setEnum(_enum: unknown[]): JsonSchemaBuilder;
    setEnumNames(enumNames: string[]): JsonSchemaBuilder;
    deleteProperty(name: string): JsonSchemaBuilder;
    deleteRequired(name: string): JsonSchemaBuilder;
    editProperty(name: string, propSchema: JsonSchema): JsonSchemaBuilder;
    build(): JsonSchema;
}
