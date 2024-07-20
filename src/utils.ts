import { RJSFSchema } from '@rjsf/utils';
import { DataVisualizationType } from './types';
import { SCHEMA_TYPE } from './constants';
import React from 'react';

export const getSchemaFormatFromSchema = (
  schema: RJSFSchema,
  SchemaFormat: {
    ({ schema, data, name, path }: DataVisualizationType): React.JSX.Element;
    String({ schema, data, name, path }: DataVisualizationType): React.JSX.Element;
    Boolean({ schema, data, name, path }: DataVisualizationType): React.JSX.Element;
    Object({ schema, data, name, path }: DataVisualizationType): React.JSX.Element;
    Array({ schema, data, name, path }: DataVisualizationType): React.JSX.Element;
    Enum({ schema, data, name, path }: DataVisualizationType): React.JSX.Element;
    Number({ schema, data, name, path }: DataVisualizationType): React.JSX.Element;
    Integer({ schema, data, name, path }: DataVisualizationType): React.JSX.Element;
    Unknown({ schema, data, name, path }: DataVisualizationType): React.JSX.Element;
  },
) => {
  if (schema?.enum?.length > 0) return SchemaFormat.Enum;
  if (schema?.type === SCHEMA_TYPE.BOOLEAN) return SchemaFormat.Boolean;
  // if (schema?.type === 'string' && schema?.format === 'image-url') return SchemaFormat.Image;
  // if (schema?.type === 'string' && schema?.format === 'video-url') return SchemaFormat.Video;
  // if (schema?.type === 'string' && schema?.format === 'uri') return SchemaFormat.Url;
  // if (schema?.type === 'string' && schema?.format === 'advance') return SchemaFormat.RichText;
  // if (schema?.type === 'string' && schema?.ui?.widget === 'color') return SchemaFormat.Color;
  // if (schema?.format === 'date') return SchemaFormat.Date;
  // if (schema?.format === 'date-time') return SchemaFormat.DateTime;
  if (schema?.type === SCHEMA_TYPE.STRING) return SchemaFormat.String;
  if (schema?.type === SCHEMA_TYPE.NUMBER) return SchemaFormat.Number;
  if (schema?.type === SCHEMA_TYPE.INTEGER) return SchemaFormat.Integer;
  // if (schema?.type === 'object' && schema?.format === 'map')
  //   return SchemaFormat.Map;
  if (schema?.type === SCHEMA_TYPE.OBJECT) return SchemaFormat.Object;
  if (schema?.type === SCHEMA_TYPE.ARRAY) return SchemaFormat.Array;
  return SchemaFormat.Unknown;
};

export const getFieldId = (schema: RJSFSchema) => {
  if (schema?.type === 'boolean') return 'BOOLEAN';
  if (schema?.format === 'date') return 'DATE';
  if (schema?.format === 'date-time') return 'DATE_TIME';
  if (schema?.format === 'time') return 'TIME';
  if (schema?.type === 'string') return 'STRING';
  if (schema?.type === 'integer') return 'INTEGER';
  if (schema?.type === 'number') return 'NUMBER';
  if (schema?.type === 'object') return 'OBJECT';
  if (schema?.type === 'array') return 'ARRAY';
};

export const generatePath = (parentPath: string = '', fieldName: string): string => {
  let path = parentPath;
  if (path?.length > 0) path += '.';
  path += fieldName;
  return path;
};

export const accessToObjectFieldByPath = (object: object, path: string) => {
  return path.split('.').reduce((o, i) => o[i], object);
};
