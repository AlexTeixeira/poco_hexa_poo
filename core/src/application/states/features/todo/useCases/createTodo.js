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
exports.createTodoAsync = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const DIContainerType_1 = __importDefault(require("../../../../../domain/DIContainerType"));
const Todo_1 = require("../../../../../domain/todoAggregate/Todo");
exports.createTodoAsync = (0, toolkit_1.createAsyncThunk)('todos/post', (todoDto, { extra }) => __awaiter(void 0, void 0, void 0, function* () {
    const todoRepository = extra.container.get(DIContainerType_1.default.TodoRepository);
    const todo = new Todo_1.Todo(todoDto.id, todoDto.title, todoDto.description);
    yield todoRepository.createAsync(todo);
    return todoRepository.getAllAsync();
}));
//# sourceMappingURL=createTodo.js.map