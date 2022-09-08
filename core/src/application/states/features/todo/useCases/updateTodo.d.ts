import { Todo } from "../../../../../domain/todoAggregate/Todo";
import { TodoDto } from "../models/TodoDto";
import { ServiceProviderType } from "../../config/ThunkServiceProvider";
export declare const updateTodoAsync: import("@reduxjs/toolkit").AsyncThunk<Todo[], TodoDto, {
    extra: ServiceProviderType;
}>;
