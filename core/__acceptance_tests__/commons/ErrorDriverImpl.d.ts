import 'reflect-metadata';
import { ErrorDriver } from "./ErrorDriver";
export declare class ErrorDriverImpl implements ErrorDriver {
    private readonly errors;
    constructor();
    private addError;
    getErrors(): Error[];
    getLastError(): Error;
    handleError<T>(func: () => Promise<T>): Promise<void>;
}
