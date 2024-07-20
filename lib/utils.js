"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessToObjectFieldParentByPath = exports.accessToObjectFieldByPath = exports.generatePath = exports.getFieldId = exports.getSchemaFormatFromSchema = void 0;
var constants_1 = require("./constants");
var getSchemaFormatFromSchema = function (schema, SchemaFormat) {
    var _a;
    if (((_a = schema === null || schema === void 0 ? void 0 : schema.enum) === null || _a === void 0 ? void 0 : _a.length) > 0)
        return SchemaFormat.Enum;
    if ((schema === null || schema === void 0 ? void 0 : schema.type) === constants_1.SCHEMA_TYPE.BOOLEAN)
        return SchemaFormat.Boolean;
    // if (schema?.type === 'string' && schema?.format === 'image-url') return SchemaFormat.Image;
    // if (schema?.type === 'string' && schema?.format === 'video-url') return SchemaFormat.Video;
    // if (schema?.type === 'string' && schema?.format === 'uri') return SchemaFormat.Url;
    // if (schema?.type === 'string' && schema?.format === 'advance') return SchemaFormat.RichText;
    // if (schema?.type === 'string' && schema?.ui?.widget === 'color') return SchemaFormat.Color;
    // if (schema?.format === 'date') return SchemaFormat.Date;
    // if (schema?.format === 'date-time') return SchemaFormat.DateTime;
    if ((schema === null || schema === void 0 ? void 0 : schema.type) === constants_1.SCHEMA_TYPE.STRING)
        return SchemaFormat.String;
    if ((schema === null || schema === void 0 ? void 0 : schema.type) === constants_1.SCHEMA_TYPE.NUMBER)
        return SchemaFormat.Number;
    if ((schema === null || schema === void 0 ? void 0 : schema.type) === constants_1.SCHEMA_TYPE.INTEGER)
        return SchemaFormat.Integer;
    // if (schema?.type === 'object' && schema?.format === 'map')
    //   return SchemaFormat.Map;
    if ((schema === null || schema === void 0 ? void 0 : schema.type) === constants_1.SCHEMA_TYPE.OBJECT)
        return SchemaFormat.Object;
    if ((schema === null || schema === void 0 ? void 0 : schema.type) === constants_1.SCHEMA_TYPE.ARRAY)
        return SchemaFormat.Array;
    return SchemaFormat.Unknown;
};
exports.getSchemaFormatFromSchema = getSchemaFormatFromSchema;
var getFieldId = function (schema) {
    if ((schema === null || schema === void 0 ? void 0 : schema.type) === 'boolean')
        return 'BOOLEAN';
    if ((schema === null || schema === void 0 ? void 0 : schema.format) === 'date')
        return 'DATE';
    if ((schema === null || schema === void 0 ? void 0 : schema.format) === 'date-time')
        return 'DATE_TIME';
    if ((schema === null || schema === void 0 ? void 0 : schema.format) === 'time')
        return 'TIME';
    if ((schema === null || schema === void 0 ? void 0 : schema.type) === 'string')
        return 'STRING';
    if ((schema === null || schema === void 0 ? void 0 : schema.type) === 'integer')
        return 'INTEGER';
    if ((schema === null || schema === void 0 ? void 0 : schema.type) === 'number')
        return 'NUMBER';
    if ((schema === null || schema === void 0 ? void 0 : schema.type) === 'object')
        return 'OBJECT';
    if ((schema === null || schema === void 0 ? void 0 : schema.type) === 'array')
        return 'ARRAY';
};
exports.getFieldId = getFieldId;
var generatePath = function (parentPath, fieldName) {
    if (parentPath === void 0) { parentPath = ''; }
    var path = parentPath;
    if ((path === null || path === void 0 ? void 0 : path.length) > 0)
        path += '.';
    path += fieldName;
    return path;
};
exports.generatePath = generatePath;
var accessToObjectFieldByPath = function (object, path) {
    return path.split('.').reduce(function (o, i) { return o[i]; }, object);
};
exports.accessToObjectFieldByPath = accessToObjectFieldByPath;
var accessToObjectFieldParentByPath = function (object, path) {
    var _a, _b;
    return (_b = (_a = path === null || path === void 0 ? void 0 : path.split('.')) === null || _a === void 0 ? void 0 : _a.slice(0, (path === null || path === void 0 ? void 0 : path.split('.').length) - 2)) === null || _b === void 0 ? void 0 : _b.reduce(function (o, i) { return o[i]; }, object);
};
exports.accessToObjectFieldParentByPath = accessToObjectFieldParentByPath;
