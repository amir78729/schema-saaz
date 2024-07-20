import React from 'react';
import { DataVisualizationType } from '../types';
declare const SchemaPreview: {
    ({ schema, data, name, path }: DataVisualizationType): React.JSX.Element;
    String({ schema, path, name }: DataVisualizationType<string>): React.JSX.Element;
    Enum({ schema, path, name }: DataVisualizationType): React.JSX.Element;
    Number({ schema, path, name }: DataVisualizationType<number>): React.JSX.Element;
    Integer({ schema, path, name }: DataVisualizationType<number>): React.JSX.Element;
    Boolean({ schema, path, name }: DataVisualizationType<boolean>): React.JSX.Element;
    Object({ schema, path, name, data }: DataVisualizationType<Record<string, unknown>>): React.JSX.Element;
    Array({ schema, path, name, data }: DataVisualizationType<unknown[]>): React.JSX.Element;
    Unknown(): React.JSX.Element;
};
export default SchemaPreview;
