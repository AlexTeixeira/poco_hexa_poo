"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const store_1 = require("../../../src/application/states/app/store");
const loadTodos_1 = require("../../../src/application/states/features/todo/useCases/loadTodos");
const expect_1 = require("expect");
(0, cucumber_1.When)(/^I load todos$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield store_1.store.dispatch((0, loadTodos_1.loadTodosAsync)());
    });
});
(0, cucumber_1.Then)(/^I should see todos$/, function (table) {
    const expectedTodos = table.hashes();
    const actualTodos = store_1.store.getState().todos.items;
    (0, expect_1.expect)(actualTodos).toHaveLength(expectedTodos.length);
    expectedTodos.forEach((expectedTodo, index) => {
        (0, expect_1.expect)(actualTodos[index]).toStrictEqual(expectedTodo);
    });
});
//# sourceMappingURL=loadTodosDefinitions.steps.js.map