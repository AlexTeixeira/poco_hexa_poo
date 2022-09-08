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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const TestDIContainer_1 = __importDefault(require("../../../src/config/TestDIContainer"));
const DIContainerType_1 = __importDefault(require("../../../src/domain/DIContainerType"));
let todoRepository;
(0, cucumber_1.Before)(() => {
    todoRepository = TestDIContainer_1.default.get(DIContainerType_1.default.TodoRepository);
});
(0, cucumber_1.Given)(/^todo exists$/, function (table) {
    todoRepository.clear();
    table.hashes().forEach((todo) => __awaiter(this, void 0, void 0, function* () {
        yield todoRepository.createAsync(todo);
    }));
});
//# sourceMappingURL=TodoBackground.steps.js.map