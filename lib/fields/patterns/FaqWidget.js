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
exports.FaqWidget = void 0;
var StringField_1 = require("../primitives/StringField");
var ObjectField_1 = require("../containers/ObjectField");
var immer_1 = require("immer");
var ArrayField_1 = require("../containers/ArrayField");
var constants_1 = require("../../constants");
var FaqWidget = /** @class */ (function (_super) {
    __extends(FaqWidget, _super);
    function FaqWidget(name) {
        var _this = _super.call(this, name) || this;
        _this.title = 'Frequently Asked Questions';
        _this.setSchema({
            items: {
                // @ts-expect-error TODO: fix
                question: {
                    type: constants_1.SCHEMA_TYPE.STRING,
                    title: 'FAQ Question',
                },
                answer: {
                    type: constants_1.SCHEMA_TYPE.STRING,
                    title: 'FAQ Answer',
                },
            },
        });
        return _this;
    }
    FaqWidget.prototype.getBuilderSchema = function () {
        // TODO: fix
        return (0, immer_1.produce)(_super.prototype.getBuilderSchema.call(this), function (draft) {
            var items = new ObjectField_1.ObjectField('items');
            items.setSchema({
                properties: {
                    question: new StringField_1.StringField('question').getBuilderSchema(),
                    answers: new StringField_1.StringField('answers').getBuilderSchema(),
                },
            });
            if (draft === null || draft === void 0 ? void 0 : draft.items)
                draft.items = items.getBuilderSchema();
        });
    };
    return FaqWidget;
}(ArrayField_1.ArrayField));
exports.FaqWidget = FaqWidget;
