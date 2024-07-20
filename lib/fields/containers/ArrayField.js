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
exports.ArrayField = void 0;
var JsonSchemaField_1 = require("../JsonSchemaField");
var immer_1 = require("immer");
var constants_1 = require("../../constants");
var ArrayField = /** @class */ (function (_super) {
    __extends(ArrayField, _super);
    function ArrayField(name) {
        var _this = _super.call(this, name) || this;
        _this.type = constants_1.SCHEMA_TYPE.ARRAY;
        return _this;
    }
    ArrayField.prototype.setItems = function (items) {
        this.items = items;
        return this;
    };
    ArrayField.prototype.setItemsType = function (itemsType) {
        this.itemsType = itemsType;
        return this;
    };
    ArrayField.prototype.setMaxItems = function (maxItems) {
        this.maxItems = maxItems;
        return this;
    };
    ArrayField.prototype.setMinItems = function (minItems) {
        this.minItems = minItems;
        return this;
    };
    ArrayField.prototype.setPrefixItems = function (prefixItems) {
        this.prefixItems = prefixItems;
        return this;
    };
    ArrayField.prototype.setUnevaluatedItems = function (unevaluatedItems) {
        this.unevaluatedItems = unevaluatedItems;
        return this;
    };
    ArrayField.prototype.setSchema = function (schema) {
        _super.prototype.setSchema.call(this, schema);
        if (schema.itemsType)
            this.setItemsType(schema.itemsType);
        if (schema.items)
            this.setItems(__assign(__assign({}, schema.items), (this.itemsType && { type: this.itemsType })));
        if (schema.maxItems)
            this.setMaxItems(schema.maxItems);
        if (schema.minItems)
            this.setMinItems(schema.minItems);
        if (schema.prefixItems)
            this.setPrefixItems(schema.prefixItems);
        if (schema.unevaluatedItems)
            this.setUnevaluatedItems(schema.unevaluatedItems);
    };
    ArrayField.prototype.getBuilderSchema = function () {
        var arraySchema = {
            itemsType: {
                title: 'Items Type',
                type: constants_1.SCHEMA_TYPE.STRING,
                enum: Object.values(constants_1.SCHEMA_TYPE.OBJECT),
            },
            prefixItems: {
                title: 'prefixItems',
                type: constants_1.SCHEMA_TYPE.OBJECT,
            },
            unevaluatedItems: {
                title: 'unevaluatedItems',
                type: constants_1.SCHEMA_TYPE.OBJECT,
            },
            minItems: {
                title: 'minItems',
                type: constants_1.SCHEMA_TYPE.NUMBER,
            },
            maxItems: {
                title: 'maxItems',
                type: constants_1.SCHEMA_TYPE.NUMBER,
            },
        };
        return (0, immer_1.produce)(_super.prototype.getBuilderSchema.call(this), function (draft) {
            Object.keys(arraySchema).forEach(function (key) {
                if (draft.properties)
                    draft.properties[key] = arraySchema[key];
            });
            draft.required = __spreadArray(__spreadArray([], (draft.required || []), true), ['items'], false);
        });
    };
    ArrayField.prototype.getSchema = function () {
        return __assign(__assign({}, _super.prototype.getSchema.call(this)), { items: __assign({ type: this.itemsType }, this.items), prefixItems: this.prefixItems, unevaluatedItems: this.unevaluatedItems, minItems: this.minItems, maxItems: this.maxItems });
    };
    return ArrayField;
}(JsonSchemaField_1.JsonSchemaField));
exports.ArrayField = ArrayField;
