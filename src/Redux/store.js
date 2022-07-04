import { combineReducers, createStore } from 'redux'
import {tasksReducer} from "./tasksReducer";

const rootReducer = combineReducers({
    tables: tasksReducer,
})

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;