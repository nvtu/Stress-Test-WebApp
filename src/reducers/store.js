import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk'
import stestReducer from './stest';
import userInfoReducer from './user_info';
import scoreboardReducer from './scoreboard';


export default configureStore({
    reducer: {
        stest: stestReducer,
        userInfo: userInfoReducer,
        scoreboard: scoreboardReducer,
    },
    middleware: [thunk, logger],
})