import { useEffect, useState } from 'react'
import { View, Text, StatusBar, TextInput, Pressable, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { reset, signUp } from '../ReduxFeatures/user'

export default function SignUp({ navigation }) {
    const dispatch = useDispatch()
    const { loading, serverError, username, loggedIn } = useSelector((state)=>state.user)
    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput1, setPasswordInput1] = useState('')
    const [passwordInput2, setPasswordInput2] = useState('')
    const data = {
        username : usernameInput,
        password : passwordInput1
    }

    useEffect(() => {
        if (serverError) Alert.alert('Server error')

        if (loggedIn) {
            navigation.navigate('Home')
        }

        dispatch(reset())
    }, [serverError, username])
    

    function handleSignUp () {
        if (usernameInput.length < 1 || passwordInput1.length < 1 || passwordInput2.length < 1) return Alert.alert('Please fill all input fields')
        if (usernameInput .length < 3) return Alert.alert('Username must contain at least 3 characters')
        if (passwordInput1 !== passwordInput2) {return Alert.alert('Passwords do not match')}
        dispatch(signUp(data))
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
            <View style={{flex:.55, alignItems:'center', justifyContent:'center'}}>
                <Image source={require('../images/logo.png')} />
            </View>
            <View style={{flex:1}}>
                <Text style={{textAlign:'center', fontSize:30, fontWeight:'500'}}>Create an account</Text>
                <View style={{marginTop : 20}}>
                    <Text style={{paddingLeft:10, paddingBottom : 5, fontWeight : '500', }}>Username :</Text>
                    <TextInput value={usernameInput} onChangeText={(e)=>setUsernameInput(e)} style={styles.inputs} placeholder='Enter username' />

                    <Text style={{paddingLeft:10, paddingBottom : 5, fontWeight : '500', marginTop : 15}}>Password :</Text>
                    <TextInput value={passwordInput1} onChangeText={(e)=>setPasswordInput1(e)} style={styles.inputs} placeholder='Enter password' />

                    <Text style={{paddingLeft:10, paddingBottom : 5, fontWeight : '500', marginTop : 15}}>Confirm password :</Text>
                    <TextInput value={passwordInput2} onChangeText={(e)=>setPasswordInput2(e)} style={styles.inputs} placeholder='Enter password' />
                </View>
                <Pressable onPress={handleSignUp} style={({pressed})=> pressed ? styles.loginPressed : styles.login } >
                    <Text style={styles.loginText}>Create account</Text>
                </Pressable>
                <Text style={{textAlign : 'center', marginTop : 20, fontWeight : '500'}}>
                    Already have an account?
                    <Text onPress={()=>navigation.navigate('Login')} style={{color : '#038A51'}}> Login</Text>
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