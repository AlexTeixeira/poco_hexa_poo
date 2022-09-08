import { Todo } from "../../../../../domain/todoAggregate/Todo";
import { ServiceProviderType } from "../../config/ThunkServiceProvider";
import { TodoStatus } from "../../../../../domain/todoAggregate/TodoStatus";
export declare const updateTodoStateAsync: import("@reduxjs/toolkit").AsyncThunk<Todo[], {
    id: string;
    state: TodoStatus;
}, {
    extra: ServiceProviderType;
}>;
