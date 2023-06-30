import { createStore, combineReducers, applyMiddleware } from "redux";
import charactersReducer from "./reducers/characters-reducer";
import createSagaMiddleware from "redux-saga";
import combineSagas from "./reducers/sagas";

const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({ charactersReducer: charactersReducer });
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(combineSagas)

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
