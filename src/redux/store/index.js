import storage from 'redux-persist/lib/storage';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
// import createLogger  from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from '../reducers' 

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: [
        'token', 'user', 'authStatus'
    ],
    blacklist: [
        
    ],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
    persistedReducer,
    applyMiddleware(thunkMiddleware),
);

let persistor = persistStore(store);

export {
    store,
    persistor,
};