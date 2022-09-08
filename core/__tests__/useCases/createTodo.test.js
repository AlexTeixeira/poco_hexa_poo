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
const Todo_1 = require("../../src/domain/todoAggregate/Todo");
const store_1 = require("../../src/application/states/app/store");
const createTodo_1 = require("../../src/application/states/features/todo/useCases/createTodo");
const todosSlice_1 = require("../../src/application/states/features/todo/todosSlice");
describe("createTodo", () => {
    const todoGuid = "some-valid-guid";
    function dispatchTodoAsync(title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            return store_1.store.dispatch((0, createTodo_1.createTodoAsync)({
                id: todoGuid,
                title: title,
                description: description,
            }));
        });
    }
    function dispatchTodoAndReturnErrorAsync(title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dispatchTodoAsync(title, description);
            return store_1.store.getState().todos.error;
        });
    }
    test("unvalid title should raise an error", () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield dispatchTodoAndReturnErrorAsync("", "some valid description");
        yield expect(error).toBeDefined();
        // @ts-ignore
        expect(error.errors.map(err => err.message)).toContain("Title is required");
    }));
    test("unvalid description should raise an error", () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield dispatchTodoAndReturnErrorAsync("My title", "");
        yield expect(error).toBeDefined();
        // @ts-ignore
        expect(error.errors.map(err => err.message)).toContain("Description is required");
    }));
    test("valid todo should be created", () => __awaiter(void 0, void 0, void 0, function* () {
        const todoAttempt = new Todo_1.Todo(todoGuid, "some valid title", "some valid description");
        yield dispatchTodoAsync("some valid title", "some valid description");
        const todo = (0, todosSlice_1.selectTodoById)(store_1.store.getState().todos.items, todoGuid);
        expect(todo).toStrictEqual(todoAttempt);
    }));
});
//# sourceMappingURL=createTodo.test.js.map