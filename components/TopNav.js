import { useNavigation, useRoute } from '@react-navigation/native'
import { Platform, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

export default function TopNav() {
  const route = useRoute()
  const navigation = useNavigation()
  const { username, cash } = useSelector((state) => state.user)
  

  function back () {
    if (route.name === 'Football' || route.name === 'Horse-racing') {
      navigation.navigate('Home')
    }else if (route.name === 'Single-placement' || route.name === 'Overall-placement') {
      navigation.navigate('Horse-racing')
    }
  }

  return (
    <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center'}}>
        { route.name === 'Home' && <Text style={{fontSize:18, fontWeight:'600', width:150}} numberOfLines={2} ellipsizeMode='tail'>Hello {username}</Text> }
        { route.name !== 'Home' && route.name !== 'Deposit' ? <MaterialIcons onPress={back} style={{width:45}} name="arrow-back-ios" size={35} color="green" /> : null }
        <Text style={{fontSize:18, fontStyle:'italic', fontWeight:'600', maxWidth:190}} numberOfLines={2} ellipsizeMode='tail'>Cash:
          <Text style={{color:'green'}}> ₦ {Platform.OS === 'android' ? cash.toFixed(2) : cash.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits : 2})}</Text>
        </Text>
    </View>
  )
}
