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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSchema = exports.SchemaProvider = exports.SchemaContext = void 0;
var react_1 = __importStar(require("react"));
var JsonSchemaBuilder_1 = require("../builder/JsonSchemaBuilder");
var constants_1 = require("../constants");
exports.SchemaContext = (0, react_1.createContext)({
    schema: new JsonSchemaBuilder_1.JsonSchemaBuilder().setType('object').build(),
    dispatch: function () { return null; },
    fields: [],
});
var schemaReducer = function (state, action) {
    var builder = new JsonSchemaBuilder_1.JsonSchemaBuilder(state);
    switch (action.type) {
        case 'ADD_PROPERTY':
            builder.addNestedProperty(action.payload.name, action.payload.schema);
            break;
        case 'UPDATE_PROPERTY':
            builder.editProperty(action.payload.name, action.payload.schema);
            break;
        case 'DELETE_PROPERTY':
            builder.deleteProperty(action.payload.name);
            break;
        case 'ADD_REQUIRED':
            builder.addRequired(action.payload.name);
            break;
        case 'DELETE_REQUIRED':
            builder.deleteRequired(action.payload.name);
            break;
        default:
            return state;
    }
    return builder.build();
};
var SchemaProvider = function (_a) {
    var children = _a.children, extraFields = _a.extraFields, value = _a.value;
    var _b = (0, react_1.useReducer)(schemaReducer, value || new JsonSchemaBuilder_1.JsonSchemaBuilder().setType('object').build()), schema = _b[0], dispatch = _b[1];
    return (react_1.default.createElement(exports.SchemaContext.Provider, { value: { schema: schema, dispatch: dispatch, fields: __spreadArray(__spreadArray([], constants_1.PROPERTIES, true), extraFields, true) } }, children));
};
exports.SchemaProvider = SchemaProvider;
var useSchema = function () { return (0, react_1.useContext)(exports.SchemaContext); };
exports.useSchema = useSchema;
