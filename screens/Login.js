import { useEffect, useState } from 'react'
import { StatusBar, Image, View, StyleSheet, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { reset, signIn } from '../ReduxFeatures/user'

export default function Login({ navigation }) {
    const dispatch = useDispatch()
    const { loading, serverError, inputError } = useSelector((state)=>state.user)
    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const data = {
        username : usernameInput,
        password : passwordInput
    }

    useEffect(() => {
        if (inputError) Alert.alert('Incorrect username or password')
        
        if (serverError) Alert.alert('Server error')

        dispatch(reset())
    }, [inputError, serverError])
    

    function handleLogin () {
        if (usernameInput.length < 1 || passwordInput.length < 1) return Alert.alert('Please fill all input fields')
        dispatch(signIn(data))
    }

    if (loading) {
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size={'large'} />
            </View>
        )
    }

    return (
        <KeyboardAvoidingView 
            style={{flex:1}}
            behavior="padding"
        >
            <StatusBar backgroundColor='white' barStyle="dark-content"/>

            <View style={styles.container}>
                <View style={{flex:.9, alignItems:'center', justifyContent:'center'}}>
                    <Image source={require('../images/logo.png')} />
                </View>
                <View style={{flex:1}}>
                    <Text style={{textAlign:'center', fontSize:30, fontWeight:'500'}}>Login</Text>
                    <View style={{marginTop : 20}}>
                        <Text style={{paddingLeft:10, paddingBottom : 5, fontWeight : '500', }}>Username :</Text>
                        <TextInput value={usernameInput} onChangeText={(e)=>setUsernameInput(e)} style={styles.inputs} placeholder='Enter username' />

                        <Text style={{paddingLeft:10, paddingBottom : 5, fontWeight : '500', marginTop : 15}}>Password :</Text>
                        <TextInput value={passwordInput} onChangeText={(e)=>setPasswordInput(e)} style={styles.inputs} placeholder='Enter password' />
                    </View>
                    <Pressable onPress={handleLogin} style={({pressed})=> pressed ? styles.loginPressed : styles.login } >
                        <Text style={styles.loginText}>Login</Text>
                    </Pressable>
                    <Text style={{textAlign : 'center', marginTop : 20, fontWeight : '500'}}>
                        New to the app?
                        <Text onPress={()=>navigation.navigate('Sign-up')} style={{color : '#038A51'}}> Register</Text>
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingLeft : 25,
        paddingRight : 25,
        paddingBottom : 20
    },
    inputs : {
        borderWidth : .8,
        height : 50,
        paddingLeft : 10,
        fontSize : 15
    },
    login : {
        backgroundColor : '#046317',
        padding : 20,
        borderRadius : 7,
        marginTop : 20
    },
    loginPressed : {
        backgroundColor : '#044311',
        padding : 20,
        borderRadius : 7,
        marginTop : 20
    },
    loginText : {
        color : 'white',
        textAlign : 'center',
        fontSize : 17,
        fontWeight : '500'
    }
})