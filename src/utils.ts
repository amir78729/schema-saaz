import {RJSFSchema} from "@rjsf/utils";
import {DataVisualizationType} from "./types";

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
    if (schema?.type === 'string' && schema?.format === 'image-url') return SchemaFormat.Image;
    if (schema?.type === 'string' && schema?.format === 'video-url') return SchemaFormat.Video;
    if (schema?.type === 'string' && schema?.format === 'uri') return SchemaFormat.Url;
    if (schema?.type === 'string' && schema?.format === 'advance') return SchemaFormat.RichText;
    if (schema?.type === 'string' && schema?.ui?.widget === 'color') return SchemaFormat.Color;
    if (schema?.format === 'date') return SchemaFormat.Date;
    if (schema?.format === 'date-time') return SchemaFormat.DateTime;
    if (schema?.type === 'string' && schema?.enum?.length > 0) return SchemaFormat.Enum;
    if (schema?.type === 'string') return SchemaFormat.String;
    if (schema?.type === 'number' || schema?.type === 'integer') return SchemaFormat.Number;
    if (schema?.type === 'object' && schema?.format === 'map') return SchemaFormat.Map;
    if (schema?.type === 'object') return SchemaFormat.Object;
    if (schema?.type === 'array') return SchemaFormat.Array;
    return SchemaFormat.Unknown;
};