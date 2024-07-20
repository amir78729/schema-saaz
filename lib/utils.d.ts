import { RJSFSchema } from '@rjsf/utils';
import { DataVisualizationType } from './types';
import React from 'react';
export declare const getSchemaFormatFromSchema: (schema: RJSFSchema, SchemaFormat: {
    ({ schema, data, name, path }: DataVisualizationType): React.JSX.Element;
    String({ schema, data, name, path }: DataVisualizationType): React.JSX.Element;
    Boolean({ schema, data, name, path }: DataVisualizationType): React.JSX.Element;
    Object({ schema, data, name, path }: DataVisualizationType): React.JSX.Element;
    Array({ schema, data, name, path }: DataVisualizationType): React.JSX.Element;
    Enum({ schema, data, name, path }: DataVisualizationType): React.JSX.Element;
    Number({ schema, data, name, path }: DataVisualizationType): React.JSX.Element;
    Integer({ schema, data, name, path }: DataVisualizationType): React.JSX.Element;
    Unknown({ schema, data, name, path }: DataVisualizationType): React.JSX.Element;
}) => ({ schema, data, name, path }: DataVisualizationType) => React.JSX.Element;
export declare const getFieldId: (schema: RJSFSchema) => "STRING" | "INTEGER" | "NUMBER" | "BOOLEAN" | "ARRAY" | "OBJECT" | "DATE" | "DATE_TIME" | "TIME" | undefined;
export declare const generatePath: (parentPath: string | undefined, fieldName: string) => string;
export declare const accessToObjectFieldByPath: (object: object, path: string) => object;
export declare const accessToObjectFieldParentByPath: (object: object, path: string) => object;
