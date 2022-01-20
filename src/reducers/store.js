import { configureStore } from '@reduxjs/toolkit';
import stestReducer from './stest';

export default configureStore({
    reducer: {
        stest: stestReducer,
    },
})