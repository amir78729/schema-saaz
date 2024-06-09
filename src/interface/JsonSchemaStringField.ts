import { JsonSchema } from "./JsonSchemaBuilder";
import { JsonSchemaBuilderField } from "./JsonSchemaBuilderField";
import { Format } from "./types";

export class JsonSchemaStringField extends JsonSchemaBuilderField {
  constructor() {
    super();
    this.setProperty("type", "string");
  }
  private static instance: JsonSchemaStringField;
  static getInstance(): JsonSchemaStringField {
    if (!JsonSchemaStringField.instance) {
        JsonSchemaStringField.instance = new JsonSchemaStringField();
    }
    return JsonSchemaStringField.instance;
  }


  setMaxLength(maxLength: number): JsonSchemaStringField {
    this.setProperty("maxLength", maxLength);
    return this;
  }

  setMinLength(minLength: number): JsonSchemaStringField {
    this.setProperty("minLength", minLength);
    return this;
  }

  setPattern(pattern: string): JsonSchemaStringField {
    this.setProperty("pattern", pattern);
    return this;
  }

  setFormat(format: Format): JsonSchemaStringField {
    this.setProperty("format", format);
    return this;
  }

  getBuilderSchemaProperties(): JsonSchema['properties'] {
    return {
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
  }
}
