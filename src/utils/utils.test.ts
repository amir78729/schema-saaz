import { accessToObjectFieldByPath, accessToObjectFieldParentByPath } from './index'; // Adjust the import to match your file structure

describe('accessToObjectFieldByPath', () => {
  const testObject = {
    type: 'object',
    title: 'Example Schema',
    description: 'A rich JSON schema example without dependencies and no nested objects.',
    properties: {
      id: {
        title: 'Identifier',
        description: 'A unique identifier for the item.',
        type: 'string',
        pattern: '^[a-zA-Z0-9-]+$',
      },
      name: {
        title: 'Name',
        description: 'The name of the item.',
        type: 'string',
        minLength: 1,
      },
      type: {
        title: 'Type',
        description: 'The type of the item.',
        type: 'string',
        enum: ['grocery', 'cloths'],
        enumNames: ['Grocery', 'Cloths'],
      },
      price: {
        options: [],
        title: 'Priced',
        description: 'The price of the item.',
        type: 'number',
        minimum: 0,
      },
      location: {
        title: 'Location',
        description: 'The coordination.',
        type: 'object',
        properties: {
          lat: {
            options: [],
            type: 'number',
            title: 'latitudesd',
          },
          long: {
            type: 'number',
            title: 'longitude',
          },
        },
      },
      tags: {
        title: 'Tags',
        description: 'Tags associated with the item.',
        type: 'array',
        items: {
          type: 'string',
          title: 'Tag Name',
        },
        uniqueItems: true,
      },
      faq: {
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
      },
      birthday: {
        title: 'Birthday Date',
        type: 'string',
        minimum: 0,
        format: 'date',
      },
      inStock: {
        title: 'In Stock',
        description: 'Indicates if the item is in stock.',
        type: 'boolean',
      },
    },
    required: ['id', 'name', 'price'],
  };

  it('should access the nested field correctly', () => {
    expect(accessToObjectFieldByPath(testObject, 'properties.name.title')).toBe('Name');
  });

  it('should return undefined for non-existing path', () => {
    expect(accessToObjectFieldByPath(testObject, 'properties.nonexistent')).toBeUndefined();
  });

  it('should handle empty path', () => {
    expect(accessToObjectFieldByPath(testObject, '')).toBeUndefined();
  });

  it('should access a deeply nested field correctly', () => {
    expect(accessToObjectFieldByPath(testObject, 'properties.location.properties.lat.title')).toBe('latitudesd');
  });

  it('should access an array field correctly', () => {
    expect(accessToObjectFieldByPath(testObject, 'properties.type.enum')).toEqual(['grocery', 'cloths']);
  });
});

describe('accessToObjectFieldParentByPath', () => {
  const testObject = {
    type: 'object',
    title: 'Example Schema',
    description: 'A rich JSON schema example without dependencies and no nested objects.',
    properties: {
      id: {
        title: 'Identifier',
        description: 'A unique identifier for the item.',
        type: 'string',
        pattern: '^[a-zA-Z0-9-]+$',
      },
      name: {
        title: 'Name',
        description: 'The name of the item.',
        type: 'string',
        minLength: 1,
      },
      type: {
        title: 'Type',
        description: 'The type of the item.',
        type: 'string',
        enum: ['grocery', 'cloths'],
        enumNames: ['Grocery', 'Cloths'],
      },
      price: {
        options: [],
        title: 'Priced',
        description: 'The price of the item.',
        type: 'number',
        minimum: 0,
      },
      location: {
        title: 'Location',
        description: 'The coordination.',
        type: 'object',
        properties: {
          lat: {
            options: [],
            type: 'number',
            title: 'latitudesd',
          },
          long: {
            type: 'number',
            title: 'longitude',
          },
        },
      },
      tags: {
        title: 'Tags',
        description: 'Tags associated with the item.',
        type: 'array',
        items: {
          type: 'string',
          title: 'Tag Name',
        },
        uniqueItems: true,
      },
      faq: {
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
      },
      birthday: {
        title: 'Birthday Date',
        type: 'string',
        minimum: 0,
        format: 'date',
      },
      inStock: {
        title: 'In Stock',
        description: 'Indicates if the item is in stock.',
        type: 'boolean',
      },
    },
    required: ['id', 'name', 'price'],
  };

  it('should access the parent of the nested field correctly', () => {
    expect(accessToObjectFieldParentByPath(testObject, 'properties.name.title')).toEqual({
      title: 'Name',
      description: 'The name of the item.',
      type: 'string',
      minLength: 1,
    });
  });

  it('should handle empty path', () => {
    expect(accessToObjectFieldParentByPath(testObject, '')).toBeUndefined();
  });

  it('should access the parent of an array field correctly', () => {
    expect(accessToObjectFieldParentByPath(testObject, 'properties.type.enum')).toEqual({
      title: 'Type',
      description: 'The type of the item.',
      type: 'string',
      enum: ['grocery', 'cloths'],
      enumNames: ['Grocery', 'Cloths'],
    });
  });
});
