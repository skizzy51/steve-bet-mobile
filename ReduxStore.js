import { configureStore } from "@reduxjs/toolkit";

import userReducer from './ReduxFeatures/user'

export const store = configureStore({
    reducer : {
        user : userReducer
    }
})