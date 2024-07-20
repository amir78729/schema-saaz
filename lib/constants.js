"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROPERTIES = exports.PATTERNS = exports.STRING_WIDGETS = exports.CONTAINER_PROPERTIES = exports.PRIMITIVE_PROPERTIES = exports.SCHEMA_TYPE = void 0;
var StringField_1 = require("./fields/primitives/StringField");
var IntegerField_1 = require("./fields/primitives/IntegerField");
var BooleanField_1 = require("./fields/primitives/BooleanField");
var NumberField_1 = require("./fields/primitives/NumberField");
var ObjectField_1 = require("./fields/containers/ObjectField");
var ArrayField_1 = require("./fields/containers/ArrayField");
var DateField_1 = require("./fields/widgets/DateField");
var TimeField_1 = require("./fields/widgets/TimeField");
var DateTimeField_1 = require("./fields/widgets/DateTimeField");
var FaqWidget_1 = require("./fields/patterns/FaqWidget");
var SelectField_1 = require("./fields/widgets/SelectField");
exports.SCHEMA_TYPE = {
    STRING: 'string',
    NUMBER: 'number',
    INTEGER: 'integer',
    OBJECT: 'object',
    ARRAY: 'array',
    BOOLEAN: 'boolean',
};
exports.PRIMITIVE_PROPERTIES = [
    {
        id: 'STRING',
        title: 'String Field',
        description: 'a string field',
        Class: StringField_1.StringField,
    },
    {
        id: 'INTEGER',
        title: 'Integer Field',
        description: 'a integer field',
        Class: IntegerField_1.IntegerField,
    },
    {
        id: 'NUMBER',
        title: 'Number Field',
        description: 'a number field',
        Class: NumberField_1.NumberField,
    },
    {
        id: 'BOOLEAN',
        title: 'Boolean Field',
        description: 'a boolean field',
        Class: BooleanField_1.BooleanField,
    },
];
exports.CONTAINER_PROPERTIES = [
    {
        id: 'ARRAY',
        title: 'Array Field',
        description: 'a array field',
        Class: ArrayField_1.ArrayField,
    },
    {
        id: 'OBJECT',
        title: 'Object Field',
        description: 'a object field',
        Class: ObjectField_1.ObjectField,
    },
];
exports.STRING_WIDGETS = [
    {
        id: 'DATE',
        title: 'Date Field',
        description: 'a date field',
        Class: DateField_1.DateField,
    },
    {
        id: 'DATE_TIME',
        title: 'Date-Time Field',
        description: 'a date-time field',
        Class: DateTimeField_1.DateTimeField,
    },
    {
        id: 'TIME',
        title: 'Time Field',
        description: 'a time field',
        Class: TimeField_1.TimeField,
    },
    {
        id: 'SELECT',
        title: 'Select Field',
        description: 'a select field with a list of options',
        Class: SelectField_1.SelectField,
    },
];
exports.PATTERNS = [
    {
        id: 'FAQ',
        title: 'FAQ',
        description: 'a FAQ form',
        Class: FaqWidget_1.FaqWidget,
    },
];
exports.PROPERTIES = __spreadArray(__spreadArray([], exports.PRIMITIVE_PROPERTIES, true), exports.CONTAINER_PROPERTIES, true);
