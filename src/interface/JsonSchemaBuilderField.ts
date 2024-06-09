import { JsonSchema } from "./JsonSchemaBuilder";

export class JsonSchemaBuilderField {
  private field: JsonSchema;

  constructor() {
    this.field = {};
  }

  setProperty(property: string, value: any) {
    // @ts-expect-error
    this.field[property] = value;
    return this;
  }

  setTitle(title: string) {
    this.setProperty("title", title);
    return this;
  }

  setDescription(description: string) {
    this.setProperty("description", description);
    return this;
  }

  setDefault(value: string) {
    this.setProperty("default", value);
    return this;
  }

  setRequired(required: boolean) {
    this.setProperty("required", required);
    return this;
  }

  getBuilderSchemaProperties() {
    throw new Error("Schema is not implemented");
  }

  // TODO: rename
  build(): JsonSchema {
    return this.field;
  }
}
