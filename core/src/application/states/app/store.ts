import {
    configureStore,
    ThunkAction,
    Action,
    ThunkDispatch,
    AnyAction,
    PreloadedState,
    combineReducers,
    EnhancedStore, CombinedState, StateFromReducersMapObject, Reducer, ActionFromReducersMapObject
} from '@reduxjs/toolkit';
import todosReducer from '../features/todo/todosSlice';
import {ThunkServiceProvider} from "../features/config/ThunkServiceProvider";

const reducers = {
    todos: todosReducer,
};

type ReducersMapObject = typeof reducers;

const rootReducer: Reducer<
    StateFromReducersMapObject<ReducersMapObject>,
    ActionFromReducersMapObject<ReducersMapObject>
    > = combineReducers(reducers);

function getMiddleware() {
    return (getDefaultMiddleware: any) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: ThunkServiceProvider,
            },
            serializableCheck: false,
        });
}

export function setupStore(preloadedState?: PreloadedState<RootState>): EnhancedStore<any, any, any> {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: getMiddleware()
    });
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>

