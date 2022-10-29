import  { Paystack }  from 'react-native-paystack-webview';
import { Alert, BackHandler, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { credit } from '../ReduxFeatures/user';
import { useEffect, useState } from 'react';

export default function PaystackPage({navigation, route}) {
    const dispatch = useDispatch()
    const { serverError, token } = useSelector(state => state.user)
    const [error, setError] = useState(serverError)

    useEffect(()=>{
        const backHandler = BackHandler.addEventListener( "hardwareBackPress", () => true )
        return () => backHandler.remove()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Paystack  
                paystackKey="pk_test_3c3583c8828234ac6d37ac46ac17bcbca3f672bd"
                amount={route.params.amount}
                billingEmail="paystackwebview@something.com"
                activityIndicatorColor="green"
                onCancel={(e) => {
                    navigation.navigate('Deposit')
                    Alert.alert('Transaction failed')
                }}
                onSuccess={(res) => {
                    navigation.navigate('Deposit')
                    let data = {amount : route.params.amount, token : token}
                    dispatch(credit(data))
                    if (error) {
                        return Alert.alert('Transaction failed')
                    }else{
                        return Alert.alert('Transaction Success')
                    }
                }}
                autoStart={true}
            />
        </View>
    );
}