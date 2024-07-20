import { StringField, StringFieldType } from '../primitives/StringField';
import { JsonSchema } from '../../types';
import { produce } from 'immer';
import { SCHEMA_TYPE } from '../../constants';

export type SelectFieldType = StringFieldType & {
  options: {
    enum: string;
    enumNames: string;
  }[];
};

export class SelectField extends StringField {
  protected enum?: string[];

  protected enumNames?: string[];

  constructor(name: string) {
    super(name);
  }

  setEnum(_enum: string[]): this {
    this.enum = _enum;
    return this;
  }

  setEnumNames(enumNames: string[]): this {
    this.enumNames = enumNames;
    return this;
  }

  getBuilderSchema(): JsonSchema {
    const enumSchema: Record<string, JsonSchema> = {
      options: {
        type: SCHEMA_TYPE.ARRAY,
        title: 'Options',
        minItems: 1,
        description: 'Here you can add options for the select field',
        items: {
          type: SCHEMA_TYPE.OBJECT,
          properties: {
            enum: {
              type: SCHEMA_TYPE.STRING,
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
    };

    return produce(super.getBuilderSchema(), (draft: JsonSchema) => {
      Object.keys(enumSchema).forEach((key) => {
        if (draft.properties) draft.properties[key] = enumSchema[key];
      });
    });
  }

  public getSchema(): JsonSchema {
    return {
      ...super.getSchema(),
      enum: this.enum,
      enumNames: this.enumNames,
    };
  }

  public setSchema(schema: SelectFieldType): void {
    super.setSchema(schema);

    const options = {
      enum: schema.options?.map((option) => option.enum) || [],
      enumNames: schema.options?.map((option) => option.enumNames) || [],
    };

    if (options.enum?.length > 0) this.setEnum(options.enum);
    if (options.enumNames?.length > 0) this.setEnumNames(options.enumNames);
  }
}
