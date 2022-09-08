import * as React from 'react'
import { render } from '@testing-library/react-native'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import {AppStore, RootState, setupStore} from "core/src/application/states/app/store";
import {PropsWithChildren} from "react";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<any, 'queries'> {
    preloadedState?: PreloadedState<RootState>
    store?: AppStore
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {} as PreloadedState<RootState>,
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}