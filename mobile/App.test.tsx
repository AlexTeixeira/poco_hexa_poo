import App from "./App";
import testContainer from "core/src/config/TestDIContainer";
import {TodoRepository} from "core/src/domain/todoAggregate/ports/TodoRepository";
import DIContainerType from "core/src/domain/DIContainerType";
import {Todo} from "core/src/domain/todoAggregate/Todo";
import * as React from "react";
import {renderWithProviders} from "./utils/test-utils";
import {TodoStatus} from "core/src/domain/todoAggregate/TodoStatus";
import {act, fireEvent, screen} from "@testing-library/react-native";
import {Todos} from "client/src/pages/todos/Todos";


async function createTodosAsync(initialTodos: Todo[]) {
    const todoRepository = testContainer.get<TodoRepository>(DIContainerType.TodoRepository);
    for (let item of initialTodos) {
        await todoRepository.createAsync(new Todo(item.id, item.title, item.description))
    }
}


describe("App", () => {

    beforeEach(() => {
        const todoRepository = testContainer.get<TodoRepository>(DIContainerType.TodoRepository);
        todoRepository.clear();
    })

    const createTodoAsync = (todos: Todo[]) => {
        const todoRepository = testContainer.get<TodoRepository>(DIContainerType.TodoRepository);
        for (let todo of todos) {
            todoRepository.createAsync(todo)
        }
    }

    test('should load some todos', async () => {
        createTodoAsync([new Todo("1", "title", "description")]);
        const {findAllByTestId} = renderWithProviders(<App/>);
        const todos = await findAllByTestId("todo.card.new");
        expect(todos).toHaveLength(1);
    });

    test('should load todos in correct containers', async () => {
        createTodoAsync([
            {id: "1", title: "title 1", description: "description", state: TodoStatus.New} as Todo,
            {id: "2", title: "title 2", description: "description", state: TodoStatus.InProgress} as Todo,
            {id: "3", title: "title 3", description: "description", state: TodoStatus.Done} as Todo
        ]);
        const {findByText} = renderWithProviders(<App/>);
        expect(screen.toJSON()).toMatchSnapshot();


        expect(await findByText("title 1")).toBeDefined()
        expect(await findByText("title 2")).toBeDefined()
        expect(await findByText("title 3")).toBeDefined()
    });


    test("add a todo should display the todo", async () => {
        const {findByText, findAllByTestId, findByPlaceholderText} = renderWithProviders(<App/>);

        const titleElement = await screen.findByPlaceholderText("todo.title")
        const descriptionElement = await screen.findByPlaceholderText("todo.description")
        const buttonElement = await screen.findByText("todo.add")

        await act(() => {
            fireEvent(titleElement, "onChangeText", "title")
            fireEvent(descriptionElement, "onChangeText", "description")
        });

        await act(() => {
            fireEvent.press(buttonElement)
        });

        expect(await screen.findAllByTestId("todo.card.new")).toHaveLength(1);
        expect(await screen.findByText("title")).toBeDefined()
    });

    test("todo without title should popup an error", async () => {
        const {findByText, queryAllByTestId, findByPlaceholderText} = renderWithProviders(<App/>);

        const titleElement = await findByPlaceholderText("todo.title")
        const descriptionElement = await findByPlaceholderText("todo.description")
        const buttonElement = await findByText("todo.add")

        await act(() => {
            fireEvent(titleElement, "onChangeText", "")
            fireEvent(descriptionElement, "onChangeText", "description")
        });

        await act(() => {
            fireEvent.press(buttonElement)
        });


        await expect(await findByText("Title is required")).toBeDefined()
    });

    test("todo without description should popup an error", async () => {
        const {findByText, queryAllByTestId, findByPlaceholderText} = renderWithProviders(<App/>);

        const titleElement = await findByPlaceholderText("todo.title")
        const descriptionElement = await findByPlaceholderText("todo.description")
        const buttonElement = await findByText("todo.add")

        await act(() => {
            fireEvent(titleElement, "onChangeText", "title")
            fireEvent(descriptionElement, "onChangeText", "")
        });

        await act(() => {
            fireEvent.press(buttonElement)
        });

        expect(await findByText("Description is required")).toBeDefined()
    });

    test("delete a todo should remove the todo", async () => {

        const initialTodos: Todo[] = [{id: "741", title: "title", description: "description"} as Todo]
        await createTodosAsync(initialTodos);
        const {findByText, queryAllByTestId} = renderWithProviders(<App/>);

        const deleteButtonElement = await findByText("todo.delete 741")

        await act(() => {
            fireEvent.press(deleteButtonElement)
        });

        expect(await queryAllByTestId("todo.card")).toHaveLength(0);
    });

    // test("click on edit button should move to edit mode", async () => {
    //     const initialTodos = {
    //         status: 'idle',
    //         items: [{id: "741", title: "title", description: "description"}],
    //         errors: []
    //     }
    //     await createTodosAsync(initialTodos);
    //     const {findByText, findByDisplayValue} = renderWithProviders(<App/>);
    //
    //     const editButtonElement = await findByText("todo.edit 741")
    //     act(() => {
    //         fireEvent.click(editButtonElement)
    //     });
    //     expect(await findByDisplayValue("title")).toBeDefined()
    //     expect(await findByDisplayValue("description")).toBeDefined()
    //     expect(await findByText("todo.update")).toBeDefined()
    // });
});