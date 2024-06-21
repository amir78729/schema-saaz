import {RJSFSchema} from "@rjsf/utils";
import {DataVisualizationType, NestedObject} from "./types";

export const getSchemaFormatFromSchema = (
    schema: RJSFSchema,
    SchemaFormat: {
        ({schema, data}: DataVisualizationType): JSX.Element;
        String({schema, data}: DataVisualizationType): JSX.Element;
        Boolean({schema, data}: DataVisualizationType): JSX.Element;
        Image({schema, data}: DataVisualizationType): JSX.Element;
        Video({schema, data}: DataVisualizationType): JSX.Element;
        Object({schema, data}: DataVisualizationType): JSX.Element;
        Array({schema, data}: DataVisualizationType): JSX.Element;
        Url({schema, data}: DataVisualizationType): JSX.Element;
        RichText({schema, data}: DataVisualizationType): JSX.Element;
        Map({schema, data}: DataVisualizationType): JSX.Element;
        Date({schema, data}: DataVisualizationType): JSX.Element;
        DateTime({schema, data}: DataVisualizationType): JSX.Element;
        Enum({schema, data}: DataVisualizationType): JSX.Element;
        Number({schema, data}: DataVisualizationType): JSX.Element;
        Color({schema, data}: DataVisualizationType): JSX.Element;
        Unknown({schema, data}: DataVisualizationType): JSX.Element;
    },
) => {
    if (schema?.type === 'boolean') return SchemaFormat.Boolean;
    // if (schema?.type === 'string' && schema?.format === 'image-url') return SchemaFormat.Image;
    // if (schema?.type === 'string' && schema?.format === 'video-url') return SchemaFormat.Video;
    // if (schema?.type === 'string' && schema?.format === 'uri') return SchemaFormat.Url;
    // if (schema?.type === 'string' && schema?.format === 'advance') return SchemaFormat.RichText;
    // if (schema?.type === 'string' && schema?.ui?.widget === 'color') return SchemaFormat.Color;
    // if (schema?.format === 'date') return SchemaFormat.Date;
    // if (schema?.format === 'date-time') return SchemaFormat.DateTime;
    if (schema?.type === 'string' && schema?.enum?.length > 0) return SchemaFormat.Enum;
    if (schema?.type === 'string') return SchemaFormat.String;
    if (schema?.type === 'number' || schema?.type === 'integer') return SchemaFormat.Number;
    if (schema?.type === 'object' && schema?.format === 'map') return SchemaFormat.Map;
    if (schema?.type === 'object') return SchemaFormat.Object;
    if (schema?.type === 'array') return SchemaFormat.Array;
    return SchemaFormat.Unknown;
};

export const getFieldId = (schema: RJSFSchema) => {
    if (schema?.type === 'boolean') return 'BOOLEAN';
    if (schema?.format === 'date') return 'DATE';
    if (schema?.format === 'date-time') return 'DATE_TIME';
    if (schema?.format === 'time') return 'TIME';
    if (schema?.type === 'string') return 'STRING';
    if (schema?.type === 'number' || schema?.type === 'integer') return 'NUMBER';
    if (schema?.type === 'object') return 'OBJECT';
    if (schema?.type === 'array') return 'ARRAY';
}

export const generatePath = (parentPath: string = '', fieldName: string): string => {
    let path = parentPath;
    if (path?.length > 0) path += '.';
    path += fieldName;
    return path;
}

export const accessToObjectFieldByPath = (object: object, path: string) => {
    return path.split('.').reduce((o, i) => o[i], object)
}

export const updateNestedObjectByPath = (obj: NestedObject, path: string, value: any): NestedObject => {
    const keys = path.split('.');
    const newObject = {...obj};

    let current = newObject;
    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            current[key] = value;
        } else {
            current[key] = current[key] ? {...current[key]} : {};
            current = current[key];
        }
    });

    return newObject;
}

export const deleteNestedPropertyByPath = (obj: NestedObject, path: string): NestedObject => {
    const keys = path.split('.');
    const newObject = {...obj};

    if (keys.length === 0) {
        return newObject;
    }

    let current = newObject;
    const stack = [];

    for (let i = 0; i < keys.length - 1; i++) {
        stack.push(current);
        current[keys[i]] = {...current[keys[i]]};
        current = current[keys[i]];
    }

    delete current[keys[keys.length - 1]];

    for (let i = keys.length - 2; i >= 0; i--) {
        const key = keys[i];
        current = stack.pop();
        if (Object.keys(current[key]).length === 0) {
            delete current[key];
        }
    }

    return newObject;
}
