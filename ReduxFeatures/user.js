import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    username : '',
    cash : 0,
    loading : false,
    inputError : false,
    serverError : false,
    loggedIn : false,
    token : ''
}

export const signIn = createAsyncThunk('signIn', async(data, thunkAPI) => {
    try {
        let response = await fetch('https://steve-betting-app.herokuapp.com/app/login/no-expire', {
            method : 'post',
            body : JSON.stringify(data),
            headers : { 'Content-Type' : 'application/json' }
        })
        return response.json()
    } catch (error) {
        return thunkAPI.rejectWithValue(true)
    }
})

export const signUp = createAsyncThunk('signUp', async(data, thunkAPI) => {
    try {
        let response = await fetch('https://steve-betting-app.herokuapp.com/app/user/no-expire', {
            method : 'post',
            body : JSON.stringify(data),
            headers : { 'Content-Type' : 'application/json' }
        })
        return response.json()
    } catch (error) {
        return thunkAPI.rejectWithValue(true)
    }
})

export const credit = createAsyncThunk('credit', async(data, thunkAPI) => {
    try {
        let response = await fetch('https://steve-betting-app.herokuapp.com/app/deposit', {
            method : 'POST',
            body : JSON.stringify({amount : data.amount}),
            headers : { 'Content-Type' : 'application/json', 'authorization' : `Bearer ${data.token}` }
        })
        return await response.json()
    } catch (error) {
        return thunkAPI.rejectWithValue(true)
    }
})

export const debit = createAsyncThunk('debit', async(data, thunkAPI) => {
    try {
        let response = await fetch('https://steve-betting-app.herokuapp.com/app/debit', {
            method : 'POST',
            body : JSON.stringify({amount : data.amount}),
            headers : { 'Content-Type' : 'application/json', 'authorization' : `Bearer ${data.token}` }
        })
        return await response.json()
    } catch (error) {
        return thunkAPI.rejectWithValue(true)
    }
})

const userReducer = createSlice({
    name : 'user',
    initialState,
    reducers : {
        reset : (state) => {
            state.serverError = false
            state.inputError = false
            state.loading = false
            state.loggedIn = false
        },
        login : (state, { payload }) => {
            state.username = payload.user.username,
            state.cash = payload.user.cash,
            state.token = payload.token,
            state.loggedIn = true
        },
        logout : (state) => {
            AsyncStorage.removeItem('user')
            state.username = '',
            state.cash = 0,
            state.token = '',
            state.loggedIn = false
        },
        resetServerError : (state) => {
            state.serverError = false
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(signIn.pending, (state) => {
            state.loading = true
        })
        .addCase(signIn.fulfilled, (state, action) => {
            state.loading = false
            if (action.payload.user) {
                state.username = action.payload.user.username
                state.cash = action.payload.user.cash
                state.token = action.payload.token
                state.loggedIn = true
                AsyncStorage.setItem('user', JSON.stringify(action.payload))
            }else{
                state.inputError = true
            }
        })
        .addCase(signIn.rejected, (state, action) => {
            state.loading = false
            state.loggedIn = false
            state.serverError = action.payload
        })
        .addCase(signUp.pending, (state) => {
            state.loading = true
        })
        .addCase(signUp.fulfilled, (state, action) => {
            state.loading = false
            if (action.payload.user) {
                state.username = action.payload.user.username
                state.cash = action.payload.user.cash
                state.token = action.payload.token
                state.loggedIn = true
                AsyncStorage.setItem('user', JSON.stringify(action.payload))
            }else{
                state.inputError = true
            }
        })
        .addCase(signUp.rejected, (state, action) => {
            state.loading = false
            state.loggedIn = false
            state.serverError = action.payload
        })
        .addCase(credit.pending, (state) => {
            state.serverError = false
        })
        .addCase(credit.fulfilled, (state, action) => {
            state.serverError = false
            if (action.payload.message === 'Cash successfully deposited') {
                state.cash += Number(action.payload.data.amount)
                let updateUser = {
                    token : state.token,
                    user : {
                        username : state.username,
                        cash : state.cash
                    }
                }
                AsyncStorage.setItem('user', JSON.stringify(updateUser))
            }
        })
        .addCase(credit.rejected, (state, action) => {
            state.serverError = action.payload
        })
        .addCase(debit.pending, (state) => {
            state.serverError = false
        })
        .addCase(debit.fulfilled, (state, action) => {
            state.serverError = false
            if (action.payload.message === 'Cash successfully debited') {
                state.cash -= Number(action.payload.data.amount)
                let updateUser = {
                    token : state.token,
                    user : {
                        username : state.username,
                        cash : state.cash
                    }
                }
                AsyncStorage.setItem('user', JSON.stringify(updateUser))
            }
        })
        .addCase(debit.rejected, (state, action) => {
            state.serverError = action.payload
        })
    }
})

export const { reset, logout, login, resetServerError } = userReducer.actions

export default userReducer.reducer