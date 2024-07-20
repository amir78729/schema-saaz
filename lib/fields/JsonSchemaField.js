"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonSchemaField = void 0;
var constants_1 = require("../constants");
var JsonSchemaField = /** @class */ (function () {
    function JsonSchemaField(name) {
        this.isRequired = false;
        this.name = name;
        this.type = 'object';
    }
    JsonSchemaField.prototype.getName = function () {
        return this.name;
    };
    JsonSchemaField.prototype.getIsRequired = function () {
        return this.isRequired;
    };
    JsonSchemaField.prototype.setType = function (type) {
        this.type = type;
        return this;
    };
    JsonSchemaField.prototype.setTitle = function (title) {
        this.title = title;
        return this;
    };
    JsonSchemaField.prototype.setDescription = function (description) {
        this.description = description;
        return this;
    };
    JsonSchemaField.prototype.setEnum = function (_enum) {
        this.enum = _enum;
        return this;
    };
    JsonSchemaField.prototype.setEnumNames = function (enumNames) {
        this.enumNames = enumNames;
        return this;
    };
    JsonSchemaField.prototype.setDefault = function (value) {
        this.default = value;
        return this;
    };
    JsonSchemaField.prototype.setReadOnly = function (readOnly) {
        this.readOnly = readOnly;
        return this;
    };
    JsonSchemaField.prototype.setWriteOnly = function (writeOnly) {
        this.writeOnly = writeOnly;
        return this;
    };
    JsonSchemaField.prototype.setIsRequired = function (isRequired) {
        this.isRequired = isRequired;
        return this;
    };
    JsonSchemaField.prototype.setSchema = function (schema) {
        var _a, _b, _c, _d;
        if (schema.type)
            this.setType(schema.type);
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
        if (schema.isRequired)
            this.setIsRequired(schema.isRequired);
        var options = {
            enum: ((_a = schema.options) === null || _a === void 0 ? void 0 : _a.map(function (option) { return option.enum; })) || [],
            enumNames: ((_b = schema.options) === null || _b === void 0 ? void 0 : _b.map(function (option) { return option.enumNames; })) || [],
        };
        if (((_c = options.enum) === null || _c === void 0 ? void 0 : _c.length) > 0)
            this.setEnum(options.enum);
        if (((_d = options.enumNames) === null || _d === void 0 ? void 0 : _d.length) > 0)
            this.setEnumNames(options.enumNames);
    };
    JsonSchemaField.prototype.getSchema = function () {
        return {
            type: this.type,
            title: this.title,
            description: this.description,
            default: this.default,
            readOnly: this.readOnly,
            writeOnly: this.writeOnly,
            enum: this.enum,
            enumNames: this.enumNames,
        };
    };
    JsonSchemaField.prototype.getBuilderSchema = function () {
        var _a;
        return {
            type: constants_1.SCHEMA_TYPE.OBJECT,
            properties: {
                type: {
                    type: constants_1.SCHEMA_TYPE.STRING,
                    title: 'Field type',
                    enum: Object.values(constants_1.SCHEMA_TYPE),
                },
                title: {
                    type: constants_1.SCHEMA_TYPE.STRING,
                    title: 'Field Title',
                },
                description: {
                    type: constants_1.SCHEMA_TYPE.STRING,
                    title: 'Field Description',
                },
                default: {
                    type: constants_1.SCHEMA_TYPE.STRING,
                    title: 'Field Default',
                },
                readOnly: {
                    type: constants_1.SCHEMA_TYPE.BOOLEAN,
                    title: 'Field is ReadOnly',
                },
                writeOnly: {
                    type: constants_1.SCHEMA_TYPE.BOOLEAN,
                    title: 'Field is WriteOnly',
                },
                isRequired: {
                    type: constants_1.SCHEMA_TYPE.BOOLEAN,
                    title: 'Field is required',
                },
                options: {
                    type: constants_1.SCHEMA_TYPE.ARRAY,
                    title: 'Options',
                    description: 'Here you can add options for the select field',
                    items: {
                        type: constants_1.SCHEMA_TYPE.OBJECT,
                        properties: {
                            enum: {
                                type: ((_a = this.getSchema()) === null || _a === void 0 ? void 0 : _a.type) || constants_1.SCHEMA_TYPE.STRING,
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
            },
            required: ['title', 'type'],
        };
    };
    return JsonSchemaField;
}());
exports.JsonSchemaField = JsonSchemaField;
