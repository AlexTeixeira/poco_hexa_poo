"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const expect_1 = require("expect");
const store_1 = require("../../../src/application/states/app/store");
(0, cucumber_1.Then)(/^I should be noticed with "([^"]*)"$/, function (message) {
    const error = store_1.store.getState().todos.error;
    (0, expect_1.expect)(error).toBeDefined();
    (0, expect_1.expect)(error === null || error === void 0 ? void 0 : error.message).toContain(message);
});
//# sourceMappingURL=ErrorDefinitions.steps.js.map