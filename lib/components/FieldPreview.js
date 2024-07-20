"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var icons_material_1 = require("@mui/icons-material");
var material_1 = require("@mui/material");
var utils_1 = require("../utils");
// TODO: refactor
var renderHeader = function (_a) {
    var schema = _a.schema;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.ListItem, null,
            react_1.default.createElement(material_1.ListItemText, { primary: react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(material_1.Typography, { variant: "h6" }, schema === null || schema === void 0 ? void 0 : schema.title),
                    (schema === null || schema === void 0 ? void 0 : schema.description) && react_1.default.createElement(material_1.Typography, { variant: "caption" }, schema === null || schema === void 0 ? void 0 : schema.description)) }))));
};
var FieldPreview = function (_a) {
    var schema = _a.schema, data = _a.data, name = _a.name;
    var FormPreview = (0, utils_1.getSchemaFormatFromSchema)(schema, FieldPreview);
    return react_1.default.createElement(FormPreview, { schema: schema, data: data, name: name, path: '' });
};
FieldPreview.String = function String(_a) {
    var schema = _a.schema, data = _a.data;
    return (react_1.default.createElement(material_1.TableRow, null,
        react_1.default.createElement(material_1.TableCell, null, schema === null || schema === void 0 ? void 0 : schema.title),
        react_1.default.createElement(material_1.TableCell, null, data || '-')));
};
FieldPreview.Enum = function Enum(_a) {
    var schema = _a.schema, data = _a.data;
    return (react_1.default.createElement(material_1.TableRow, null,
        react_1.default.createElement(material_1.TableCell, null, schema === null || schema === void 0 ? void 0 : schema.title),
        react_1.default.createElement(material_1.TableCell, null, data || '-')));
};
FieldPreview.Number = function Number(_a) {
    var schema = _a.schema, data = _a.data;
    return (react_1.default.createElement(material_1.TableRow, null,
        react_1.default.createElement(material_1.TableCell, null, schema === null || schema === void 0 ? void 0 : schema.title),
        react_1.default.createElement(material_1.TableCell, null, data || '-')));
};
FieldPreview.Integer = function Integer(_a) {
    var schema = _a.schema, data = _a.data;
    return (react_1.default.createElement(material_1.TableRow, null,
        react_1.default.createElement(material_1.TableCell, null, schema === null || schema === void 0 ? void 0 : schema.title),
        react_1.default.createElement(material_1.TableCell, null, data || '-')));
};
FieldPreview.Boolean = function BooleanVisualization(_a) {
    var schema = _a.schema, data = _a.data;
    return (react_1.default.createElement(material_1.TableRow, null,
        react_1.default.createElement(material_1.TableCell, null, schema === null || schema === void 0 ? void 0 : schema.title),
        react_1.default.createElement(material_1.TableCell, null, data ? react_1.default.createElement(icons_material_1.Check, null) : react_1.default.createElement(icons_material_1.Close, null))));
};
FieldPreview.Object = function ObjectVisualization(_a) {
    var _b;
    var schema = _a.schema, data = _a.data;
    var properties = Object.keys((schema === null || schema === void 0 ? void 0 : schema.properties) || {});
    return (react_1.default.createElement(material_1.Table, null,
        renderHeader({
            schema: schema,
        }),
        react_1.default.createElement(material_1.TableBody, null, (_b = properties === null || properties === void 0 ? void 0 : properties.filter(function (property) { return (data === null || data === void 0 ? void 0 : data[property]) !== undefined; })) === null || _b === void 0 ? void 0 : _b.map(function (property) { return (react_1.default.createElement(FieldPreview, { key: property, data: data === null || data === void 0 ? void 0 : data[property], name: property, schema: schema.properties[property] })); }))));
};
FieldPreview.Array = function ArrayVisualization(_a) {
    var schema = _a.schema, name = _a.name, data = _a.data;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Card, null,
            renderHeader({ schema: schema }),
            react_1.default.createElement(FieldPreview, { schema: schema.items, name: name, data: data }))));
};
FieldPreview.Unknown = function ArrayVisualization() {
    return react_1.default.createElement(react_1.default.Fragment, null);
};
exports.default = FieldPreview;
