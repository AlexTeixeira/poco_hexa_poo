import { TodoStatus } from "./TodoStatus";
export declare class Todo {
    id: string;
    title: string;
    description: string;
    private _state;
    constructor(id: string, title: string, description: string);
    get state(): TodoStatus;
    set state(state: TodoStatus);
}
