import React, { Dispatch, ReactNode } from 'react';
import { FieldConfig, JsonSchema } from '../types';
import type { RJSFSchema } from '@rjsf/utils';
export interface SchemaAction {
    type: 'ADD_PROPERTY' | 'UPDATE_PROPERTY' | 'DELETE_PROPERTY' | 'ADD_REQUIRED' | 'DELETE_REQUIRED';
    payload: {
        name: string;
        schema?: JsonSchema;
        value?: never;
    };
}
export declare const SchemaContext: React.Context<{
    schema: JsonSchema;
    dispatch: Dispatch<SchemaAction>;
    fields: FieldConfig[];
}>;
type Props = {
    extraFields: FieldConfig[];
    children: ReactNode;
    value?: RJSFSchema;
};
export declare const SchemaProvider: ({ children, extraFields, value }: Props) => React.JSX.Element;
export declare const useSchema: () => {
    schema: JsonSchema;
    dispatch: Dispatch<SchemaAction>;
    fields: FieldConfig[];
};
export {};
