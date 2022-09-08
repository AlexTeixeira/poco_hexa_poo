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
const expect_1 = require("expect");
const store_1 = require("../../../src/application/states/app/store");
const createTodo_1 = require("../../../src/application/states/features/todo/useCases/createTodo");
const todosSlice_1 = require("../../../src/application/states/features/todo/todosSlice");
let todoTitle = "";
let todoDescription = "";
let todoAttempt;
const todoId = "some-valid-guid";
function dispatchTodoAsync(title, description) {
    return store_1.store.dispatch((0, createTodo_1.createTodoAsync)({
        id: todoId,
        title: title,
        description: description,
    }));
}
(0, cucumber_1.Given)(/^I have a todo with (.*) and (.*)$/, function (title, description) {
    todoTitle = title !== null && title !== void 0 ? title : "";
    todoDescription = description !== null && description !== void 0 ? description : "";
});
(0, cucumber_1.When)('I create the todo', function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (todoTitle !== "" && todoDescription !== "") {
            todoAttempt = new Todo_1.Todo(todoId, todoTitle, todoDescription);
        }
        yield dispatchTodoAsync(todoTitle, todoDescription);
    });
});
(0, cucumber_1.Then)('Todo should be created', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const todo = (0, todosSlice_1.selectTodoById)(store_1.store.getState().todos.items, todoId);
        (0, expect_1.expect)(todo).toStrictEqual(todoAttempt);
    });
});
//# sourceMappingURL=CreateTodoDefinitions.steps.js.map