import { JsonSchemaBuilder } from '../builder/JsonSchemaBuilder';
import { SCHEMA_TYPE } from '../constants';
import { Format, JsonSchema } from '../types';

describe('JsonSchemaBuilder', () => {
  let builder: JsonSchemaBuilder;

  beforeEach(() => {
    builder = new JsonSchemaBuilder();
  });

  test('should set the title', () => {
    const title = 'Test Schema';
    const schema = builder.setTitle(title).build();
    expect(schema.title).toBe(title);
  });

  test('should set the type', () => {
    const type = SCHEMA_TYPE.STRING;
    const schema = builder.setType(type).build();
    expect(schema.type).toBe(type);
  });

  test('should add a property', () => {
    const propertyName = 'name';
    const propertySchema: JsonSchema = { type: SCHEMA_TYPE.STRING };
    const schema = builder.addProperty(propertyName, propertySchema).build();
    expect(schema.properties).toHaveProperty(propertyName);
    expect(schema.properties?.[propertyName]).toEqual(propertySchema);
  });

  test('should add a nested property', () => {
    const nestedPropertyName = 'properties.address.properties.city';
    const propertySchema: JsonSchema = { type: SCHEMA_TYPE.STRING };
    const schema = builder.addNestedProperty(nestedPropertyName, propertySchema).build();
    expect(schema.properties?.address?.properties?.city).toEqual(propertySchema);
  });

  test('should add required fields', () => {
    const requiredFields = ['name', 'age'];
    const schema = builder.addRequired(...requiredFields).build();
    expect(schema.required).toEqual(requiredFields);
  });

  test('should set the description', () => {
    const description = 'This is a test schema';
    const schema = builder.setDescription(description).build();
    expect(schema.description).toBe(description);
  });

  test('should set items for array type', () => {
    const itemSchema: JsonSchema = { type: SCHEMA_TYPE.STRING };
    const schema = builder.setType(SCHEMA_TYPE.ARRAY).setItems(itemSchema).build();
    expect(schema.items).toEqual(itemSchema);
  });

  test('should set string constraints', () => {
    const maxLength = 50;
    const minLength = 10;
    const pattern = '^[a-zA-Z0-9]*$';
    const schema = builder
      .setType(SCHEMA_TYPE.STRING)
      .setMaxLength(maxLength)
      .setMinLength(minLength)
      .setPattern(pattern)
      .build();
    expect(schema.maxLength).toBe(maxLength);
    expect(schema.minLength).toBe(minLength);
    expect(schema.pattern).toBe(pattern);
  });

  test('should set format', () => {
    const format: Format = 'email';
    const schema = builder.setType(SCHEMA_TYPE.STRING).setFormat(format).build();
    expect(schema.format).toBe(format);
  });

  test('should set numeric constraints', () => {
    const multipleOf = 2;
    const maximum = 100;
    const minimum = 10;
    const exclusiveMaximum = true;
    const exclusiveMinimum = false;
    const schema = builder
      .setType(SCHEMA_TYPE.NUMBER)
      .setMultipleOf(multipleOf)
      .setMaximum(maximum)
      .setMinimum(minimum)
      .setExclusiveMaximum(exclusiveMaximum)
      .setExclusiveMinimum(exclusiveMinimum)
      .build();
    expect(schema.multipleOf).toBe(multipleOf);
    expect(schema.maximum).toBe(maximum);
    expect(schema.minimum).toBe(minimum);
    expect(schema.exclusiveMaximum).toBe(exclusiveMaximum);
    expect(schema.exclusiveMinimum).toBe(exclusiveMinimum);
  });

  test('should set readOnly and writeOnly', () => {
    const schema = builder.setReadOnly(true).setWriteOnly(false).build();
    expect(schema.readOnly).toBe(true);
    expect(schema.writeOnly).toBe(false);
  });

  test('should set content encoding and media type', () => {
    const contentEncoding = 'base64';
    const contentMediaType = 'application/json';
    const schema = builder
      .setType(SCHEMA_TYPE.STRING)
      .setContentEncoding(contentEncoding)
      .setContentMediaType(contentMediaType)
      .build();
    expect(schema.contentEncoding).toBe(contentEncoding);
    expect(schema.contentMediaType).toBe(contentMediaType);
  });

  test('should set enum and enumNames', () => {
    const _enum = ['value1', 'value2'];
    const enumNames = ['Value One', 'Value Two'];
    const schema = builder.setEnum(_enum).setEnumNames(enumNames).build();
    expect(schema.enum).toEqual(_enum);
    expect(schema.enumNames).toEqual(enumNames);
  });

  test('should delete a property', () => {
    const propertySchema: JsonSchema = { type: SCHEMA_TYPE.STRING };
    builder.addProperty('name', propertySchema).addProperty('familyName', propertySchema);
    let schema = builder.build();
    expect(schema.properties).toHaveProperty('name');

    schema = builder.deleteProperty(`properties.name`).build();

    expect(schema.properties).not.toHaveProperty('name');
  });

  test('should delete a required field', () => {
    const requiredField = 'name';
    let schema = builder.addRequired(requiredField).build();
    expect(schema.required).toContain(requiredField);
    schema = builder.deleteRequired(requiredField).build();
    expect(schema.required).not.toContain(requiredField);
  });

  test('should edit a property', () => {
    const propertyName = 'name';
    const initialPropertySchema: JsonSchema = { type: SCHEMA_TYPE.STRING };
    const updatedPropertySchema: JsonSchema = { type: SCHEMA_TYPE.STRING, maxLength: 20 };
    let schema = builder.addProperty(propertyName, initialPropertySchema).build();
    expect(schema.properties?.[propertyName]).toEqual(initialPropertySchema);
    schema = builder.editProperty(`properties.${propertyName}`, updatedPropertySchema).build();
    expect(schema.properties?.[propertyName]).toEqual(updatedPropertySchema);
  });

  test('should build the schema correctly with constructor input', () => {
    const inputSchema: JsonSchema = {
      type: SCHEMA_TYPE.OBJECT,
      title: 'Person',
      properties: {
        name: { type: SCHEMA_TYPE.STRING },
        age: { type: SCHEMA_TYPE.INTEGER },
      },
      required: ['name'],
    };
    const builderWithInput = new JsonSchemaBuilder(inputSchema);
    const schema = builderWithInput.build();
    expect(schema).toEqual(inputSchema);
  });

  test('should add template schema', () => {
    const templateSchema = {
      title: 'FAQ',
      type: 'array',
      items: {
        type: 'object',
        title: 'List of Questions',
        properties: {
          question: {
            title: 'question',
            type: 'string',
          },
          answer: {
            title: 'answer',
            type: 'string',
          },
        },
      },
      uniqueItems: true,
    };
    builder.addProperty('faq', templateSchema);
    const schema = builder.build();
    expect(schema.properties?.faq).toEqual(templateSchema);
  });
});
