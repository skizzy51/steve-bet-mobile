import { useRef, useState } from 'react'
import { Alert, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import { Paystack, paystackProps } from 'react-native-paystack-webview'
import { useDispatch, useSelector } from 'react-redux'
import BottomNav from '../components/BottomNav'
import TopNav from '../components/TopNav'
import { credit, logout } from '../ReduxFeatures/user'

export default function Deposit({ navigation }) {
    const [depositCash, setDepositCash] = useState(1000)
    const dispatch = useDispatch()
    const { token, serverError } = useSelector(state => state.user)
    const [error, setError] = useState(serverError)
    const paystackWebViewRef = useRef(paystackProps.PayStackRef) 

    function handleLogout () {
        dispatch(logout())
    }

    function handleDeposit () {
        if (depositCash < 100) {
            return Alert.alert('You can only deposit a minimum of ₦100')
        }else {
            paystackWebViewRef.current.startTransaction()
        }
    }

    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <View style={{flex:1}}>
                <View style={{flex:.4, justifyContent:'center'}}>
                    <Text style={{textAlign:'center', fontSize:33, fontWeight:'600'}}>Account</Text>
                </View>

                <View style={{paddingLeft:20,paddingRight:20}}>
                    <TopNav/>
                </View>

                <View style={{flex:1, paddingLeft:20,paddingRight:20, top:80}}>
                    <Text style={{textAlign:'center', marginBottom:20}}>Deposit cash to your account :</Text>
                    <TextInput value={depositCash.toString()} onChangeText={(e)=>setDepositCash(Number(e))} style={styles.stakeInput} placeholder='Cash' placeholderTextColor='grey' keyboardType='numeric' returnKeyType='done' />
                </View>

                <View style={{flex:.2, paddingLeft:20,paddingRight:20, justifyContent:'center'}}>
                    <Pressable onPress={handleDeposit} style={({pressed})=>pressed ? styles.depositCashPressed : styles.depositCash}>
                        <Text style={{color:'white',fontSize:20,fontWeight:'600'}}>Deposit cash</Text>
                    </Pressable>
                </View>

                <View style={{flex:.2, paddingLeft:20,paddingRight:20, justifyContent:'center'}}>
                    <Pressable onPress={handleLogout} style={({pressed})=>pressed ? styles.logoutPressed : styles.logout}><Text style={{color:'white',fontSize:20,fontWeight:'600'}}>Logout</Text></Pressable>
                </View>

                <BottomNav navigation={navigation} />
                <Paystack 
                    paystackKey="pk_test_3c3583c8828234ac6d37ac46ac17bcbca3f672bd"
                    amount={depositCash}
                    billingEmail="obisteve81@gmail.com"
                    activityIndicatorColor="green"
                    onCancel={(e) => {
                        Alert.alert('Transaction failed')
                    }}
                    onSuccess={(res) => {
                        let data = {amount : depositCash, token : token}
                        dispatch(credit(data))
                        if (error) {
                            Alert.alert('Transaction failed')
                        }else{
                            Alert.alert('Transaction success')
                        }
                    }}
                    ref={paystackWebViewRef}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    stakeInput : {
        borderColor : 'black',
        borderWidth : .9,
        height : 50,
        paddingLeft : 15
    },
    depositCash : {
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        backgroundColor : '#046317',
        paddingTop : 15,
        paddingBottom : 15,
        borderRadius : 7,
    },
    depositCashPressed : {
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        backgroundColor : '#043317',
        paddingTop : 15,
        paddingBottom : 15,
        borderRadius : 7,
    },
    logout : {
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        backgroundColor : 'crimson',
        paddingTop : 15,
        paddingBottom : 15,
        borderRadius : 7,
    },
    logoutPressed : {
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        backgroundColor : '#49090E',
        paddingTop : 15,
        paddingBottom : 15,
        borderRadius : 7,
    },
})