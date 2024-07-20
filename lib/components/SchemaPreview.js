"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var AddFieldModal_1 = __importDefault(require("./AddFieldModal"));
var Numbers_1 = __importDefault(require("@mui/icons-material/Numbers"));
var icons_material_1 = require("@mui/icons-material");
var material_1 = require("@mui/material");
var utils_1 = require("../utils");
var SchemaProvider_1 = require("../providers/SchemaProvider");
var mui_1 = __importDefault(require("@rjsf/mui"));
var validator_ajv8_1 = __importDefault(require("@rjsf/validator-ajv8"));
var FieldPreview_1 = __importDefault(require("./FieldPreview"));
// TODO: refactor
var renderHeader = function (_a) {
    var _b;
    var icon = _a.icon, schema = _a.schema, onDelete = _a.onDelete, name = _a.name, path = _a.path, description = _a.description, isRequired = _a.isRequired;
    var _c = (0, react_1.useState)(false), showDeleteConfirmationModal = _c[0], setShowDeleteConfirmationModal = _c[1];
    var _d = (0, react_1.useState)(false), showEditModal = _d[0], setShowEditModal = _d[1];
    var _e = (0, react_1.useState)(false), showPreviewModal = _e[0], setShowPreviewModal = _e[1];
    var _f = (0, SchemaProvider_1.useSchema)(), fields = _f.fields, dispatch = _f.dispatch;
    var SelectedFieldClass = (_b = fields.find(function (field) { return field.id === (0, utils_1.getFieldId)(schema); })) === null || _b === void 0 ? void 0 : _b.Class;
    var field;
    if (SelectedFieldClass && name) {
        field = new SelectedFieldClass(name);
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Dialog, { open: showEditModal, onClose: function () { return setShowEditModal(false); } },
            react_1.default.createElement(material_1.DialogTitle, null,
                "Edit ",
                react_1.default.createElement("code", null, name),
                " Field"),
            react_1.default.createElement(material_1.DialogContent, null,
                react_1.default.createElement(mui_1.default, { onSubmit: function (_a) {
                        var formData = _a.formData;
                        handleEdit(dispatch, path, formData);
                        setShowEditModal(false);
                    }, schema: field === null || field === void 0 ? void 0 : field.getBuilderSchema(), formData: schema, validator: validator_ajv8_1.default }))),
        react_1.default.createElement(material_1.Dialog, { open: showPreviewModal, onClose: function () { return setShowPreviewModal(false); } },
            react_1.default.createElement(material_1.DialogTitle, null,
                react_1.default.createElement("code", null, name),
                " Field",
                ' ',
                react_1.default.createElement("span", null,
                    onDelete && (react_1.default.createElement(material_1.IconButton, { color: "error", onClick: function () { return setShowDeleteConfirmationModal(true); } },
                        react_1.default.createElement(icons_material_1.Delete, { fontSize: "small" }))),
                    react_1.default.createElement(material_1.IconButton, { color: "warning", onClick: function () { return setShowEditModal(true); } },
                        react_1.default.createElement(icons_material_1.Edit, { fontSize: "small" })))),
            react_1.default.createElement(material_1.DialogContent, null,
                react_1.default.createElement(FieldPreview_1.default, { name: name || '', schema: field === null || field === void 0 ? void 0 : field.getBuilderSchema(), data: schema }))),
        react_1.default.createElement(material_1.Dialog, { open: showDeleteConfirmationModal, onClose: function () { return setShowDeleteConfirmationModal(false); } },
            react_1.default.createElement(material_1.DialogContent, null,
                react_1.default.createElement(material_1.Typography, null, "Are you sure you want to delete this field?")),
            react_1.default.createElement(material_1.DialogActions, null,
                react_1.default.createElement(material_1.Button, { fullWidth: true, color: "error", onClick: function () { return setShowDeleteConfirmationModal(false); } }, "Cancel"),
                react_1.default.createElement(material_1.Button, { fullWidth: true, variant: "contained", color: "error", onClick: function () {
                        onDelete === null || onDelete === void 0 ? void 0 : onDelete();
                        setShowDeleteConfirmationModal(false);
                    } }, "Delete"))),
        react_1.default.createElement(material_1.ListItem, null,
            react_1.default.createElement(material_1.ListItemText, { primary: react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(material_1.Typography, { variant: "h6" }, schema === null || schema === void 0 ? void 0 :
                        schema.title,
                        ' ',
                        react_1.default.createElement(material_1.Chip, { size: "small", color: "primary", variant: "outlined", icon: icon, label: "".concat(schema === null || schema === void 0 ? void 0 : schema.type).concat((schema === null || schema === void 0 ? void 0 : schema.format) ? ": ".concat(schema === null || schema === void 0 ? void 0 : schema.format) : '') }),
                        ' ',
                        isRequired && react_1.default.createElement(material_1.Chip, { size: "small", color: "error", variant: "outlined", icon: react_1.default.createElement(icons_material_1.Star, null), label: 'Required' })),
                    description && react_1.default.createElement(material_1.Typography, { variant: "caption" }, description)) }),
            onDelete && (react_1.default.createElement(material_1.IconButton, { color: "error", onClick: function () { return setShowDeleteConfirmationModal(true); } },
                react_1.default.createElement(icons_material_1.Delete, { fontSize: "small" }))),
            react_1.default.createElement(material_1.IconButton, { color: "warning", onClick: function () { return setShowEditModal(true); } },
                react_1.default.createElement(icons_material_1.Edit, { fontSize: "small" })),
            react_1.default.createElement(material_1.IconButton, { color: "info", onClick: function () { return setShowPreviewModal(true); } },
                react_1.default.createElement(icons_material_1.Visibility, { fontSize: "small" })))));
};
var handleDelete = function (dispatch, name) {
    dispatch({ type: 'DELETE_PROPERTY', payload: { name: name } });
    dispatch({ type: 'DELETE_REQUIRED', payload: { name: name } });
};
var handleEdit = function (dispatch, name, schema) {
    dispatch({ type: 'UPDATE_PROPERTY', payload: { name: name, schema: schema } });
};
var isPropertyRequired = function (fullSchema, path, name) { var _a, _b, _c; return (_c = (_b = (_a = (0, utils_1.accessToObjectFieldParentByPath)(fullSchema, path)) === null || _a === void 0 ? void 0 : _a.required) === null || _b === void 0 ? void 0 : _b.includes) === null || _c === void 0 ? void 0 : _c.call(_b, name); };
var SchemaPreview = function (_a) {
    var schema = _a.schema, data = _a.data, name = _a.name, path = _a.path;
    var FormPreview = (0, utils_1.getSchemaFormatFromSchema)(schema, SchemaPreview);
    return react_1.default.createElement(FormPreview, { schema: schema, data: data, name: name, path: path });
};
SchemaPreview.String = function String(_a) {
    var schema = _a.schema, path = _a.path, name = _a.name;
    var _b = (0, SchemaProvider_1.useSchema)(), dispatch = _b.dispatch, fullSchema = _b.schema;
    return (react_1.default.createElement(material_1.Paper, null, renderHeader({
        description: schema.description,
        name: name,
        path: path,
        schema: schema,
        icon: react_1.default.createElement(icons_material_1.TextSnippet, null),
        onDelete: function () { return handleDelete(dispatch, path); },
        isRequired: isPropertyRequired(fullSchema, path, name),
    })));
};
SchemaPreview.Enum = function Enum(_a) {
    var schema = _a.schema, path = _a.path, name = _a.name;
    var _b = (0, SchemaProvider_1.useSchema)(), dispatch = _b.dispatch, fullSchema = _b.schema;
    var enums = schema.enum;
    return (react_1.default.createElement(material_1.Paper, null, renderHeader({
        description: (react_1.default.createElement(react_1.default.Fragment, null,
            schema.description,
            " ",
            react_1.default.createElement(material_1.Typography, { variant: "caption" }, "Options:"),
            ' ',
            react_1.default.createElement(material_1.Box, { gap: 1, display: "flex", flexDirection: "row" }, enums.map(function (e, index) { return (react_1.default.createElement(material_1.Chip, { key: e + index, size: "small", label: (schema === null || schema === void 0 ? void 0 : schema.enumNames[enums.indexOf(e)]) || e })); })))),
        name: name,
        path: path,
        schema: schema,
        icon: react_1.default.createElement(icons_material_1.Checklist, null),
        onDelete: function () { return handleDelete(dispatch, path); },
        isRequired: isPropertyRequired(fullSchema, path, name),
    })));
};
SchemaPreview.Number = function Number(_a) {
    var schema = _a.schema, path = _a.path, name = _a.name;
    var _b = (0, SchemaProvider_1.useSchema)(), dispatch = _b.dispatch, fullSchema = _b.schema;
    return (react_1.default.createElement(material_1.Paper, null, renderHeader({
        description: schema.description,
        name: name,
        path: path,
        schema: schema,
        icon: react_1.default.createElement(Numbers_1.default, null),
        onDelete: function () { return handleDelete(dispatch, path); },
        isRequired: isPropertyRequired(fullSchema, path, name),
    })));
};
SchemaPreview.Integer = function Number(_a) {
    var schema = _a.schema, path = _a.path, name = _a.name;
    var _b = (0, SchemaProvider_1.useSchema)(), dispatch = _b.dispatch, fullSchema = _b.schema;
    return (react_1.default.createElement(material_1.Paper, null, renderHeader({
        description: schema.description,
        name: name,
        path: path,
        schema: schema,
        icon: react_1.default.createElement(Numbers_1.default, null),
        onDelete: function () { return handleDelete(dispatch, path); },
        isRequired: isPropertyRequired(fullSchema, path, name),
    })));
};
SchemaPreview.Boolean = function BooleanVisualization(_a) {
    var schema = _a.schema, path = _a.path, name = _a.name;
    var _b = (0, SchemaProvider_1.useSchema)(), dispatch = _b.dispatch, fullSchema = _b.schema;
    return (react_1.default.createElement(material_1.Paper, null, renderHeader({
        description: schema.description,
        name: name,
        path: path,
        schema: schema,
        icon: react_1.default.createElement(icons_material_1.ToggleOn, null),
        onDelete: function () { return handleDelete(dispatch, path); },
        isRequired: isPropertyRequired(fullSchema, path, name),
    })));
};
SchemaPreview.Object = function ObjectVisualization(_a) {
    var schema = _a.schema, path = _a.path, name = _a.name, data = _a.data;
    var _b = (0, SchemaProvider_1.useSchema)(), dispatch = _b.dispatch, fullSchema = _b.schema;
    var properties = Object.keys((schema === null || schema === void 0 ? void 0 : schema.properties) || {});
    var _c = react_1.default.useState(true), open = _c[0], setOpen = _c[1];
    var handleCollapse = function () {
        setOpen(!open);
    };
    return (react_1.default.createElement(material_1.Paper, null,
        renderHeader({
            description: schema.description,
            name: name,
            path: path,
            schema: schema,
            icon: react_1.default.createElement(icons_material_1.DataObject, null),
            collapse: open,
            onCollapse: handleCollapse,
            onDelete: function () { return handleDelete(dispatch, path); },
            isRequired: isPropertyRequired(fullSchema, path, name),
        }),
        react_1.default.createElement(material_1.Paper, { sx: { p: 1 } },
            react_1.default.createElement(material_1.Box, { px: 2, display: "flex", justifyContent: "space-between" },
                react_1.default.createElement(material_1.Typography, { flex: 1 }, "Properties"),
                react_1.default.createElement(AddFieldModal_1.default, { parentPath: (0, utils_1.generatePath)(path, 'properties') }),
                open !== undefined && (react_1.default.createElement(material_1.IconButton, { onClick: handleCollapse }, !open ? react_1.default.createElement(icons_material_1.ExpandMore, { fontSize: "small" }) : react_1.default.createElement(icons_material_1.ExpandLess, { fontSize: "small" })))),
            react_1.default.createElement(material_1.Collapse, { in: open, timeout: "auto", unmountOnExit: true },
                react_1.default.createElement(material_1.Stack, { gap: 2 }, (properties === null || properties === void 0 ? void 0 : properties.length) > 0 ? (properties === null || properties === void 0 ? void 0 : properties.map(function (property) { return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(SchemaPreview, { data: data, name: property, schema: schema.properties[property], path: (0, utils_1.generatePath)(path, (0, utils_1.generatePath)('properties', property)) }))); })) : (react_1.default.createElement(material_1.Typography, { alignItems: "center", textAlign: "center", p: 3 },
                    "Click on ",
                    react_1.default.createElement(icons_material_1.Add, { fontSize: "small" }),
                    " button to add properties")))))));
};
SchemaPreview.Array = function ArrayVisualization(_a) {
    var schema = _a.schema, path = _a.path, name = _a.name, data = _a.data;
    var _b = (0, SchemaProvider_1.useSchema)(), dispatch = _b.dispatch, fullSchema = _b.schema;
    return (react_1.default.createElement(material_1.Paper, { sx: { p: 1 } },
        renderHeader({
            description: schema.description,
            name: name,
            path: path,
            schema: schema,
            icon: react_1.default.createElement(icons_material_1.DataArray, null),
            onDelete: function () { return handleDelete(dispatch, path); },
            isRequired: isPropertyRequired(fullSchema, path, name),
        }),
        react_1.default.createElement(material_1.Box, null,
            react_1.default.createElement(SchemaPreview, { data: data, schema: schema.items, name: name, path: (0, utils_1.generatePath)(path, 'items') }))));
};
SchemaPreview.Unknown = function UnknownVisualization() {
    return react_1.default.createElement(react_1.default.Fragment, null);
};
exports.default = SchemaPreview;
