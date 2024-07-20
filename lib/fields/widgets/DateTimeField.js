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
exports.DateTimeField = void 0;
var StringField_1 = require("../primitives/StringField");
var DateTimeField = /** @class */ (function (_super) {
    __extends(DateTimeField, _super);
    function DateTimeField(name) {
        var _this = _super.call(this, name) || this;
        _this.format = 'date-time';
        return _this;
    }
    return DateTimeField;
}(StringField_1.StringField));
exports.DateTimeField = DateTimeField;
