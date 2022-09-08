"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = exports.setupStore = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const todosSlice_1 = __importDefault(require("../features/todo/todosSlice"));
const ThunkServiceProvider_1 = require("../features/config/ThunkServiceProvider");
const reducers = {
    todos: todosSlice_1.default,
};
const rootReducer = (0, toolkit_1.combineReducers)(reducers);
function getMiddleware() {
    return (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: ThunkServiceProvider_1.ThunkServiceProvider,
        },
        serializableCheck: false,
    });
}
function setupStore(preloadedState) {
    return (0, toolkit_1.configureStore)({
        reducer: rootReducer,
        preloadedState,
        middleware: getMiddleware()
    });
}
exports.setupStore = setupStore;
exports.store = setupStore();
//# sourceMappingURL=store.js.map