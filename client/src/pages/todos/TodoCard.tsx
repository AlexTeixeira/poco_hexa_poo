import React, {FC, useState} from "react";
import {TodoDto} from "core/src/application/states/features/todo/models/TodoDto";
import {deleteTodoAsync} from "core/src/application/states/features/todo/useCases/deleteTodo";
import {updateTodoAsync} from "core/src/application/states/features/todo/useCases/updateTodo";
import {useAppDispatch} from "core/src/application/states/app/hooks";
import {updateTodoStateAsync} from "core/src/application/states/features/todo/useCases/updateStateTodo";
import {TodoStatus} from "core/src/domain/todoAggregate/Index";

interface TodoCardProps {
    todo: TodoDto;
}

export const TodoCard: FC<TodoCardProps> = React.memo(({todo}) => {
    const dispatch = useAppDispatch();

    const [editMode, setEditMode] = useState<{ [key: string]: boolean }>();
    const [todoEdit, setTodoEdit] = useState<TodoDto>({
        id: "",
        title: "",
        description: ""
    });

    async function updateTodo(id: string) {
        await dispatch(updateTodoAsync({
            id,
            title: todoEdit.title,
            description: todoEdit.description
        }));

        setEditMode({...editMode, [id]: false});
    }

    function onGoEdit(todo: TodoDto) {
        setEditMode({
            [todo.id]: !editMode
        });

        setTodoEdit(todo);
    }


    return (
        <div>
            {editMode && editMode[todo.id] ? (
                <div>
                    <input value={todoEdit?.title} className={"col"} type={"text"}
                           placeholder={"todo.title"}
                           onInput={(event: React.ChangeEvent<HTMLInputElement>) => setTodoEdit({
                               ...todoEdit,
                               title: event.target.value
                           })}/>
                    <input value={todoEdit?.description} className={"col"} type={"text"}
                           placeholder={"todo.description"}
                           onInput={(event: React.ChangeEvent<HTMLInputElement>) => setTodoEdit({
                               ...todoEdit,
                               description: event.target.value
                           })}/>
                    <button onClick={() => updateTodo(todo.id)}>todo.update</button>
                </div>
            ) : (
                <div>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <div>
                        <button onClick={() => dispatch(deleteTodoAsync(todo.id))}>{"todo.delete " + todo.id}</button>
                        <button onClick={() => onGoEdit(todo)}>{"todo.edit " + todo.id}</button>
                        <button onClick={() => dispatch(updateTodoStateAsync({id: todo.id, state: TodoStatus.InProgress}))}>{"todo.updateState " + todo.id}</button>
                    </div>
                </div>
            )}

        </div>)
});