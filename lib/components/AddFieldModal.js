"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var material_1 = require("@mui/material");
var mui_1 = __importDefault(require("@rjsf/mui"));
var validator_ajv8_1 = __importDefault(require("@rjsf/validator-ajv8"));
var react_1 = __importDefault(require("react"));
var SchemaProvider_1 = require("../providers/SchemaProvider");
var Select_1 = __importDefault(require("@mui/material/Select"));
var icons_material_1 = require("@mui/icons-material");
var utils_1 = require("../utils");
var AddFieldModal = function (_a) {
    var _b;
    var parentPath = _a.parentPath;
    var _c = react_1.default.useState(false), open = _c[0], setOpen = _c[1];
    var _d = react_1.default.useState(null), name = _d[0], setName = _d[1];
    var _e = react_1.default.useState(null), type = _e[0], setType = _e[1];
    var _f = react_1.default.useState(null), field = _f[0], setField = _f[1];
    var _g = (0, SchemaProvider_1.useSchema)(), dispatch = _g.dispatch, fields = _g.fields;
    var _h = react_1.default.useState(0), step = _h[0], setStep = _h[1];
    var SelectedFieldClass = (_b = fields.find(function (f) { return f.id === type; })) === null || _b === void 0 ? void 0 : _b.Class;
    var handleSelectType = function () {
        if (name && type && SelectedFieldClass) {
            setField(new SelectedFieldClass(name));
            setStep(1);
        }
    };
    var handleSubmit = function (formData) {
        if (field) {
            field.setSchema(formData);
            dispatch({
                type: 'ADD_PROPERTY',
                payload: {
                    name: (0, utils_1.generatePath)(parentPath, field.getName() || 'newField'),
                    schema: field.getSchema(),
                },
            });
            if (field.getIsRequired()) {
                dispatch({
                    type: 'ADD_REQUIRED',
                    payload: {
                        name: (0, utils_1.generatePath)(parentPath, field.getName() || 'newField'),
                    },
                });
            }
            setOpen(false);
            setType(null);
            setName(null);
            setStep(0);
        }
    };
    var handleTitleChanged = function (e) {
        var input = e.target.value;
        setName(input);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Tooltip, { title: "Add Property", arrow: true, placement: "left" },
            react_1.default.createElement(material_1.IconButton, { onClick: function () { return setOpen(true); } },
                react_1.default.createElement(icons_material_1.Add, null))),
        react_1.default.createElement(material_1.Dialog, { fullWidth: true, open: open, onClose: function () { return setOpen(false); } },
            react_1.default.createElement(material_1.Box, { p: 3, key: JSON.stringify(fields) },
                react_1.default.createElement("h1", null,
                    step !== 0 && react_1.default.createElement(material_1.Button, { onClick: function () { return setStep(0); } }, "back"),
                    "Adding Field"),
                step === 0 && (react_1.default.createElement(material_1.Stack, { gap: 3 },
                    react_1.default.createElement(material_1.TextField, { label: "Field Name", helperText: "This name should be a valid JS name, only containing english characters, underline and numbers", value: name, onChange: handleTitleChanged }),
                    react_1.default.createElement(material_1.FormControl, null,
                        react_1.default.createElement(material_1.InputLabel, { htmlFor: "field-type" }, "Field Type"),
                        react_1.default.createElement(Select_1.default, { defaultValue: "", value: type, id: "field-type", label: "Field Type", onChange: function (e) { return setType(e.target.value); } }, fields.map(function (property) { return (react_1.default.createElement(material_1.MenuItem, { title: property.description, key: property.id, value: property.id }, property.title)); }))),
                    react_1.default.createElement(material_1.Button, { disabled: !name || !type, variant: "contained", onClick: function () { return handleSelectType(); } }, "Continue"))),
                step === 1 && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("p", null,
                        "Please complete the info for the ",
                        react_1.default.createElement("code", null, "name"),
                        " field"),
                    field && (react_1.default.createElement(mui_1.default, { formData: field.getSchema(), schema: field.getBuilderSchema(), validator: validator_ajv8_1.default, onSubmit: function (_a) {
                            var formData = _a.formData;
                            return handleSubmit(formData);
                        } }))))))));
};
exports.default = AddFieldModal;
