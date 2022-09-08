"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectErrorByKey = exports.selectTodosByState = exports.selectTodoById = exports.selectTodos = exports.todosSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const createTodo_1 = require("./useCases/createTodo");
const updateTodo_1 = require("./useCases/updateTodo");
const deleteTodo_1 = require("./useCases/deleteTodo");
const updateStateTodo_1 = require("./useCases/updateStateTodo");
const loadTodos_1 = require("./useCases/loadTodos");
const todoAdapter = (0, toolkit_1.createEntityAdapter)({
    sortComparer: (a, b) => b.id.localeCompare(a.id),
});
const initialState = todoAdapter.getInitialState({
    status: 'idle',
    error: undefined,
    entities: {},
    ids: []
});
exports.todosSlice = (0, toolkit_1.createSlice)({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher((0, toolkit_1.isAnyOf)(createTodo_1.createTodoAsync.pending, updateTodo_1.updateTodoAsync.pending, deleteTodo_1.deleteTodoAsync.pending, updateStateTodo_1.updateTodoStateAsync.pending, loadTodos_1.loadTodosAsync.pending), (state) => {
            state.status = 'loading';
        })
            .addMatcher((0, toolkit_1.isAnyOf)(createTodo_1.createTodoAsync.fulfilled, updateTodo_1.updateTodoAsync.fulfilled, deleteTodo_1.deleteTodoAsync.fulfilled, updateStateTodo_1.updateTodoStateAsync.fulfilled, loadTodos_1.loadTodosAsync.fulfilled), (state, action) => {
            state.status = 'success';
            // @ts-ignore
            todoAdapter.setAll(state, action.payload);
        })
            .addMatcher((0, toolkit_1.isAnyOf)(createTodo_1.createTodoAsync.rejected, updateTodo_1.updateTodoAsync.rejected, deleteTodo_1.deleteTodoAsync.rejected, updateStateTodo_1.updateTodoStateAsync.rejected, loadTodos_1.loadTodosAsync.rejected), (state, action) => {
            state.status = 'failed';
            if (action.error.message) {
                state.error = JSON.parse(action.error.message);
            }
        });
    },
});
_a = todoAdapter.getSelectors((state) => state.todos), exports.selectTodos = _a.selectAll, exports.selectTodoById = _a.selectById;
exports.selectTodosByState = (0, toolkit_1.createSelector)([exports.selectTodos, (_state, status) => status], (todos, status) => todos.filter(todo => todo.state === status));
const selectErrorByKey = (state, key) => { var _a, _b; return (_b = (_a = state.todos.error) === null || _a === void 0 ? void 0 : _a.errors.find(error => error.key === key)) === null || _b === void 0 ? void 0 : _b.message; };
exports.selectErrorByKey = selectErrorByKey;
exports.default = exports.todosSlice.reducer;
//# sourceMappingURL=todosSlice.js.map