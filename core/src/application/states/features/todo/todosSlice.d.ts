import { EntityState } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { SpecificationErrorResult } from "../../../../domain/core/Specification";
import { Todo } from "../../../../domain/todoAggregate/Todo";
import { TodoStatus } from "../../../../domain/todoAggregate/TodoStatus";
export interface TodosState extends EntityState<Todo> {
    status: 'idle' | 'loading' | 'failed' | 'success';
    error: SpecificationErrorResult | undefined;
}
export declare const todosSlice: import("@reduxjs/toolkit").Slice<TodosState, {}, "todos">;
export declare const selectTodos: (state: {
    todos: TodosState;
}) => Todo[], selectTodoById: (state: {
    todos: TodosState;
}, id: import("@reduxjs/toolkit").EntityId) => Todo | undefined;
export declare const selectTodosByState: ((state: {
    todos: TodosState;
}, params_0: TodoStatus) => Todo[]) & import("reselect").OutputSelectorFields<(args_0: Todo[], args_1: TodoStatus) => Todo[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectErrorByKey: (state: RootState, key: string) => string | undefined;
declare const _default: import("redux").Reducer<TodosState, import("redux").AnyAction>;
export default _default;
