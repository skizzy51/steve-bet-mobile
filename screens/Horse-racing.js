import { useState } from 'react'
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import BottomNav from '../components/BottomNav'
import TopNav from '../components/TopNav'

export default function HorseRacing({navigation}) {
    return (
        <>
            <StatusBar barStyle="dark-content"/>

            <View style={{flex:1, paddingLeft:20, paddingRight:20}}>
                <View style={{flex:.35, justifyContent:'center'}}><TopNav /></View>

                <Text style={{fontSize:30, textAlign:'center', fontWeight:'500'}}>Horse Racing</Text>

                <View style={{flex:1, justifyContent:'center'}}>
                    <Text style={{fontSize:22, textAlign:'center', lineHeight:30}}>To play, place bets on positions you think horses would place in the race. You can either bet on
                        the winner of a single race or the overall placement of each horse in the race.
                        Betting on just the winner has less returns but betting on the overall placement has MASSIVE returns
                    </Text>
                    <Text style={{fontSize:22, textAlign:'center', fontWeight:'600', marginTop:20}}>LET'S RACE !!!</Text>
                </View>

                <View style={{flex:.4, justifyContent:'space-evenly'}}>
                    <Pressable onPress={()=>navigation.navigate('Overall-placement')} style={({pressed}) => pressed ? styles.placementBtnPressed : styles.placementBtn}><Text style={{color:'white', fontSize:17, fontWeight:'500'}}>Overall placement</Text></Pressable>
                    <Pressable onPress={()=>navigation.navigate('Single-placement')} style={({pressed}) => pressed ? styles.placementBtnPressed : styles.placementBtn}><Text style={{color:'white', fontSize:17, fontWeight:'500'}}>Single placement</Text></Pressable>
                </View>
            </View>

            <BottomNav navigation={navigation}/>
        </>
    )
}

const styles = StyleSheet.create({
    placementBtn : {
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        backgroundColor : '#046317',
        paddingTop : 12,
        paddingBottom : 12,
        borderRadius : 7
    },
    placementBtnPressed : {
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        backgroundColor : '#044317',
        paddingTop : 12,
        paddingBottom : 12,
        borderRadius : 7
    }
})