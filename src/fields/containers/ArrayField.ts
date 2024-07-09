import { JsonSchemaField } from '../JsonSchemaField';
import { produce } from 'immer';
import { JsonSchema, JsonSchemaType, SchemaAnnotation } from '../../types';

export type ArrayFieldType = SchemaAnnotation & {
  items?: JsonSchema | JsonSchema[];
  itemsType?: JsonSchemaType;
  prefixItems?: object; // TODO: fix type
  unevaluatedItems?: boolean | object;
  maxItems?: number;
  minItems?: number;
};

export class ArrayField extends JsonSchemaField {
  protected items?: JsonSchema | JsonSchema[];

  protected itemsType?: JsonSchemaType;

  protected maxItems?: number;

  protected minItems?: number;

  protected prefixItems?: object;

  protected unevaluatedItems?: boolean | object;

  constructor(name: string) {
    super(name);
    this.type = 'array';
  }

  setItems(items: JsonSchema | JsonSchema[]): this {
    this.items = items;
    return this;
  }

  setItemsType(itemsType: JsonSchemaType): this {
    this.itemsType = itemsType;
    return this;
  }

  setMaxItems(maxItems: number): this {
    this.maxItems = maxItems;
    return this;
  }

  setMinItems(minItems: number): this {
    this.minItems = minItems;
    return this;
  }

  setPrefixItems(prefixItems: object): this {
    this.prefixItems = prefixItems;
    return this;
  }

  setUnevaluatedItems(unevaluatedItems: boolean | object): this {
    this.unevaluatedItems = unevaluatedItems;
    return this;
  }

  setSchema(schema: ArrayFieldType & { itemsType?: JsonSchema }) {
    super.setSchema(schema as SchemaAnnotation);
    if (schema.itemsType) this.setItemsType(schema.itemsType);
    if (schema.items)
      this.setItems({
        ...schema.items,
        ...(this.itemsType && { type: this.itemsType }),
      });
    if (schema.maxItems) this.setMaxItems(schema.maxItems);
    if (schema.minItems) this.setMinItems(schema.minItems);
    if (schema.prefixItems) this.setPrefixItems(schema.prefixItems);
    if (schema.unevaluatedItems)
      this.setUnevaluatedItems(schema.unevaluatedItems);
  }

  getBuilderSchema(): JsonSchema {
    const arraySchema: Record<string, JsonSchema> = {
      itemsType: {
        title: 'Items Type',
        type: 'string',
        enum: ['string', 'number', 'boolean', 'integer', 'array', 'object'],
      },
      prefixItems: {
        title: 'prefixItems',
        type: 'object',
      },
      unevaluatedItems: {
        title: 'unevaluatedItems',
        type: 'object',
      },
      minItems: {
        title: 'minItems',
        type: 'number',
      },
      maxItems: {
        title: 'maxItems',
        type: 'number',
      },
    };

    return produce(super.getBuilderSchema(), (draft: JsonSchema) => {
      Object.keys(arraySchema).forEach((key) => {
        if (draft.properties) draft.properties[key] = arraySchema[key];
      });
      draft.required = [...(draft.required || []), 'items'];
    });
  }

  public getSchema(): JsonSchema {
    return {
      ...super.getSchema(),
      items: {
        type: this.itemsType,
        ...this.items,
      },
      prefixItems: this.prefixItems,
      unevaluatedItems: this.unevaluatedItems,
      minItems: this.minItems,
      maxItems: this.maxItems,
    };
  }
}
