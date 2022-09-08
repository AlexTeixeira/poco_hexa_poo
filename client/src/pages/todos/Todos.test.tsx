import {act, fireEvent, render} from "@testing-library/react";
import React from "react";
import {Todos} from "./Todos";
import testContainer from "core/src/config/TestDIContainer";
import {TodoRepository} from "core/src/domain/todoAggregate/ports/TodoRepository";
import DIContainerType from "core/src/domain/DIContainerType";
import {Todo} from "core/src/domain/todoAggregate/Todo";
import {TodoStatus} from "core/src/domain/todoAggregate/Index";
import {renderWithProviders} from "../../utils/test-utils";

async function createTodosAsync(initialTodos: { items: { description: string; id: string; title: string }[]; errors: any[]; status: string }) {
    const todoRepository = testContainer.get<TodoRepository>(DIContainerType.TodoRepository);
    for (let item of initialTodos.items) {
        await todoRepository.createAsync(new Todo(item.id, item.title, item.description))
    }
}

describe("todo screen", () => {
    beforeEach(() => {
        const todoRepository = testContainer.get<TodoRepository>(DIContainerType.TodoRepository);
        todoRepository.clear();
    })

    test("init page should display any todo", async () => {

        const {queryAllByTestId} = renderWithProviders(<Todos/>);
        expect(queryAllByTestId("todo.card")).toStrictEqual([])
    });

    test("add a todo should display the todo", async () => {
        const {findByText, findAllByTestId, findByPlaceholderText, } = renderWithProviders(<Todos/>);

        const titleElement = await findByPlaceholderText("todo.title")
        const descriptionElement = await findByPlaceholderText("todo.description")
        const buttonElement = await findByText("todo.add")

        act(() => {
            fireEvent.input(titleElement, {target: {value: "title"}})
            fireEvent.input(descriptionElement, {target: {value: "description"}})
            fireEvent.click(buttonElement)
        });

        expect(await findAllByTestId("todo.card.new")).toHaveLength(1);
        expect(await findByText("title")).toBeDefined();
    });

    test("todo without title should popup an error", async () => {
        const {findByText, queryAllByTestId, findByPlaceholderText} = renderWithProviders(<Todos/>);

        const titleElement = await findByPlaceholderText("todo.title")
        const descriptionElement = await findByPlaceholderText("todo.description")
        const buttonElement = await findByText("todo.add")

        act(() => {
            fireEvent.input(titleElement, {target: {value: ""}})
            fireEvent.input(descriptionElement, {target: {value: "description"}})
            fireEvent.click(buttonElement)
        });

        await expect(await findByText("Title is required")).toBeDefined()
    });

    test("todo without description should popup an error", async () => {
        const {findByText, queryAllByTestId, findByPlaceholderText} = renderWithProviders(<Todos/>);

        const titleElement = await findByPlaceholderText("todo.title")
        const descriptionElement = await findByPlaceholderText("todo.description")
        const buttonElement = await findByText("todo.add")

        act(() => {
            fireEvent.input(titleElement, {target: {value: "title"}})
            fireEvent.input(descriptionElement, {target: {value: ""}})
            fireEvent.click(buttonElement)
        });

        await expect(await findByText("Description is required")).toBeDefined()
    });

    test("delete a todo should remove the todo", async () => {

        const initialTodos = {
            status: 'idle',
            items: [{id: "741", title: "title", description: "description"}],
            errors: []
        }
        await createTodosAsync(initialTodos);
        const {findByText, findAllByTestId, queryAllByTestId} = renderWithProviders(<Todos/>);

        const deleteButtonElement = await findByText("todo.delete 741")

        await act(() => {
            fireEvent.click(deleteButtonElement)
        });

        expect(await queryAllByTestId("todo.card")).toHaveLength(0);
    });

    test("click on edit button should move to edit mode", async () => {
        const initialTodos = {
            status: 'idle',
            items: [{id: "741", title: "title", description: "description"}],
            errors: []
        }
        await createTodosAsync(initialTodos);
        const {findByText, findByDisplayValue} = renderWithProviders(<Todos/>);

        const editButtonElement = await findByText("todo.edit 741")
        act(() => {
            fireEvent.click(editButtonElement)
        });
        expect(await findByDisplayValue("title")).toBeDefined()
        expect(await findByDisplayValue("description")).toBeDefined()
        expect(await findByText("todo.update")).toBeDefined()
    });

    test("update a todo should update the todo", async () => {
        const initialTodos = {
            status: 'idle',
            items: [{id: "741", title: "title", description: "description"}],
            errors: []
        }
        await createTodosAsync(initialTodos);
        const {findByText, findByDisplayValue} = renderWithProviders(<Todos/>);


        const editButtonElement = await findByText("todo.edit 741")

        act(() => {
            fireEvent.click(editButtonElement)
        });
        const titleElement = await findByDisplayValue("title");
        const updateButtonElement = await findByText("todo.update")
        act(() => {
            fireEvent.input(titleElement, {target: {value: "title2"}})

            fireEvent.click(updateButtonElement)

        });

        expect(await findByText("title2")).toBeDefined()
    });

    test("open edit mode for a todo should not affect other todo", async () => {
        const initialTodos = {
            status: 'idle', items: [
                {id: "741", title: "title", description: "description"},
                {id: "742", title: "title2", description: "description2"}
            ], errors: []
        }
        await createTodosAsync(initialTodos);

        const {findByText, findByDisplayValue, queryByDisplayValue} = renderWithProviders(<Todos/>);

        const editButtonElement = await findByText("todo.edit 741")

        act(() => {
            fireEvent.click(editButtonElement)
        });

        const titleElement = await findByDisplayValue("title");
        const title2Element = await queryByDisplayValue("title2");

        expect(titleElement).toBeDefined()
        expect(title2Element).toBeNull()
    });

    test("on init load todos", async () => {
        const initialTodos = {
            status: 'idle', items: [
                {id: "741", title: "title", description: "description"},
                {id: "742", title: "title2", description: "description2"}
            ], errors: []
        }
        await createTodosAsync(initialTodos);

        const {findByText} = renderWithProviders(<Todos/>);

        expect(await findByText("title")).toBeDefined()
        expect(await findByText("title2")).toBeDefined()
    });

    test("todos should have a container for each state", async () => {
        const initialTodos = {
            status: 'idle', items: [
                {id: "741", title: "title", description: "description", state: TodoStatus.New},
                {id: "742", title: "title2", description: "description2", state: TodoStatus.InProgress},
                {id: "742", title: "title2", description: "description2", state: TodoStatus.Done},
            ], errors: []
        }
        await createTodosAsync(initialTodos);

        const {findAllByTestId} = renderWithProviders(<Todos/>);

        expect(await findAllByTestId("todo.card.new")).toHaveLength(1);
        expect(await findAllByTestId("todo.card.inProgress")).toHaveLength(1);
        expect(await findAllByTestId("todo.card.done")).toHaveLength(1);
    });

    test("update todo state should move the todo to the new state", async () => {
        const initialTodos = {
            status: 'idle', items: [
                {id: "741", title: "title", description: "description", state: TodoStatus.New},
            ], errors: []
        }
        await createTodosAsync(initialTodos);

        const {findAllByTestId, findByText} = renderWithProviders(<Todos/>);

        expect(await findAllByTestId("todo.card.new")).toHaveLength(1);

        const updateStateButtonElement = await findByText("todo.updateState 741")

        act(() => {
            fireEvent.click(updateStateButtonElement)
        });

        expect(await findAllByTestId("todo.card.inProgress")).toHaveLength(1);
    })
});