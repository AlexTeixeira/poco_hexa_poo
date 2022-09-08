import { Todo } from "../../../../../domain/todoAggregate/Todo";
import { ServiceProviderType } from "../../config/ThunkServiceProvider";
export declare const deleteTodoAsync: import("@reduxjs/toolkit").AsyncThunk<Todo[], string, {
    extra: ServiceProviderType;
}>;
