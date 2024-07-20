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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectField = void 0;
var JsonSchemaField_1 = require("../JsonSchemaField");
var immer_1 = require("immer");
var constants_1 = require("../../constants");
var ObjectField = /** @class */ (function (_super) {
    __extends(ObjectField, _super);
    function ObjectField(name) {
        var _this = _super.call(this, name) || this;
        _this.type = constants_1.SCHEMA_TYPE.OBJECT;
        return _this;
    }
    ObjectField.prototype.addProperty = function (name, propSchema) {
        if (!this.properties) {
            this.properties = {};
        }
        this.properties[name] = propSchema;
        return this;
    };
    ObjectField.prototype.addRequired = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.required) {
            this.required = [];
        }
        (_a = this.required).push.apply(_a, args);
        return this;
    };
    ObjectField.prototype.setPatternProperties = function (patternProperties) {
        this.patternProperties = patternProperties;
        return this;
    };
    ObjectField.prototype.setAdditionalProperties = function (additionalProperties) {
        this.additionalProperties = additionalProperties;
        return this;
    };
    ObjectField.prototype.setSchema = function (schema) {
        var _this = this;
        _super.prototype.setSchema.call(this, schema);
        Object.keys(schema.properties || {}).forEach(function (property) {
            if (schema.properties)
                _this.addProperty(property, schema.properties[property]);
        });
        if (schema.required)
            this.addRequired.apply(this, schema.required);
        if (schema.patternProperties)
            this.setPatternProperties(schema.patternProperties);
        if (schema.additionalProperties)
            this.setAdditionalProperties(schema.additionalProperties);
    };
    ObjectField.prototype.getBuilderSchema = function () {
        var objectSchema = {
        // properties: {
        //   type: SCHEMA_TYPE.OBJECT,
        //   title: 'Properties',
        // },
        // patternProperties: {
        //   type: SCHEMA_TYPE.OBJECT,
        //   title: 'Pattern Properties',
        // },
        // additionalProperties: {
        //   type: SCHEMA_TYPE.OBJECT,
        //   title: 'Additional Properties',
        // },
        };
        return (0, immer_1.produce)(_super.prototype.getBuilderSchema.call(this), function (draft) {
            Object.keys(objectSchema).forEach(function (key) {
                if (draft.properties)
                    draft.properties[key] = objectSchema[key];
            });
        });
    };
    return ObjectField;
}(JsonSchemaField_1.JsonSchemaField));
exports.ObjectField = ObjectField;
