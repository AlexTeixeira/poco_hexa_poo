import { Todo } from "../../../../../domain/todoAggregate/Todo";
import { ServiceProviderType } from "../../config/ThunkServiceProvider";
export declare const loadTodosAsync: import("@reduxjs/toolkit").AsyncThunk<Todo[], undefined, {
    extra: ServiceProviderType;
}>;
