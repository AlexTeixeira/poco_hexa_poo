import { ThunkAction, Action, ThunkDispatch, AnyAction, PreloadedState, EnhancedStore, StateFromReducersMapObject, Reducer, ActionFromReducersMapObject } from '@reduxjs/toolkit';
declare const reducers: {
    todos: Reducer<import("../features/todo/todosSlice").TodosState, AnyAction>;
};
declare type ReducersMapObject = typeof reducers;
declare const rootReducer: Reducer<StateFromReducersMapObject<ReducersMapObject>, ActionFromReducersMapObject<ReducersMapObject>>;
export declare function setupStore(preloadedState?: PreloadedState<RootState>): EnhancedStore<any, any, any>;
export declare const store: EnhancedStore<any, any, any>;
export declare type RootState = ReturnType<typeof rootReducer>;
export declare type AppStore = ReturnType<typeof setupStore>;
export declare type AppDispatch = typeof store.dispatch;
export declare type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export declare type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export {};
