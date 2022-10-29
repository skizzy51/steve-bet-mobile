import { Pressable, StyleSheet, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native';

export default function BottomNav({navigation}) {
    const route = useRoute()

    function onClickHome () {
        if (route.name === 'Deposit') navigation.goBack()
        else if (route.name === 'Football' || route.name === 'Horse-racing') navigation.navigate('Home')
    }

    return (
        <View style={styles.bottomNav}>
            <Pressable onPress={onClickHome} style={({pressed}) => pressed ? styles.bottomNavBtnPressed : styles.bottomNavBtn}>
                <FontAwesome5
                    name="home"
                    size={24}
                    color={
                        route.name === 'Home' || route.name === 'Football' || route.name === 'Horse-racing' || route.name === 'Overall-placement' || route.name === 'Single-placement'
                        ? 'white'
                        : 'black'
                    }
                />
            </Pressable>
            <Pressable onPress={()=>navigation.navigate('Deposit')} style={({pressed}) => pressed ? styles.bottomNavBtnPressed : styles.bottomNavBtn}>
                <FontAwesome5 name="user-alt" size={24} color={route.name === 'Deposit' ? 'white' : 'black'} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomNav : {
        backgroundColor:'#04791C',
        flexDirection : 'row',
        alignItems : 'center',
        height : 60
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