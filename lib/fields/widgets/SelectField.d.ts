import { StringField, StringFieldType } from '../primitives/StringField';
import { JsonSchema } from '../../types';
export type SelectFieldType = StringFieldType & {
    options: {
        enum: string;
        enumNames: string;
    }[];
};
export declare class SelectField extends StringField {
    constructor(name: string);
    setEnum(_enum: string[]): this;
    setEnumNames(enumNames: string[]): this;
    getBuilderSchema(): JsonSchema;
    getSchema(): JsonSchema;
    setSchema(schema: SelectFieldType): void;
}
