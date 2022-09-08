import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {RootState,} from "core/src/application/states/app/store";
import * as React from 'react';
import {TodoStatus} from "core/src/domain/todoAggregate/TodoStatus";
import {TodoDto} from "core/src/application/states/features/todo/models/TodoDto";
import {useAppDispatch, useAppSelector} from "core/src/application/states/app/hooks";
import {selectErrorByKey, selectTodosByState,} from "core/src/application/states/features/todo/todosSlice";
import {useEffect, useState} from "react";
import {createTodoAsync} from "core/src/application/states/features/todo/useCases/createTodo";
import {useSelector} from "react-redux";
import {deleteTodoAsync} from "core/src/application/states/features/todo/useCases/deleteTodo";
import {loadTodosAsync} from "core/src/application/states/features/todo/useCases/loadTodos";

let fakeId = 0;
export default function App() {
    const dispatch = useAppDispatch();

    const useSelectTodoByState = (todoState: TodoStatus) => {
        return useSelector((state: RootState) => selectTodosByState(state, todoState)) ?? [];
    }

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const todoStatus = useAppSelector(state => state.todos.status)
    useEffect(() => {
        if (todoStatus === 'idle') {
            dispatch(loadTodosAsync())
        }
    }, [todoStatus])

    function addTodo() {
        fakeId = fakeId + 1;
        dispatch(createTodoAsync({
            id: fakeId.toString(),
            title: title,
            description: description
        } as TodoDto));
    }

    const useErrorByKey = (key: string) => {
        const error =
            useAppSelector((state: RootState) => selectErrorByKey(state, key));
        return <Text>{error}</Text>
    }

    return (
        <>
            <View>
                <TextInput placeholder={"todo.title"} onChangeText={(val) => setTitle(val)}></TextInput>
                {useErrorByKey("title")}
                <TextInput placeholder={"todo.description"} onChangeText={(val) => setDescription(val)}></TextInput>
                {useErrorByKey("description")}
                <Button title={"todo.add"} onPress={addTodo}></Button>
            </View>
            <View testID={"todo.card.new"}>
                {useSelectTodoByState(TodoStatus.New).map(todo => (<View key={todo.id}>
                    <Text>{todo.title}</Text>
                    <Button title={"todo.delete " + todo.id} onPress={() => dispatch(deleteTodoAsync(todo.id))}></Button>
                    </View>))}
            </View>
            <View testID={"todo.card.inProgress"}>
                {useSelectTodoByState(TodoStatus.InProgress).map(todo => (<View key={todo.id}>
                    <Text>{todo.title}</Text>
                    <Button title={"todo.delete " + todo.id} onPress={() => dispatch(deleteTodoAsync(todo.id))}></Button>
                </View>))}
            </View>
            <View testID={"todo.card.done"}>
                {useSelectTodoByState(TodoStatus.Done).map(todo => (<View key={todo.id}>
                    <Text>{todo.title}</Text>
                    <Button title={"todo.delete " + todo.id} onPress={() => dispatch(deleteTodoAsync(todo.id))}></Button>
                </View>))}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
