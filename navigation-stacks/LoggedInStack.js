import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Deposit from '../screens/Deposit'
import Football from '../screens/Football'
import Home from '../screens/Home'
import HorseRacing from '../screens/Horse-racing'
import MatchSimPage from '../screens/Match-sim-page'
import OverallPlacement from '../screens/Overall placement'
import SingleRacePage from '../screens/Single-race-page'
import SinglePlacement from '../screens/Single placement'
import OverallRacePage from '../screens/Overall-race-page'

const Stack = createNativeStackNavigator()

export default function LoggedInStack() {
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
            <Stack.Screen name='Home' component={Home} options={{gestureEnabled : false, gestureEnabled : false}} />
            <Stack.Screen name='Deposit' component={Deposit} options={{animation:'none', gestureEnabled : false}} />
            <Stack.Screen name='Football' component={Football} options={{animation:'none', gestureEnabled : false}} />
            <Stack.Screen name='Horse-racing' component={HorseRacing} options={{animation:'none'}} />
            <Stack.Screen name='Single-placement' component={SinglePlacement} options={{animation:'none', gestureEnabled : false}} />
            <Stack.Screen name='Overall-placement' component={OverallPlacement} options={{animation:'none', gestureEnabled : false}} />
            <Stack.Screen name='Single-race-page' component={SingleRacePage} options={{gestureEnabled : false}} />
            <Stack.Screen name='Overall-race-page' component={OverallRacePage} options={{gestureEnabled : false}} />
            <Stack.Screen name='Match-sim-page' component={MatchSimPage} options={{gestureEnabled : false}} />
        </Stack.Navigator>
    )
}