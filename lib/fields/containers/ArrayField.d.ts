import { JsonSchemaField } from '../JsonSchemaField';
import { JsonSchema, JsonSchemaType, SchemaAnnotation } from '../../types';
export type ArrayFieldType = SchemaAnnotation & {
    items?: JsonSchema | JsonSchema[];
    itemsType?: JsonSchemaType;
    prefixItems?: object;
    unevaluatedItems?: boolean | object;
    maxItems?: number;
    minItems?: number;
};
export declare class ArrayField extends JsonSchemaField {
    protected items?: JsonSchema | JsonSchema[];
    protected itemsType?: JsonSchemaType;
    protected maxItems?: number;
    protected minItems?: number;
    protected prefixItems?: object;
    protected unevaluatedItems?: boolean | object;
    constructor(name: string);
    setItems(items: JsonSchema | JsonSchema[]): this;
    setItemsType(itemsType: JsonSchemaType): this;
    setMaxItems(maxItems: number): this;
    setMinItems(minItems: number): this;
    setPrefixItems(prefixItems: object): this;
    setUnevaluatedItems(unevaluatedItems: boolean | object): this;
    setSchema(schema: ArrayFieldType & {
        itemsType?: JsonSchema;
    }): void;
    getBuilderSchema(): JsonSchema;
    getSchema(): JsonSchema;
}
