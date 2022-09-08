import {
    createEntityAdapter, createSelector,
    createSlice,
    Dictionary, EntityAdapter,
    EntityState,
    isAnyOf,
    PayloadAction
} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {SpecificationErrorResult} from "../../../../domain/core/Specification";
import {createTodoAsync} from "./useCases/createTodo";
import {Todo} from "../../../../domain/todoAggregate/Todo";
import {updateTodoAsync} from "./useCases/updateTodo";
import {deleteTodoAsync} from "./useCases/deleteTodo";
import {updateTodoStateAsync} from "./useCases/updateStateTodo";
import {loadTodosAsync} from "./useCases/loadTodos";
import {TodoStatus} from "../../../../domain/todoAggregate/TodoStatus";

export interface TodosState extends EntityState<Todo> {
    status: 'idle' | 'loading' | 'failed' | 'success';
    error: SpecificationErrorResult | undefined
}

const todoAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
    sortComparer: (a, b) => b.id.localeCompare(a.id),
})
const initialState: TodosState = todoAdapter.getInitialState({
    status: 'idle',
    error: undefined,
    entities: {} as Dictionary<Todo>,
    ids: []
})

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(isAnyOf(createTodoAsync.pending, updateTodoAsync.pending, deleteTodoAsync.pending, updateTodoStateAsync.pending,
                    loadTodosAsync.pending),
                (state) => {
                    state.status = 'loading';
                })
            .addMatcher(isAnyOf(createTodoAsync.fulfilled, updateTodoAsync.fulfilled, deleteTodoAsync.fulfilled, updateTodoStateAsync.fulfilled,
                    loadTodosAsync.fulfilled),
                (state, action: PayloadAction<Todo[]>) => {
                    state.status = 'success';
                    // @ts-ignore
                    todoAdapter.setAll(state, action.payload)
                })
            .addMatcher(isAnyOf(createTodoAsync.rejected, updateTodoAsync.rejected, deleteTodoAsync.rejected, updateTodoStateAsync.rejected,
                    loadTodosAsync.rejected),
                (state, action) => {
                    state.status = 'failed';
                    if (action.error.message) {
                        state.error = JSON.parse(action.error.message);
                    }
                });
    },
});

export const {
    selectAll: selectTodos,
    selectById: selectTodoById,
    // Pass in a selector that returns the posts slice of state
} = todoAdapter.getSelectors((state: RootState) => state.todos);

export const selectTodosByState = createSelector(
    [selectTodos, (_state: RootState, status: TodoStatus) => status],
    (todos, status) => todos.filter(todo => todo.state === status)
)
export const selectErrorByKey = (state: RootState, key: string) => state.todos.error?.errors.find(error => error.key === key)?.message;

export default todosSlice.reducer;