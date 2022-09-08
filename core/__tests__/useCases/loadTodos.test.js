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
const store_1 = require("../../src/application/states/app/store");
const loadTodos_1 = require("../../src/application/states/features/todo/useCases/loadTodos");
describe("loadTodos", () => {
    const todoAttempt = new Todo_1.Todo("1", "title", "description");
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const todoRepository = TestDIContainer_1.default.get(DIContainerType_1.default.TodoRepository);
        yield todoRepository.createAsync(todoAttempt);
    }));
    test("should load todos", () => __awaiter(void 0, void 0, void 0, function* () {
        yield store_1.store.dispatch((0, loadTodos_1.loadTodosAsync)());
        expect(store_1.store.getState().todos.items).toHaveLength(1);
        expect(store_1.store.getState().todos.items[0]).toStrictEqual(todoAttempt);
    }));
});
//# sourceMappingURL=loadTodos.test.js.map