import { StyleSheet, View } from 'react-native'
import { Entypo } from '@expo/vector-icons';

export default function Checkbox({checked}) {
    return (
        <View style={styles.checkBox}>
            { checked && <Entypo name="check" size={19} color="#325ADF" /> }
        </View>
    )
}

const styles = StyleSheet.create({
    checkBox : {
        borderColor : '#8A8A8A',
        borderWidth : 1.6,
        borderRadius : 5,
        justifyContent : 'center',
        alignItems : 'center',
        height : 25,
        width : 25
    },
})