"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectField = void 0;
var StringField_1 = require("../primitives/StringField");
var immer_1 = require("immer");
var constants_1 = require("../../constants");
var SelectField = /** @class */ (function (_super) {
    __extends(SelectField, _super);
    // protected enum?: string[];
    //
    // protected enumNames?: string[];
    function SelectField(name) {
        return _super.call(this, name) || this;
    }
    SelectField.prototype.setEnum = function (_enum) {
        this.enum = _enum;
        return this;
    };
    SelectField.prototype.setEnumNames = function (enumNames) {
        this.enumNames = enumNames;
        return this;
    };
    SelectField.prototype.getBuilderSchema = function () {
        var enumSchema = {
            options: {
                type: constants_1.SCHEMA_TYPE.ARRAY,
                title: 'Options',
                minItems: 1,
                description: 'Here you can add options for the select field',
                items: {
                    type: constants_1.SCHEMA_TYPE.OBJECT,
                    properties: {
                        enum: {
                            type: constants_1.SCHEMA_TYPE.STRING,
                            title: 'Value of the option',
                            description: 'The value that is going to be in the form',
                        },
                        enumNames: {
                            type: constants_1.SCHEMA_TYPE.STRING,
                            title: 'Title of the option',
                            description: 'The title that is going to be shown to user',
                        },
                    },
                    required: ['enum', 'enumNames'],
                },
            },
        };
        return (0, immer_1.produce)(_super.prototype.getBuilderSchema.call(this), function (draft) {
            Object.keys(enumSchema).forEach(function (key) {
                if (draft.properties)
                    draft.properties[key] = enumSchema[key];
            });
        });
    };
    SelectField.prototype.getSchema = function () {
        return __assign(__assign({}, _super.prototype.getSchema.call(this)), { enum: this.enum, enumNames: this.enumNames });
    };
    SelectField.prototype.setSchema = function (schema) {
        var _a, _b, _c, _d;
        _super.prototype.setSchema.call(this, schema);
        var options = {
            enum: ((_a = schema.options) === null || _a === void 0 ? void 0 : _a.map(function (option) { return option.enum; })) || [],
            enumNames: ((_b = schema.options) === null || _b === void 0 ? void 0 : _b.map(function (option) { return option.enumNames; })) || [],
        };
        if (((_c = options.enum) === null || _c === void 0 ? void 0 : _c.length) > 0)
            this.setEnum(options.enum);
        if (((_d = options.enumNames) === null || _d === void 0 ? void 0 : _d.length) > 0)
            this.setEnumNames(options.enumNames);
    };
    return SelectField;
}(StringField_1.StringField));
exports.SelectField = SelectField;
