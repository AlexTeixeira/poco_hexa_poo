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
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const TodoStatus_1 = require("../../../src/domain/todoAggregate/TodoStatus");
const store_1 = require("../../../src/application/states/app/store");
const todoConstants_steps_1 = require("./todoConstants.steps");
const updateStateTodo_1 = require("../../../src/application/states/features/todo/useCases/updateStateTodo");
const todosSlice_1 = require("../../../src/application/states/features/todo/todosSlice");
const expect_1 = require("expect");
let todoState = TodoStatus_1.TodoStatus.New;
(0, cucumber_1.When)(/^I update the status to "([^"]*)"$/, function (state) {
    return __awaiter(this, void 0, void 0, function* () {
        todoState = state;
        yield store_1.store.dispatch((0, updateStateTodo_1.updateTodoStateAsync)({
            id: todoConstants_steps_1.TodoConstant.todoId,
            state: todoState,
        }));
    });
});
(0, cucumber_1.Then)(/^the todo should have the correct status$/, function () {
    const todo = (0, todosSlice_1.selectTodoById)(store_1.store.getState().todos.items, todoConstants_steps_1.TodoConstant.todoId);
    (0, expect_1.expect)(todo === null || todo === void 0 ? void 0 : todo.state).toStrictEqual(todoState);
});
//# sourceMappingURL=UpdateTodoStateDefinitions.steps.js.map