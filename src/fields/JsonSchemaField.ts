import type { JsonSchemaType, JsonSchema, SchemaAnnotation } from '../types';
import { SCHEMA_TYPE } from '../constants';

export class JsonSchemaField {
  protected name: string;

  protected isRequired: boolean = false;

  protected type: JsonSchemaType;

  protected title?: string;

  protected description?: string;

  protected default?: unknown;

  protected readOnly?: boolean;

  protected writeOnly?: boolean;

  protected enum?: unknown[];

  protected enumNames?: string[];

  constructor(name: string) {
    this.name = name;
    this.type = 'object';
  }

  public getName(): string {
    return this.name;
  }

  public getIsRequired(): boolean {
    return this.isRequired;
  }

  protected setType(type: JsonSchemaType): JsonSchemaField {
    this.type = type;
    return this;
  }

  private setTitle(title: string): JsonSchemaField {
    this.title = title;
    return this;
  }

  private setDescription(description: string): JsonSchemaField {
    this.description = description;
    return this;
  }

  setEnum(_enum: unknown[]): this {
    this.enum = _enum;
    return this;
  }

  setEnumNames(enumNames: string[]): this {
    this.enumNames = enumNames;
    return this;
  }

  private setDefault(value: unknown): JsonSchemaField {
    this.default = value;
    return this;
  }

  private setReadOnly(readOnly: boolean): JsonSchemaField {
    this.readOnly = readOnly;
    return this;
  }

  private setWriteOnly(writeOnly: boolean): JsonSchemaField {
    this.writeOnly = writeOnly;
    return this;
  }

  private setIsRequired(isRequired: boolean): JsonSchemaField {
    this.isRequired = isRequired;
    return this;
  }

  public setSchema(
    schema: SchemaAnnotation & {
      isRequired?: boolean;
      options?: {
        enum: unknown;
        enumNames: string;
      }[];
    },
  ): void {
    if (schema.type) this.setType(schema.type);
    if (schema.title) this.setTitle(schema.title);
    if (schema.description) this.setDescription(schema.description);
    if (schema.default) this.setDefault(schema.default);
    if (schema.readOnly) this.setReadOnly(schema.readOnly);
    if (schema.writeOnly) this.setWriteOnly(schema.writeOnly);
    if (schema.isRequired) this.setIsRequired(schema.isRequired);

    const options = {
      enum: schema.options?.map((option) => option.enum) || [],
      enumNames: schema.options?.map((option) => option.enumNames) || [],
    };

    if (options.enum?.length > 0) this.setEnum(options.enum);
    if (options.enumNames?.length > 0) this.setEnumNames(options.enumNames);
  }

  public getSchema(): JsonSchema {
    return {
      type: this.type,
      title: this.title,
      description: this.description,
      default: this.default,
      readOnly: this.readOnly,
      writeOnly: this.writeOnly,
      enum: this.enum,
      enumNames: this.enumNames,
    };
  }

  public getBuilderSchema(): JsonSchema {
    return {
      type: SCHEMA_TYPE.OBJECT,
      properties: {
        type: {
          type: SCHEMA_TYPE.STRING,
          title: 'Field type',
          enum: Object.values(SCHEMA_TYPE),
        },
        title: {
          type: SCHEMA_TYPE.STRING,
          title: 'Field Title',
        },
        description: {
          type: SCHEMA_TYPE.STRING,
          title: 'Field Description',
        },
        default: {
          type: SCHEMA_TYPE.STRING,
          title: 'Field Default',
        },
        readOnly: {
          type: SCHEMA_TYPE.BOOLEAN,
          title: 'Field is ReadOnly',
        },
        writeOnly: {
          type: SCHEMA_TYPE.BOOLEAN,
          title: 'Field is WriteOnly',
        },
        isRequired: {
          type: SCHEMA_TYPE.BOOLEAN,
          title: 'Field is required',
        },
        options: {
          type: SCHEMA_TYPE.ARRAY,
          title: 'Options',
          description: 'Here you can add options for the select field',
          items: {
            type: SCHEMA_TYPE.OBJECT,
            properties: {
              enum: {
                type: this.getSchema()?.type || SCHEMA_TYPE.STRING,
                title: 'Value of the option',
                description: 'The value that is going to be in the form',
              },
              enumNames: {
                type: SCHEMA_TYPE.STRING,
                title: 'Title of the option',
                description: 'The title that is going to be shown to user',
              },
            },
            required: ['enum', 'enumNames'],
          },
        },
      },
      required: ['title', 'type'],
    };
  }
}
