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
const Todo_1 = require("../../../src/domain/todoAggregate/Todo");
const todoConstants_steps_1 = require("./todoConstants.steps");
const expect_1 = require("expect");
const store_1 = require("../../../src/application/states/app/store");
const updateTodo_1 = require("../../../src/application/states/features/todo/useCases/updateTodo");
const todosSlice_1 = require("../../../src/application/states/features/todo/todosSlice");
let todoTitle = "";
let todoDescription = "";
let todoAttempt;
(0, cucumber_1.Given)(/^the todo "([^"]*)"$/, function (id) {
    todoConstants_steps_1.TodoConstant.todoId = id;
});
(0, cucumber_1.Given)(/^I change the todo with (.*) and (.*)$/, function (title, description) {
    todoTitle = title;
    todoDescription = description;
});
(0, cucumber_1.When)(/^I update the todo$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (todoTitle !== "" && todoDescription !== "") {
            todoAttempt = new Todo_1.Todo(todoConstants_steps_1.TodoConstant.todoId, todoTitle, todoDescription);
        }
        yield store_1.store.dispatch((0, updateTodo_1.updateTodoAsync)({
            id: todoConstants_steps_1.TodoConstant.todoId,
            title: todoTitle,
            description: todoDescription,
        }));
    });
});
(0, cucumber_1.Then)(/^the todo should be updated$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const todo = (0, todosSlice_1.selectTodoById)(store_1.store.getState().todos.items, todoConstants_steps_1.TodoConstant.todoId);
        (0, expect_1.expect)(todo).toStrictEqual(todoAttempt);
    });
});
//# sourceMappingURL=UpdateTodoDefinitions.steps.js.map