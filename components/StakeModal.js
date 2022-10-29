import { Alert, Modal, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function StakeModal(props) {
    const navigation = useNavigation()
    const { cash } = useSelector(state => state.user)

    function placeBet () {
        if ( Number(props.values.data.stake) <= cash ) {
            navigation.navigate(props.values.redirectScreen, props.values.data)
            props.values.setModalOpen(false)
        }else{
            Alert.alert('You do not have enough cash to place this bet')
        }
    }

    return (
        <Modal visible={props.values.modalOpen} animationType='slide' presentationStyle='pageSheet' >
            <View style={{flex : .18, flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', paddingLeft:20, paddingRight:20, paddingTop : 30}}>
                <Text style={{fontSize:17.5}}>Enter amount you wish to stake</Text>
                <AntDesign onPress={()=>props.values.setModalOpen(false)} name="close" size={30} color="black" />
            </View>

            <View style={{flex:.31, paddingLeft:20, paddingRight:20}}>
                <TextInput value={props.values.data.stake.toString()} onChangeText={(e)=>props.values.setStake(Number(e))} style={styles.stakeInput} placeholder='Stake' placeholderTextColor='grey' keyboardType='numeric' returnKeyType='done' />
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:30}}>
                    <Pressable onPress={()=>props.values.setStake(prevStake=>prevStake + 100)} style={styles.stakeBtn}><Text style={{color : 'white', fontWeight:'500'}}>+ ₦100</Text></Pressable>
                    <Pressable onPress={()=>props.values.setStake(prevStake=>prevStake + 200)} style={styles.stakeBtn}><Text style={{color : 'white', fontWeight:'500'}}>+ ₦200</Text></Pressable>
                    <Pressable onPress={()=>props.values.setStake(prevStake=>prevStake + 500)} style={styles.stakeBtn}><Text style={{color : 'white', fontWeight:'500'}}>+ ₦500</Text></Pressable>
                    <Pressable onPress={()=>props.values.setStake(prevStake=>prevStake + 1000)} style={styles.stakeBtn}><Text style={{color : 'white', fontWeight:'500'}}>+ ₦1000</Text></Pressable>
                </View>
            </View>

            <View style={{flex:.4, paddingLeft:20, paddingRight:20}}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize: 20, marginBottom:30, fontWeight:'600'}}>Total odds :</Text>
                    <Text style={{fontSize: 20, marginBottom:30, fontWeight:'600'}}>{props.values.data.totalOdds}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize: 25, marginBottom:30, fontWeight:'600'}}>Total earnings :</Text>
                    <Text style={{fontSize: 25, marginBottom:30, fontWeight:'600', maxWidth:185, textAlign:'right', color:'green'}} numberOfLines={1} ellipsizeMode='tail'>₦{Platform.OS === 'android' ? props.values.data.totalEarnings.toFixed(2) : props.values.data.totalEarnings.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits : 2})}</Text>
                </View>
            </View>

            <View style={{flex:.15, paddingLeft:20, paddingRight:20}}>
                <Pressable
                    onPress={placeBet}
                    style={({pressed})=> pressed ? styles.placeBetBtnPressed : styles.placeBetBtn}
                >
                    <Text style={{color:'white', fontWeight:'600', fontSize:20}}>Place bet</Text>
                </Pressable>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    stakeInput : {
        borderColor : 'black',
        borderWidth : .9,
        height : 50,
        paddingLeft : 15
    },
    stakeBtn : {
        backgroundColor : '#04791C',
        padding : 14,
        borderRadius : 7
    },
    placeBetBtn : {
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        backgroundColor : '#046317',
        paddingTop : 15,
        paddingBottom : 15,
        borderRadius : 7,
        marginTop : 20
    },
    placeBetBtnPressed : {
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        backgroundColor : '#044317',
        paddingTop : 15,
        paddingBottom : 15,
        borderRadius : 7,
        marginTop : 20
    }
})