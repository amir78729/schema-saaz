"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Themed = exports.WithDefaultValue = exports.Formats = exports.Primitives = void 0;
var react_1 = __importDefault(require("react"));
var SchemaBuilder_1 = __importDefault(require("../components/SchemaBuilder"));
var constants_1 = require("../constants");
var SchemaProvider_1 = require("../providers/SchemaProvider");
var material_1 = require("@mui/material");
var sampleSchema = {
    title: 'Example Schema',
    description: 'A rich JSON schema example without dependencies and no nested objects.',
    type: 'object',
    properties: {
        id: {
            title: 'Identifier',
            description: 'A unique identifier for the item.',
            type: 'string',
            pattern: '^[a-zA-Z0-9-]+$',
        },
        name: {
            title: 'Name',
            description: 'The name of the item.',
            type: 'string',
            minLength: 1,
        },
        type: {
            title: 'Type',
            description: 'The type of the item.',
            type: 'string',
            enum: ['grocery', 'cloths'],
            enumNames: ['Grocery', 'Cloths'],
        },
        price: {
            title: 'Price',
            description: 'The price of the item.',
            type: 'number',
            minimum: 0,
        },
        location: {
            title: 'Location',
            description: 'The coordination.',
            type: 'object',
            properties: {
                lat: {
                    type: 'number',
                    title: 'latitude',
                },
                long: {
                    type: 'number',
                    title: 'longitude',
                },
            },
        },
        tags: {
            title: 'Tags',
            description: 'Tags associated with the item.',
            type: 'array',
            items: {
                type: 'string',
                title: 'Tag Name',
            },
            uniqueItems: true,
        },
        faq: {
            title: 'FAQ',
            type: 'array',
            items: {
                type: 'object',
                title: 'List of Questions',
                properties: {
                    question: {
                        title: 'question',
                        type: 'string',
                    },
                    answer: {
                        title: 'answer',
                        type: 'string',
                    },
                },
            },
            uniqueItems: true,
        },
        birthday: {
            title: 'Birthday Date',
            type: 'string',
            minimum: 0,
            format: 'date',
        },
        inStock: {
            title: 'In Stock',
            description: 'Indicates if the item is in stock.',
            type: 'boolean',
        },
    },
    required: ['id', 'name', 'price'],
    additionalProperties: false,
};
exports.default = {
    title: 'SchemaBuilder',
    component: SchemaBuilder_1.default,
};
var Template = function (args) { return (react_1.default.createElement(SchemaProvider_1.SchemaProvider, { extraFields: args.extraFields || [] },
    react_1.default.createElement(SchemaBuilder_1.default, __assign({}, args)))); };
exports.Primitives = Template.bind({});
exports.Primitives.args = {};
exports.Formats = Template.bind({});
exports.Formats.args = {
    extraFields: __spreadArray([], constants_1.STRING_WIDGETS, true),
};
var DefaultValueTemplate = function (args) { return (react_1.default.createElement(SchemaProvider_1.SchemaProvider, { value: sampleSchema, extraFields: args.extraFields || [] },
    react_1.default.createElement(SchemaBuilder_1.default, __assign({}, args)))); };
exports.WithDefaultValue = DefaultValueTemplate.bind({});
exports.WithDefaultValue.args = {
    extraFields: __spreadArray([], constants_1.STRING_WIDGETS, true),
};
var ThemedTemplate = function (args) {
    var theme = (0, material_1.createTheme)(args.theme);
    return (react_1.default.createElement(material_1.ThemeProvider, { theme: theme },
        react_1.default.createElement(SchemaProvider_1.SchemaProvider, { value: sampleSchema, extraFields: args.extraFields || [] },
            react_1.default.createElement(SchemaBuilder_1.default, __assign({}, args)))));
};
exports.Themed = ThemedTemplate.bind({});
exports.Themed.args = {
    extraFields: __spreadArray([], constants_1.STRING_WIDGETS, true),
    theme: {
        palette: {
            primary: {
                main: '#ff5722',
            },
            mode: 'dark',
        },
        components: {
            MuiInput: {
                defaultProps: {
                    size: 'small',
                },
            },
        },
    },
};
