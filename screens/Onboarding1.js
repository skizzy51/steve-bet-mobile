import { View, Text, ImageBackground, StyleSheet, Image, Pressable, StatusBar } from 'react-native'
import { Entypo } from '@expo/vector-icons'


export default function Onboarding1({ navigation }) {
  return (
    <>
        <StatusBar barStyle='light-content' />
        <View style={{flex : 1}}>
            <ImageBackground style={styles.background} source={require('../images/chris-liverani-vBpd607jLXs-unsplash.png')} >
                <Text style={styles.welcomeText}>Welcome to...</Text>
                <Image style={{bottom:45}} source={require('../images/logo.png')} />
                <Text style={styles.introText}>Welcome to the home of leading Virtual betting. We offer online betting on either horse racing or Football. Take advantage
                    of the convenience of betting at any time and anywhere.
                </Text>
                <View style={{flex:.5}}>
                    <Pressable onPress={() => navigation.navigate('Onboarding2')} style={({pressed})=> pressed ? styles.loginPressed : styles.login }>
                        <Text style={{color : 'white', fontSize : 20}}>Next</Text>
                        <Entypo name="chevron-thin-right" size={17} color="white" />
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    background : {
        flex : 1,
        paddingLeft : 20,
        paddingRight : 20
    },
    welcomeText : {
        color:'white',
        textAlign:'center',
        fontSize:38,
        fontWeight:'500',
        flex : 1,
        top : 60
    },
    introText : {
        color : 'white',
        textAlign : 'center',
        fontSize : 19,
        fontWeight : '600',
        flex : 1,
        lineHeight : 24
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