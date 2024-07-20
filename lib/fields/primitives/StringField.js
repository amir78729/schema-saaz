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
exports.StringField = void 0;
var JsonSchemaField_1 = require("../JsonSchemaField");
var immer_1 = require("immer");
var constants_1 = require("../../constants");
var StringField = /** @class */ (function (_super) {
    __extends(StringField, _super);
    function StringField(name) {
        var _this = _super.call(this, name) || this;
        _this.setType(constants_1.SCHEMA_TYPE.STRING);
        return _this;
    }
    StringField.prototype.setMaxLength = function (maxLength) {
        this.maxLength = maxLength;
        return this;
    };
    StringField.prototype.setMinLength = function (minLength) {
        this.minLength = minLength;
        return this;
    };
    StringField.prototype.setPattern = function (pattern) {
        this.pattern = pattern;
        return this;
    };
    StringField.prototype.setFormat = function (format) {
        this.format = format;
        return this;
    };
    StringField.prototype.setContentEncoding = function (contentEncoding) {
        this.contentEncoding = contentEncoding;
        return this;
    };
    StringField.prototype.setContentMediaType = function (contentMediaType) {
        this.contentMediaType = contentMediaType;
        return this;
    };
    StringField.prototype.getBuilderSchema = function () {
        var stringSchema = {
            maxLength: {
                type: constants_1.SCHEMA_TYPE.INTEGER,
                title: 'Max Length',
            },
            minLength: {
                type: constants_1.SCHEMA_TYPE.INTEGER,
                title: 'Min Length',
            },
            pattern: {
                type: constants_1.SCHEMA_TYPE.STRING,
                title: 'RegEx Pattern',
            },
            format: {
                type: constants_1.SCHEMA_TYPE.STRING,
                title: 'Format',
                enum: [
                    'date-time',
                    'time',
                    'date',
                    'duration',
                    'email',
                    'idn-email',
                    'hostname',
                    'idn-hostname',
                    'ipv4',
                    'ipv6',
                    'uuid',
                    'uri',
                    'uri-reference',
                    'iri',
                    'iri-reference',
                    'uri-template',
                    'json-pointer',
                    'relative-json-pointer',
                    'regex',
                ],
            },
        };
        return (0, immer_1.produce)(_super.prototype.getBuilderSchema.call(this), function (draft) {
            Object.keys(stringSchema).forEach(function (key) {
                if (draft.properties)
                    draft.properties[key] = stringSchema[key];
            });
        });
    };
    StringField.prototype.setSchema = function (schema) {
        _super.prototype.setSchema.call(this, schema);
        if (schema.maxLength)
            this.setMaxLength(schema.maxLength);
        if (schema.minLength)
            this.setMinLength(schema.minLength);
        if (schema.pattern)
            this.setPattern(schema.pattern);
        if (schema.format)
            this.setFormat(schema.format);
        if (schema.contentEncoding)
            this.setContentEncoding(schema.contentEncoding);
        if (schema.contentMediaType)
            this.setContentMediaType(schema.contentMediaType);
    };
    StringField.prototype.getSchema = function () {
        return __assign(__assign({}, _super.prototype.getSchema.call(this)), { maxLength: this.maxLength, minLength: this.minLength, pattern: this.pattern, format: this.format, contentEncoding: this.contentEncoding, contentMediaType: this.contentMediaType });
    };
    return StringField;
}(JsonSchemaField_1.JsonSchemaField));
exports.StringField = StringField;
