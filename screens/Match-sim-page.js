import { useEffect, useState } from 'react'
import { Alert, BackHandler, ImageBackground, Modal, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { credit, debit, resetServerError } from '../ReduxFeatures/user'
import { AntDesign } from '@expo/vector-icons';

export default function MatchSimPage({ navigation, route }) {
    const dispatch = useDispatch()
    const { cash, serverError, token } = useSelector(state => state.user)
    const { stake, totalEarnings, matchupArray, betSelections } = route.params
    const [countdown, setCountdown] = useState(5)
    const [matchStart, setMatchStart] = useState(false)
    const [results, setResults] = useState([])
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(()=>{
        const backHandler = BackHandler.addEventListener( "hardwareBackPress", () => true )
        return () => backHandler.remove()
    }, [])

    useEffect(()=>{
        setTimeout(() => {
            if (countdown > 1) setCountdown(countdown - 1)
            else if (countdown <= 1) setCountdown('GO!')
            else if (countdown === 'GO!') setMatchStart(true)
        }, 1000);
        if (matchStart) {
            winLose()
        }
    }, [countdown, matchStart])

    useEffect(() => {
        if (serverError) {
            navigation.replace('Single-placement')
            Alert.alert('Server error', "Please make sure you're connected to the internet", [ {text:'ok'} ])
        } 
        dispatch(resetServerError())
    }, [serverError])

    useEffect(() => {
        let dummyArray = []
        matchupArray.forEach(element => {
            if (element.team1Score > element.team2Score) {
                dummyArray.push({team1 : element.team1.shortName, team2 : element.team2.shortName, result : 'team1'})
            }
            else if (element.team1Score < element.team2Score) {
                dummyArray.push({team1 : element.team1.shortName, team2 : element.team2.shortName, result : 'team2'})
            }
            else if (element.team1Score === element.team2Score) {
                dummyArray.push({team1 : element.team1.shortName, team2 : element.team2.shortName, result : 'draw'})
            }
        })
        setResults(dummyArray)
    }, [matchupArray])
    

    function checkWinner () {
        let add = 0
        results.forEach(element => {
            betSelections.forEach(selection=> {
                if (element.team1 === selection.team1.shortName) {
                    if (element.result === selection.selected) {
                        add += 1
                    }
                }
            })
        })
        if (add === betSelections.length) {
            return true
        }else{
            return false
        }
    }

    function winLose () {
        if (checkWinner()) {
            let data = {amount : totalEarnings, token : token}
            dispatch(credit(data))
        }else{
            let data = {amount : stake, token : token}
            dispatch(debit(data))
        }
    }

    const renderMatchups = matchupArray.map(matchup => {
        return (
            <View style={styles.result} key={matchup.team1.name}>
                <View style={{flexDirection:'row', flexWrap:'nowrap', justifyContent:'center', alignItems:'center', width:160}}>
                    <Text numberOfLines={1} style={{fontSize:16.5, fontWeight:'600'}}>{matchup.team1.name}</Text>
                    <Text style={styles.resultScore}>{matchup.team1Score }</Text>
                </View>
                <Text>vs</Text>
                <View style={{flexDirection:'row', flexWrap:'nowrap', justifyContent:'center', alignItems:'center', width:160}}>
                    <Text style={styles.resultScore}>{matchup.team2Score }</Text>
                    <Text numberOfLines={1} style={{fontSize:16.5, fontWeight:'600'}}>{matchup.team2.name}</Text>
                </View>
            </View>
        )
    })

    const renderSelections = betSelections.map(selection => {
        let color = ''
        results.forEach(element =>{
            if (element.team1 === selection.team1.shortName) {
                if (element.result === selection.selected) {
                    color = '#009444'
                }else{
                    color = 'crimson'
                }
            }
        })

        return (
            <View style={styles.selection} key={selection.team1.name}>
                <Text style={{fontSize:20,fontWeight:'700', color:color}}>{selection.team1.shortName} - {selection.team2.shortName}</Text>
                {selection.selected === 'team1' && <Text>You picked - {selection.team1.shortName}</Text>}
                {selection.selected === 'team2' && <Text>You picked - {selection.team2.shortName}</Text>}
                {selection.selected === 'draw' && <Text>You picked - DRAW</Text>}
            </View>
        )
    })

    const ResultMessage = () => {
        if (checkWinner()) {
            return (
                <View style={{flex:.8, paddingLeft:20, paddingRight:20}}>
                    <Text style={{textAlign:'center', fontSize:45, fontWeight:'700', color:'#009444'}}>You Win !!!</Text>
                    <View style={{alignItems:'center', justifyContent:'space-between', flexDirection:'row', marginTop:30}}>
                        <Text style={{fontSize:20}}>Stake :</Text>
                        <Text style={{fontSize:20,color:'green', fontWeight:'600'}}>₦ {Platform.OS === 'android' ? stake.toFixed(2) : stake.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits : 2})}</Text>
                    </View>
                    <View style={{alignItems:'center', justifyContent:'space-between', flexDirection:'row', marginTop:30}}>
                        <Text style={{fontSize:20}}>Total earnings :</Text>
                        <Text style={{fontSize:20, color:'green', fontWeight:'600'}}>₦ {Platform.OS === 'android' ? totalEarnings.toFixed(2) : totalEarnings.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits : 2})}</Text>
                    </View>
                </View>
            )
        }else{
            return (
                <View style={{flex:.8, paddingLeft:20, paddingRight:20}}>
                    <Text style={{textAlign:'center', fontSize:45, fontWeight:'700', color:'crimson'}}>You Lose :(</Text>
                    <View style={{alignItems:'center', justifyContent:'space-between', flexDirection:'row', marginTop:30}}>
                        <Text style={{fontSize:20}}>Stake :</Text>
                        <Text style={{fontSize:20, color:'green', fontWeight:'600'}}>₦ {Platform.OS === 'android' ? stake.toFixed(2) : stake.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits : 2})}</Text>
                    </View>
                    <View style={{alignItems:'center', justifyContent:'space-between', flexDirection:'row', marginTop:30}}>
                        <Text style={{fontSize:20}}>Total earnings :</Text>
                        <Text style={{fontSize:20,color:'green', fontWeight:'600'}}>₦ 0.00</Text>
                    </View>
                </View>
            )
        }
    }

    return (
        <>
            <StatusBar barStyle='light-content' />
            <ImageBackground style={{flex:1,paddingTop:50}} source={require('../images/match-page-bgn.jpg')} >
                {
                    !matchStart
                    ? <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:35, color:'white'}}>Matches will begin in ...</Text>
                        <Text style={{fontSize:150, color:'white'}}>{countdown}</Text>
                    </View>
                    : <ScrollView style={{paddingLeft : 20, paddingRight : 20}}>
                        <Text
                        numberOfLines={1}
                        style={{color:'white',fontSize:22, fontStyle:'italic', fontWeight:'600', textAlign:"right"}}>
                            Cash: ₦ {Platform.OS === 'android' ? cash.toFixed(2) : cash.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits : 2})}
                        </Text>

                        <View style={styles.resultList}>
                            {renderMatchups}
                        </View>

                        <View style={styles.resultList}>
                            {renderSelections}
                        </View>

                        <View style={{marginTop:20, marginBottom:20}}>
                            <Pressable onPress={()=>setModalOpen(true)} style={({pressed}) => pressed ? styles.viewResultPressed : styles.viewResult}>
                                <Text style={{fontSize:18, color:'white', fontWeight:'600'}}>View Results</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                }
            </ImageBackground>
            <Modal visible={modalOpen} animationType='slide' presentationStyle='pageSheet' >
                <View style={{flex:.3, flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', paddingLeft:20, paddingRight:20, paddingTop : 30}}>
                    <Text style={{fontSize:25, fontWeight:'600'}}>Results</Text>
                    <AntDesign onPress={()=>setModalOpen(false)} name="close" size={30} color="black" />
                </View>

                <ResultMessage />

                <View style={{flex:.3, paddingLeft:20, paddingRight:20}}>
                    <Pressable onPress={()=>navigation.replace('Football')} style={({pressed}) => pressed ? styles.modalBtnPressed : styles.modalBtn}>
                        <Text style={{fontSize:18, color:'white', fontWeight:'600'}}>Continue betting</Text>
                    </Pressable>
                    <Pressable onPress={()=>navigation.navigate('Home')} style={({pressed}) => pressed ? styles.modalBtnPressed : styles.modalBtn}>
                        <Text style={{fontSize:18, color:'white', fontWeight:'600'}}>Go back Home</Text>
                    </Pressable>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    resultList : {
        backgroundColor:'white',
        marginTop:35,
        borderRadius:20,
        padding:20,
        paddingTop : 0
    },
    result : {
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor : 'grey',
        borderBottomWidth:.9,
        paddingBottom:20,
        paddingTop : 25
    },
    resultScore : {
        borderColor : 'green',
        borderWidth : 1.5,
        marginLeft : 10,
        marginRight : 10,
        paddingLeft : 8,
        paddingRight : 8,
        paddingTop : 5,
        paddingBottom : 5,
        fontSize : 20
    },
    selection : {
        alignItems : 'center',
        borderBottomColor : 'grey',
        borderBottomWidth:.9,
        paddingBottom:20,
        paddingTop : 20
    },
    viewResult : {
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        backgroundColor : '#046317',
        paddingTop : 17,
        paddingBottom : 17,
        borderRadius : 7,
        marginTop : 20
    },
    viewResultPressed : {
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        backgroundColor : '#044317',
        paddingTop : 17,
        paddingBottom : 17,
        borderRadius : 7,
        marginTop : 20
    },
    modalBtn : {
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        backgroundColor : '#046317',
        paddingTop : 17,
        paddingBottom : 17,
        borderRadius : 7,
        marginBottom : 12
    },
    modalBtnPressed : {
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        backgroundColor : '#044317',
        paddingTop : 17,
        paddingBottom : 17,
        borderRadius : 7,
        marginBottom : 12
    },

})