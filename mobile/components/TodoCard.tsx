import {TodoDto} from "core/src/application/states/features/todo/models/TodoDto";
import React,{FC} from "react";
import {View, Text, Button} from "react-native";
import {deleteTodoAsync} from "core/src/application/states/features/todo/useCases/deleteTodo";
import {useAppDispatch} from "core/src/application/states/app/hooks";

type TodoCardProps = {
    todo: TodoDto
}

export const TodoCard: FC<TodoCardProps> = ({todo}) => {
    const dispatch = useAppDispatch();

    return (<View>
        <Text>{todo.title}</Text>
        <Button title={"todo.delete " + todo.id} onPress={() => dispatch(deleteTodoAsync(todo.id))}></Button>
    </View>)
}

export const MemoizedTodoCard= React.memo(TodoCard);