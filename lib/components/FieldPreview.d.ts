import React from 'react';
import { RJSFSchema } from '@rjsf/utils';
import { DataVisualizationType } from '../types';
type Props = {
    schema: RJSFSchema;
    data: unknown;
    name: string;
};
declare const FieldPreview: {
    ({ schema, data, name }: Props): React.JSX.Element;
    String({ schema, data }: DataVisualizationType<string>): React.JSX.Element;
    Enum({ schema, data }: DataVisualizationType<number | string>): React.JSX.Element;
    Number({ schema, data }: DataVisualizationType<number>): React.JSX.Element;
    Integer({ schema, data }: DataVisualizationType<number>): React.JSX.Element;
    Boolean({ schema, data }: DataVisualizationType<boolean>): React.JSX.Element;
    Object({ schema, data }: DataVisualizationType<Record<string, unknown>>): React.JSX.Element;
    Array({ schema, name, data }: DataVisualizationType<unknown[]>): React.JSX.Element;
    Unknown(): React.JSX.Element;
};
export default FieldPreview;
