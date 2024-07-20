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
exports.NumberField = void 0;
var JsonSchemaField_1 = require("../JsonSchemaField");
var immer_1 = require("immer");
var constants_1 = require("../../constants");
var NumberField = /** @class */ (function (_super) {
    __extends(NumberField, _super);
    function NumberField(name) {
        var _this = _super.call(this, name) || this;
        _this.type = constants_1.SCHEMA_TYPE.NUMBER;
        return _this;
    }
    NumberField.prototype.setMultipleOf = function (multipleOf) {
        this.multipleOf = multipleOf;
        return this;
    };
    NumberField.prototype.setMaximum = function (maximum) {
        this.maximum = maximum;
        return this;
    };
    NumberField.prototype.setMinimum = function (minimum) {
        this.minimum = minimum;
        return this;
    };
    NumberField.prototype.setExclusiveMaximum = function (exclusiveMaximum) {
        this.exclusiveMaximum = exclusiveMaximum;
        return this;
    };
    NumberField.prototype.setExclusiveMinimum = function (exclusiveMinimum) {
        this.exclusiveMinimum = exclusiveMinimum;
        return this;
    };
    NumberField.prototype.getBuilderSchema = function () {
        var numberSchema = {
            multipleOf: {
                type: constants_1.SCHEMA_TYPE.NUMBER,
                title: 'Multiple Of',
            },
            maximum: {
                type: constants_1.SCHEMA_TYPE.NUMBER,
                title: 'Maximum',
            },
            minimum: {
                type: constants_1.SCHEMA_TYPE.NUMBER,
                title: 'Minimum',
            },
            exclusiveMaximum: {
                type: constants_1.SCHEMA_TYPE.BOOLEAN,
                title: 'Field has exclusive maximum',
            },
            exclusiveMinimum: {
                type: constants_1.SCHEMA_TYPE.BOOLEAN,
                title: 'Field has exclusive minimum',
            },
        };
        return (0, immer_1.produce)(_super.prototype.getBuilderSchema.call(this), function (draft) {
            Object.keys(numberSchema).forEach(function (key) {
                if (draft.properties)
                    draft.properties[key] = numberSchema[key];
            });
        });
    };
    NumberField.prototype.getSchema = function () {
        return __assign(__assign({}, _super.prototype.getSchema.call(this)), { multipleOf: this.multipleOf, maximum: this.maximum, minimum: this.minimum, exclusiveMaximum: this.exclusiveMaximum, exclusiveMinimum: this.exclusiveMinimum });
    };
    NumberField.prototype.setSchema = function (schema) {
        _super.prototype.setSchema.call(this, schema);
        if (schema.multipleOf)
            this.setMultipleOf(schema.multipleOf);
        if (schema.maximum)
            this.setMaximum(schema.maximum);
        if (schema.minimum)
            this.setMinimum(schema.minimum);
        if (schema.exclusiveMaximum)
            this.setExclusiveMaximum(schema.exclusiveMaximum);
        if (schema.exclusiveMinimum)
            this.setExclusiveMinimum(schema.exclusiveMinimum);
    };
    return NumberField;
}(JsonSchemaField_1.JsonSchemaField));
exports.NumberField = NumberField;
