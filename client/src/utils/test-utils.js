"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderWithProviders = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const react_redux_1 = require("react-redux");
const store_1 = require("core/src/application/states/app/store");
function renderWithProviders(ui, _a = {}) {
    var { preloadedState = {}, 
    // Automatically create a store instance if no store was passed in
    store = (0, store_1.setupStore)(preloadedState) } = _a, renderOptions = __rest(_a, ["preloadedState", "store"]);
    function Wrapper({ children }) {
        return react_1.default.createElement(react_1.default.StrictMode, null,
            react_1.default.createElement(react_redux_1.Provider, { store: store }, children));
    }
    // Return an object with the store and all of RTL's query functions
    return Object.assign({ store }, (0, react_2.render)(ui, Object.assign({ wrapper: Wrapper }, renderOptions)));
}
exports.renderWithProviders = renderWithProviders;
//# sourceMappingURL=test-utils.js.map