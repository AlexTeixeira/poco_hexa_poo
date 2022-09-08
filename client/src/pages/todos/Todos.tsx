import React, {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "core/src/application/states/app/hooks";
import {
    selectErrorByKey,
    selectTodos,
    selectTodosByState,
    TodosState
} from "core/src/application/states/features/todo/todosSlice";
import {createTodoAsync} from "core/src/application/states/features/todo/useCases/createTodo";
import {TodoDto} from "core/src/application/states/features/todo/models/TodoDto";
import {RootState} from "core/src/application/states/app/store";
import {loadTodosAsync} from "core/src/application/states/features/todo/useCases/loadTodos";
import {TodoCard} from "./TodoCard";
import {TodoStatus} from "core/src/domain/todoAggregate/TodoStatus";
import {useSelector} from "react-redux";
import "./Todos.css";

let fakeId = 0;

export const Todos: FC = () => {
    const dispatch = useAppDispatch();

    const todoStatus = useAppSelector(state => state.todos.status)

    useEffect(() => {
        if (todoStatus === 'idle') {
            dispatch(loadTodosAsync())
        }
    }, [todoStatus])

    const useErrorByKey = (key: string) => {
        const error =
            useAppSelector((state: RootState) => selectErrorByKey(state, key));
        return <span>{error}</span>
    }

    const useSelectTodoByState = (todoState: TodoStatus) => {
        return useSelector((state: RootState) => selectTodosByState(state, todoState)) ?? [];
    }

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function addTodo() {
        fakeId = fakeId + 1;
        return () => dispatch(createTodoAsync({
            id: fakeId.toString(),
            title: title,
            description: description
        } as TodoDto));
    }

    return (
        <section className={"container"}>
            <div className={"column"}>
                <div className={"col, column"}>
                    <input className={"col"} type={"text"} placeholder={"todo.title"}
                           onInput={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}/>
                    <div>{useErrorByKey("title")}</div>
                    <input className={"col"} type={"text"} placeholder={"todo.description"}
                           onInput={(event: React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}/>
                    <div>{useErrorByKey("description")}</div>
                    <button className={"btn btn-primary"}
                            onClick={addTodo()}>todo.add
                    </button>
                </div>
                <div className={"row"}>
                    <div data-testid={"todo.card.new"}>
                        {useSelectTodoByState(TodoStatus.New).map(todo => <TodoCard key={todo.id} todo={todo}/>)}</div>
                    <div data-testid={"todo.card.inProgress"}>
                        {useSelectTodoByState(TodoStatus.InProgress).map(todo => <TodoCard key={todo.id}
                                                                                           todo={todo}/>)}</div>
                    <div data-testid={"todo.card.done"}>
                        {useSelectTodoByState(TodoStatus.Done).map(todo => <TodoCard key={todo.id} todo={todo}/>)}</div>
                </div>
            </div>
        </section>
    );
}