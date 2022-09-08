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
const TestDIContainer_1 = __importDefault(require("../../src/config/TestDIContainer"));
const DIContainerType_1 = __importDefault(require("../../src/domain/DIContainerType"));
const Todo_1 = require("../../src/domain/todoAggregate/Todo");
const TodoStatus_1 = require("../../src/domain/todoAggregate/TodoStatus");
const store_1 = require("../../src/application/states/app/store");
const updateStateTodo_1 = require("../../src/application/states/features/todo/useCases/updateStateTodo");
const todosSlice_1 = require("../../src/application/states/features/todo/todosSlice");
const BeforeHook_1 = require("../../__acceptance_tests__/commons/BeforeHook");
describe("updateTodo", () => {
    const todoId = "some-valid-guid";
    let todoRepository;
    function dispatchTodoAsync(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            return store_1.store.dispatch((0, updateStateTodo_1.updateTodoStateAsync)({
                id: id,
                state: state,
            }));
        });
    }
    function dispatchTodoAndReturnErrorAsync(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dispatchTodoAsync(id, state);
            return store_1.store.getState().todos.error;
        });
    }
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        todoRepository = TestDIContainer_1.default.get(DIContainerType_1.default.TodoRepository);
        (0, BeforeHook_1.resetTodoRepository)(todoRepository);
        yield todoRepository.createAsync(new Todo_1.Todo(todoId, "My first todo", "My first todo description"));
    }));
    test("not found todo should raise an error", () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield dispatchTodoAndReturnErrorAsync("bad-guid", TodoStatus_1.TodoStatus.InProgress);
        yield expect(error).toBeDefined();
        // @ts-ignore
        expect(error.errors.map(err => err.message)).toContain("Selected todo does not exist");
    }));
    test.each([TodoStatus_1.TodoStatus.New, TodoStatus_1.TodoStatus.InProgress, TodoStatus_1.TodoStatus.Done])("valid todo should be updated", (state) => __awaiter(void 0, void 0, void 0, function* () {
        yield dispatchTodoAsync(todoId, state);
        const todo = (0, todosSlice_1.selectTodoById)(store_1.store.getState().todos.items, todoId);
        expect(todo === null || todo === void 0 ? void 0 : todo.state).toStrictEqual(state);
    }));
});
//# sourceMappingURL=updateTodoState.test.js.map