import {JsonSchemaType, JsonSchema, SchemaAnnotation} from "../types";

export class JsonSchemaField {
    protected name: string;

    protected isRequired: boolean = false;

    protected type: JsonSchemaType;

    protected title?: string;

    protected description?: string;

    protected default?: unknown;

    protected readOnly?: boolean;

    protected writeOnly?: boolean;

    protected enum?: string[];

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

    setEnum(_enum: string[]): this {
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

    public setSchema(schema: SchemaAnnotation & {
        isRequired?: boolean, options: {
            enum: string;
            enumNames: string;
        }[]
    }): void {
        if (schema.type) this.setType(schema.type)
        if (schema.title) this.setTitle(schema.title)
        if (schema.description) this.setDescription(schema.description)
        if (schema.default) this.setDefault(schema.default)
        if (schema.readOnly) this.setReadOnly(schema.readOnly)
        if (schema.writeOnly) this.setWriteOnly(schema.writeOnly)
        if (schema.isRequired) this.setIsRequired(schema.isRequired)

        const options = {
            enum: schema.options?.map((option) => option.enum) || [],
            enumNames: schema.options?.map((option) => option.enumNames) || [],
        }

        if (options.enum?.length > 0) this.setEnum(options.enum)
        if (options.enumNames?.length > 0) this.setEnumNames(options.enumNames)
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
            enumNames: this.enumNames
        };

    }

    public getBuilderSchema(): JsonSchema {
        return {
            type: 'object',
            properties: {
                type: {
                    type: 'string',
                    title: 'Field type',
                    enum: ['string', 'number', 'boolean', 'integer', 'array', 'object']
                },
                title: {
                    type: 'string',
                    title: 'Field Title'
                },
                description: {
                    type: 'string',
                    title: 'Field Description'
                },
                default: {
                    type: 'string',
                    title: 'Field Default'
                },
                readOnly: {
                    type: 'boolean',
                    title: 'Field is ReadOnly'
                },
                writeOnly: {
                    type: 'boolean',
                    title: 'Field is WriteOnly'
                },
                isRequired: {
                    type: 'boolean',
                    title: 'Field is required'
                },
                options: {
                    type: "array",
                    title: "Options",
                    description: "Here you can add options for the select field",
                    items: {
                        type: "object",
                        properties: {
                            enum: {
                                type: this.getSchema()?.type || 'string',
                                title: "Value of the option",
                                description: "The value that is going to be in the form",
                            },
                            enumNames: {
                                type: "string",
                                title: "Title of the option",
                                description: "The title that is going to be shown to user",
                            },
                        },
                        required: ["enum", "enumNames"],
                    }
                }
            },
            required: ['title', 'type'],
        }
    }
}