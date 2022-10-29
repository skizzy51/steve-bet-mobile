import Onboarding1 from '../screens/Onboarding1'
import Onboarding2 from '../screens/Onboarding2'
import Onboarding3 from '../screens/Onboarding3'
import Login from '../screens/Login'
import SignUp from '../screens/Sign-up'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function LoggedOutStack() {
    return (
        <Stack.Navigator initialRouteName='Onboarding1' screenOptions={{headerShown:false}}>
            <Stack.Screen name='Onboarding1' component={Onboarding1} />
            <Stack.Screen name='Onboarding2' component={Onboarding2} />
            <Stack.Screen name='Onboarding3' component={Onboarding3} />
            <Stack.Screen name='Login' component={Login} options={{gestureEnabled : false}} />
            <Stack.Screen name='Sign-up' component={SignUp} options={{gestureEnabled : false}} />
        </Stack.Navigator>
    )
}