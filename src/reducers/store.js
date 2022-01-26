import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk'
import stestReducer from './stest';

export default configureStore({
    reducer: {
        stest: stestReducer,
    },
    middleware: [thunk, logger],
})