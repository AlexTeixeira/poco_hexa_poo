import { TypedUseSelectorHook } from 'react-redux';
import type { RootState } from './store';
import { AppThunkDispatch } from "./store";
export declare const useAppDispatch: () => import("redux").Dispatch<any>;
export declare const useAppSelector: TypedUseSelectorHook<RootState>;
export declare const useThunkDispatch: () => AppThunkDispatch;
