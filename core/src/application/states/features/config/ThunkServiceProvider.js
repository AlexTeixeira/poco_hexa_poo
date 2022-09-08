"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThunkServiceProvider = void 0;
const ProdDIContainer_1 = __importDefault(require("../../../../config/ProdDIContainer"));
const TestDIContainer_1 = __importDefault(require("../../../../config/TestDIContainer"));
exports.ThunkServiceProvider = {
    container: process.env.NODE_ENV === "dev" ? ProdDIContainer_1.default : TestDIContainer_1.default
};
//# sourceMappingURL=ThunkServiceProvider.js.map