import { View, Text, StatusBar, StyleSheet, Pressable, Image } from 'react-native'
import { useRoute } from '@react-navigation/native';
import BottomNav from '../components/BottomNav';
import TopNav from '../components/TopNav';

export default function Home({ navigation }) {
  const route = useRoute()
  return (
    <>
        <StatusBar barStyle="dark-content" backgroundColor='white'/>
        <View style={{flex:1}}>
            <View style={{flex:.3, justifyContent:'center', paddingLeft : 20, paddingRight : 20}}>
              <TopNav />
            </View>

            <View style={{flex:1, justifyContent : 'flex-end', alignItems : 'center'}}>
              <Text style={{textAlign:'center', fontSize:16, fontWeight:'300'}}>Please select bet type</Text>
              <Pressable onPress={() => navigation.navigate('Football')} style={{position:'relative', marginTop : 15, marginBottom : 10}}>
                <Image source={require('../images/pexels-pixabay-209841.png')} />
                <View style={styles.overlay}></View>
                <Text style={styles.typeText}>Football</Text>
              </Pressable>
              <Pressable  onPress={() => navigation.navigate('Horse-racing')} style={{position:'relative', marginTop : 5, marginBottom : 20}}>
                <Image source={require('../images/pexels-james-anthony-11341144.png')} />
                <View style={styles.overlay}></View>
                <Text style={styles.typeText}>Horse Racing</Text>
              </Pressable>
            </View>

            <BottomNav navigation={navigation} />
        </View>
    </>
  )
}

const styles = StyleSheet.create({
  header : {
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  bottomNav : {
    backgroundColor:'#04791C',
    flexDirection : 'row',
    alignItems : 'center',
    height : 60
  },
  typeText : {
    position : 'absolute',
    fontSize : 22,
    color : 'white',
    fontWeight : '700',
    padding : 25
  },
  overlay : {
    backgroundColor : 'black',
    opacity : .51,
    position : 'absolute',
    height : 217,
    width : 325,
    borderRadius : 21
  },
  bottomNavBtn : {
    flex : 1,
    alignItems : 'center',
    height : 60,
    justifyContent : 'center'
  },
  bottomNavBtnPressed : {
    flex : 1,
    alignItems : 'center',
    height : 60,
    justifyContent : 'center',
    backgroundColor : '#044311'
  }
})