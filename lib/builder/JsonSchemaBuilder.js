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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonSchemaBuilder = void 0;
var constants_1 = require("../constants");
/**
 * Builder class for constructing JSON Schema objects.
 */
var JsonSchemaBuilder = /** @class */ (function () {
    function JsonSchemaBuilder(schema) {
        var _this = this;
        this.schema = {};
        this.deleteNestedPropertyByPath = function (obj, path) {
            var keys = path.split('.');
            var newObject = __assign({}, obj);
            if (keys.length === 0) {
                return newObject;
            }
            var current = newObject;
            var stack = [];
            for (var i = 0; i < keys.length - 1; i++) {
                stack.push(current);
                current[keys[i]] = __assign({}, current[keys[i]]);
                current = current[keys[i]];
            }
            delete current[keys[keys.length - 1]];
            for (var i = keys.length - 2; i >= 0; i--) {
                var key = keys[i];
                current = stack.pop();
                if (Object.keys(current[key]).length === 0) {
                    delete current[key];
                }
            }
            return newObject;
        };
        this.updateNestedObjectByPath = function (obj, path, value) {
            var keys = path.split('.');
            var newObject = __assign({}, obj);
            var current = newObject;
            keys.forEach(function (key, index) {
                if (index === keys.length - 1) {
                    current[key] = value;
                }
                else {
                    current[key] = current[key] ? __assign({}, current[key]) : {};
                    current = current[key];
                }
            });
            return newObject;
        };
        if (schema) {
            this.setType(schema.type || 'object');
            if (schema.title)
                this.setTitle(schema.title);
            if (schema.description)
                this.setDescription(schema.description);
            if (schema.default)
                this.setDefault(schema.default);
            if (schema.readOnly)
                this.setReadOnly(schema.readOnly);
            if (schema.writeOnly)
                this.setWriteOnly(schema.writeOnly);
            if (schema.enum)
                this.setEnum(schema.enum);
            if (schema.enumNames)
                this.setEnumNames(schema.enumNames);
            switch (schema.type) {
                case constants_1.SCHEMA_TYPE.STRING:
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
                    break;
                case constants_1.SCHEMA_TYPE.NUMBER:
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
                    break;
                case constants_1.SCHEMA_TYPE.OBJECT:
                    if (schema.properties) {
                        Object.keys(schema.properties).forEach(function (key) {
                            var _a;
                            if ((_a = schema.properties) === null || _a === void 0 ? void 0 : _a[key])
                                _this.addProperty(key, schema.properties[key]);
                        });
                    }
                    if (schema.required) {
                        this.addRequired.apply(this, schema.required);
                    }
                    if (schema.patternProperties)
                        this.setPatternProperties(schema.patternProperties);
                    if (schema.additionalProperties)
                        this.setAdditionalProperties(schema.additionalProperties);
                    break;
                case constants_1.SCHEMA_TYPE.ARRAY:
                    if (schema.items)
                        this.setItems(schema.items);
                    if (schema.prefixItems)
                        this.setPrefixItems(schema.prefixItems);
                    if (schema.unevaluatedItems)
                        this.setUnevaluatedItems(schema.unevaluatedItems);
                    if (schema.maxItems)
                        this.setMaxItems(schema.maxItems);
                    if (schema.minItems)
                        this.setMinItems(schema.minItems);
                    break;
                default:
                    break;
            }
        }
    }
    JsonSchemaBuilder.prototype.setTitle = function (title) {
        this.schema.title = title;
        return this;
    };
    JsonSchemaBuilder.prototype.setType = function (type) {
        this.schema.type = type;
        return this;
    };
    JsonSchemaBuilder.prototype.addProperty = function (name, propSchema) {
        if (!this.schema.properties) {
            this.schema.properties = {};
        }
        this.schema.properties[name] = propSchema;
        return this;
    };
    JsonSchemaBuilder.prototype.addNestedProperty = function (name, propSchema) {
        if (!this.schema.properties) {
            this.schema.properties = {};
        }
        this.schema = this.updateNestedObjectByPath(this.schema, name, propSchema);
        return this;
    };
    JsonSchemaBuilder.prototype.addRequired = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.schema.required) {
            this.schema.required = [];
        }
        (_a = this.schema.required).push.apply(_a, args);
        return this;
    };
    JsonSchemaBuilder.prototype.setDescription = function (description) {
        this.schema.description = description;
        return this;
    };
    JsonSchemaBuilder.prototype.setItems = function (itemSchema) {
        this.schema.items = itemSchema;
        return this;
    };
    JsonSchemaBuilder.prototype.setMaxLength = function (maxLength) {
        this.schema.maxLength = maxLength;
        return this;
    };
    JsonSchemaBuilder.prototype.setMinLength = function (minLength) {
        this.schema.minLength = minLength;
        return this;
    };
    JsonSchemaBuilder.prototype.setPattern = function (pattern) {
        this.schema.pattern = pattern;
        return this;
    };
    JsonSchemaBuilder.prototype.setFormat = function (format) {
        this.schema.format = format;
        return this;
    };
    JsonSchemaBuilder.prototype.setMultipleOf = function (multipleOf) {
        this.schema.multipleOf = multipleOf;
        return this;
    };
    JsonSchemaBuilder.prototype.setMaximum = function (maximum) {
        this.schema.maximum = maximum;
        return this;
    };
    JsonSchemaBuilder.prototype.setMinimum = function (minimum) {
        this.schema.minimum = minimum;
        return this;
    };
    JsonSchemaBuilder.prototype.setExclusiveMaximum = function (exclusiveMaximum) {
        this.schema.exclusiveMaximum = exclusiveMaximum;
        return this;
    };
    JsonSchemaBuilder.prototype.setExclusiveMinimum = function (exclusiveMinimum) {
        this.schema.exclusiveMinimum = exclusiveMinimum;
        return this;
    };
    JsonSchemaBuilder.prototype.setPatternProperties = function (patternProperties) {
        this.schema.patternProperties = patternProperties;
        return this;
    };
    JsonSchemaBuilder.prototype.setAdditionalProperties = function (additionalProperties) {
        this.schema.additionalProperties = additionalProperties;
        return this;
    };
    JsonSchemaBuilder.prototype.setUnevaluatedItems = function (unevaluatedItems) {
        this.schema.unevaluatedItems = unevaluatedItems;
        return this;
    };
    JsonSchemaBuilder.prototype.setMinItems = function (minItems) {
        this.schema.minItems = minItems;
        return this;
    };
    JsonSchemaBuilder.prototype.setDefault = function (_default) {
        this.schema.default = _default;
        return this;
    };
    JsonSchemaBuilder.prototype.setMaxItems = function (maxItems) {
        this.schema.maxItems = maxItems;
        return this;
    };
    JsonSchemaBuilder.prototype.setPrefixItems = function (prefixItems) {
        this.schema.prefixItems = prefixItems;
        return this;
    };
    JsonSchemaBuilder.prototype.setReadOnly = function (readOnly) {
        this.schema.readOnly = readOnly;
        return this;
    };
    JsonSchemaBuilder.prototype.setWriteOnly = function (writeOnly) {
        this.schema.writeOnly = writeOnly;
        return this;
    };
    JsonSchemaBuilder.prototype.setContentEncoding = function (contentEncoding) {
        this.schema.contentEncoding = contentEncoding;
        return this;
    };
    JsonSchemaBuilder.prototype.setContentMediaType = function (contentMediaType) {
        this.schema.contentMediaType = contentMediaType;
        return this;
    };
    JsonSchemaBuilder.prototype.setEnum = function (_enum) {
        this.schema.enum = _enum;
        return this;
    };
    JsonSchemaBuilder.prototype.setEnumNames = function (enumNames) {
        this.schema.enumNames = enumNames;
        return this;
    };
    JsonSchemaBuilder.prototype.deleteProperty = function (name) {
        this.schema = this.deleteNestedPropertyByPath(this.schema, name);
        return this;
    };
    JsonSchemaBuilder.prototype.deleteRequired = function (name) {
        if (this.schema.required) {
            this.schema.required = this.schema.required.filter(function (req) { return req !== name; });
        }
        return this;
    };
    JsonSchemaBuilder.prototype.editProperty = function (name, propSchema) {
        this.schema = this.updateNestedObjectByPath(this.schema, name, propSchema);
        return this;
    };
    JsonSchemaBuilder.prototype.build = function () {
        return this.schema;
    };
    return JsonSchemaBuilder;
}());
exports.JsonSchemaBuilder = JsonSchemaBuilder;
