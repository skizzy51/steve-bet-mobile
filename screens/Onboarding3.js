import { View, Text, StyleSheet, Image, Pressable, StatusBar } from 'react-native'
import { Entypo } from '@expo/vector-icons'

export default function Onboarding3({ navigation }) {
  return (
    <>
        <StatusBar barStyle='dark-content' />
        <View style={{flex:1, paddingLeft:20, paddingRight:20}}>
            <Text style={styles.header}>Football Betting</Text>
            <Image style={{right:75, height:270}} source={require('../images/jannik-skorna-mY2ZHBU6GRk-unsplash.png')} />
            <Text style={styles.content}>Virtually simulated football games with your favorite teams. Matchups and
                match results are all generated with an RNG (Random Number Generator)
            </Text>
            <View style={{flex : .9, justifyContent : 'flex-end'}}>
                <Pressable onPress={() => navigation.navigate('Sign-up')} style={({pressed})=> pressed ? styles.loginPressed : styles.login }>
                    <Text style={{color : 'white', fontSize : 20}}>Create Account</Text>
                    <Entypo name="chevron-thin-right" size={17} color="white" />
                </Pressable>
            </View>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    header : {
        fontSize : 28,
        fontWeight : '500',
        textAlign : 'center',
        marginTop : 50,
        marginBottom : 40
    },
    content : {
        fontSize : 18,
        fontWeight : '500',
        lineHeight : 25,
        textAlign : 'center',
        marginTop : 35
    },
    login : {
        justifyContent : 'space-between',
        alignItems : 'center',
        flexDirection : 'row',
        backgroundColor : '#046317',
        paddingTop : 15,
        paddingBottom : 15,
        paddingLeft : 25,
        paddingRight : 25,
        borderRadius : 7,
        marginTop : 20
    },
    loginPressed : {
        justifyContent : 'space-between',
        alignItems : 'center',
        flexDirection : 'row',
        backgroundColor : '#044311',
        paddingTop : 15,
        paddingBottom : 15,
        paddingLeft : 25,
        paddingRight : 25,
        borderRadius : 7,
        marginTop : 20
    }
})