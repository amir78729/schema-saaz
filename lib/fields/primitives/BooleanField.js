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
exports.BooleanField = void 0;
var JsonSchemaField_1 = require("../JsonSchemaField");
var constants_1 = require("../../constants");
var BooleanField = /** @class */ (function (_super) {
    __extends(BooleanField, _super);
    function BooleanField(name) {
        var _this = _super.call(this, name) || this;
        _this.type = constants_1.SCHEMA_TYPE.BOOLEAN;
        return _this;
    }
    return BooleanField;
}(JsonSchemaField_1.JsonSchemaField));
exports.BooleanField = BooleanField;
