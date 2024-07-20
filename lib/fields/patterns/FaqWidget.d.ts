import { ObjectFieldType } from '../containers/ObjectField';
import { ArrayField } from '../containers/ArrayField';
import { JsonSchema } from '../../types';
export type FaqType = ObjectFieldType;
export declare class FaqWidget extends ArrayField {
    constructor(name: string);
    getBuilderSchema(): JsonSchema;
}
