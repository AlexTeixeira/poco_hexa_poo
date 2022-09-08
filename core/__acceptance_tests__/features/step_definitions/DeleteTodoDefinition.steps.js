"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const todoConstants_steps_1 = require("./todoConstants.steps");
const TestDIContainer_1 = __importDefault(require("../../../src/config/TestDIContainer"));
const DIContainerType_1 = __importDefault(require("../../../src/domain/DIContainerType"));
const store_1 = require("../../../src/application/states/app/store");
const deleteTodo_1 = require("../../../src/application/states/features/todo/useCases/deleteTodo");
const todosSlice_1 = require("../../../src/application/states/features/todo/todosSlice");
const expect_1 = require("expect");
let errorDriver;
(0, cucumber_1.Before)(() => {
    errorDriver = TestDIContainer_1.default.get(DIContainerType_1.default.ErrorDriver);
});
(0, cucumber_1.When)(/^I delete the todo$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield store_1.store.dispatch((0, deleteTodo_1.deleteTodoAsync)(todoConstants_steps_1.TodoConstant.todoId));
    });
});
(0, cucumber_1.Then)(/^the todo should be deleted$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const todo = (0, todosSlice_1.selectTodoById)(store_1.store.getState().todos.items, todoConstants_steps_1.TodoConstant.todoId);
        (0, expect_1.expect)(todo).toBeUndefined();
    });
});
//# sourceMappingURL=DeleteTodoDefinition.steps.js.map