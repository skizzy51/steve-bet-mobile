import { View, Text, StyleSheet, Image, Pressable, StatusBar } from 'react-native'
import { Entypo } from '@expo/vector-icons'

export default function Onboarding2({ navigation }) {
  return (
    <>
        <StatusBar barStyle='dark-content' />
        <View style={{flex:1, paddingLeft:20, paddingRight:20}}>
            <Text style={styles.header}>Horse Racing</Text>
            <Image style={{left:20, height:270}} source={require('../images/noah-silliman-fxAo3DiMICI-unsplash.png')} />
            <Text style={styles.content}>Virtual Horse Racing is a game in which players place bets on one or more of 4 horses that are racing on the track.
                Outcomes are the result of an electronic random number generator (RNG).
            </Text>
            <View style={{flex : .9, justifyContent : 'flex-end'}}>
                <Pressable onPress={() => navigation.navigate('Onboarding3')} style={({pressed})=> pressed ? styles.loginPressed : styles.login }>
                    <Text style={{color : 'white', fontSize : 20}}>Next</Text>
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