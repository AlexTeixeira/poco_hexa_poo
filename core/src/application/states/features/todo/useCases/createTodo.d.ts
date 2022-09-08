import { TodoDto } from "../models/TodoDto";
import { ServiceProviderType } from "../../config/ThunkServiceProvider";
import { Todo } from "../../../../../domain/todoAggregate/Todo";
export declare const createTodoAsync: import("@reduxjs/toolkit").AsyncThunk<Todo[], TodoDto, {
    extra: ServiceProviderType;
}>;
