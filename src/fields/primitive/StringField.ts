import {JsonSchemaField} from "../JsonSchemaField";
import {Format, SchemaAnnotation, JsonSchema} from "../../types";
import {produce} from "immer"

export type StringFieldType = SchemaAnnotation & {
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    format?: Format;
    contentEncoding?: string;
    contentMediaType?: string;
}

export class StringField extends JsonSchemaField {
    protected maxLength?: number;

    protected minLength?: number;

    protected pattern?: string;

    protected format?: Format;

    protected contentEncoding?: string;

    protected contentMediaType?: string;

    constructor(name: string) {
        super(name);
        this.setType('string');
    }

    setMaxLength(maxLength: number): this {
        this.maxLength = maxLength;
        return this;
    }

    setMinLength(minLength: number): this {
        this.minLength = minLength;
        return this;
    }

    setPattern(pattern: string): this {
        this.pattern = pattern;
        return this;
    }

    setFormat(format: Format): this {
        this.format = format;
        return this;
    }

    setContentEncoding(contentEncoding: string): this {
        this.contentEncoding = contentEncoding;
        return this;
    }

    setContentMediaType(contentMediaType: string): this {
        this.contentMediaType = contentMediaType;
        return this;
    }

    getBuilderSchema(): JsonSchema {
        
        const stringSchema: Record<string, JsonSchema> = {
            maxLength: {
                type: "integer",
                title: "Max Length",
            },
            minLength: {
                type: "integer",
                title: "Min Length",
            },
            pattern: {
                type: "string",
                title: "RegEx Pattern",
            },
            format: {
                type: "string",
                title: "Format",
                enum: [
                    "date-time",
                    "time",
                    "date",
                    "duration",
                    "email",
                    "idn-email",
                    "hostname",
                    "idn-hostname",
                    "ipv4",
                    "ipv6",
                    "uuid",
                    "uri",
                    "uri-reference",
                    "iri",
                    "iri-reference",
                    "uri-template",
                    "json-pointer",
                    "relative-json-pointer",
                    "regex",
                ],
            },
        }

        return produce(super.getBuilderSchema(), (draft: JsonSchema) => {
            Object.keys(stringSchema).forEach(key => {
                if (draft.properties) draft.properties[key] = stringSchema[key];
            })
        });
    }

    public setSchema(schema: StringFieldType): void {
        super.setSchema(schema);
        if (schema.maxLength) this.setMaxLength(schema.maxLength)
        if (schema.minLength) this.setMinLength(schema.minLength)
        if (schema.pattern) this.setPattern(schema.pattern)
        if (schema.format) this.setFormat(schema.format)
        if (schema.contentEncoding) this.setContentEncoding(schema.contentEncoding)
        if (schema.contentMediaType) this.setContentMediaType(schema.contentMediaType)
    }

    public getSchema(): JsonSchema {
        return {
           ...super.getSchema(),
            maxLength: this.maxLength,
            minLength: this.minLength,
            pattern: this.pattern,
            format: this.format,
            contentEncoding: this.contentEncoding,
            contentMediaType: this.contentMediaType,
        }
    }
}
  