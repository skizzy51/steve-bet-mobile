import React, { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import LoggedInStack from './LoggedInStack'
import LoggedOutStack from './LoggedOutStack'
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, logout } from '../ReduxFeatures/user';

export default function AppNav() {
    const { loggedIn } = useSelector((state)=>state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        async function getUser () {
            let User = await AsyncStorage.getItem('user').catch(err => console.log(err))
            if (User) {
                User = JSON.parse(User)
                dispatch(login(User))
            }else{
                dispatch(logout())
            }
        }
        getUser()
    }, [loggedIn])
    

    return (
        <NavigationContainer>
            {
                loggedIn
                ? <LoggedInStack/>
                : <LoggedOutStack/>
            }
        </NavigationContainer>
    )
}