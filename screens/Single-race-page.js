import { useEffect, useRef, useState } from 'react'
import { Alert, Animated, BackHandler, Easing, Image, ImageBackground, Modal, Platform, Pressable, StatusBar, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { credit, debit, resetServerError } from '../ReduxFeatures/user';

export default function SingleRacePage({ navigation, route }) {
    const window = useWindowDimensions();
    const dispatch = useDispatch()
    const { cash, serverError, token } = useSelector(state => state.user)
    const { totalEarnings, singleHorse, horseList, stake } = route.params
    const [countdown, setCountdown] = useState(5)
    const [raceStart, setRaceStart] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const [racePlacement, setRacePlacement] = useState([...horseList])
    const [pick, setPick] = useState(singleHorse.horse.split('-'))

    const horse1Animation = useRef(new Animated.Value(0)).current
    const horse2Animation = useRef(new Animated.Value(0)).current
    const horse3Animation = useRef(new Animated.Value(0)).current
    const horse4Animation = useRef(new Animated.Value(0)).current

    useEffect(()=>{
        setRacePlacement(prevArray => prevArray.sort(() => 0.5 - Math.random()))
        const backHandler = BackHandler.addEventListener( "hardwareBackPress", () => true )
        return () => backHandler.remove()
    }, [])

    useEffect(() => {
        if (serverError) {
            navigation.replace('Single-placement')
            Alert.alert('Server error', "Please make sure you're connected to the internet", [ {text:'ok'} ])
        } 
        dispatch(resetServerError())
    }, [serverError])

    useEffect(()=>{
        setTimeout(() => {
            if (countdown > 1) setCountdown(countdown - 1)
            else if (countdown <= 1) setCountdown('GO!')
            else if (countdown === 'GO!') setRaceStart(true)
        }, 1000);
        if (raceStart) {
            winLose()
            horseAnimation()
            setTimeout(()=>{
                setModalOpen(true)
            }, 8000)
        }
    }, [countdown, raceStart])

    useEffect(()=>{
        racePlacement[0].duration = 4
        racePlacement[1].duration = 5
        racePlacement[2].duration = 6
        racePlacement[3].duration = 7
    }, [racePlacement])

    function checkWinner () {
        if (Number(pick[1]) === racePlacement[0].number) {
            return true
        }else {
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

    function horseAnimation () {
        let horse1Duration
        let horse2Duration
        let horse3Duration
        let horse4Duration
        racePlacement.forEach(horse => {
            if (horse.name === 'Bolt') horse1Duration = horse.duration * 1000
            else if (horse.name === 'Henry') horse2Duration = horse.duration * 1000
            else if (horse.name === 'Gus') horse3Duration = horse.duration * 1000
            else if (horse.name === 'Julius') horse4Duration = horse.duration * 1000
        })
        Animated.timing(horse1Animation, {
            toValue: window.width - 100,
            duration: horse1Duration,
            easing : Easing.in(),
            useNativeDriver: true
        }).start()
        Animated.timing(horse2Animation, {
            toValue: window.width - 100,
            duration: horse2Duration,
            easing : Easing.in(),
            useNativeDriver: true
        }).start()
        Animated.timing(horse3Animation, {
            toValue: window.width - 100,
            duration: horse3Duration,
            easing : Easing.in(),
            useNativeDriver: true
        }).start()
        Animated.timing(horse4Animation, {
            toValue: window.width - 100,
            duration: horse4Duration,
            easing : Easing.in(),
            useNativeDriver: true
        }).start()
    }

    function winnerImage () {
        if (racePlacement[0].number === 1) {
            return require('../images/horse-1.jpg')
        }
        else if (racePlacement[0].number === 2) {
            return require('../images/horse-2.jpg')
        }
        else if (racePlacement[0].number === 3) {
            return require('../images/horse-3.jpg')
        }
        else if (racePlacement[0].number === 4) {
            return require('../images/horse-4.jpg')
        }
    }
    const firstImage = winnerImage()

    return (
        <>
            <StatusBar barStyle='light-content' />
            <Modal animationType='slide' presentationStyle='pageSheet' visible={modalOpen}>
                <View style={{flex:1, alignItems:'center'}}>
                    <Text style={{flex:.11, fontSize:30, fontWeight:'600', textAlign:'center', top:15, textDecorationLine:'underline'}}>Race Result</Text>

                    <View style={{flex:.45, justifyContent:'space-between'}}>
                        <Image style={styles.winnerImage} source={firstImage} />
                        <Text style={{textAlign:'center', fontSize:30, fontWeight:'600'}}>Winner - {racePlacement[0].name}</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Text>2nd - {racePlacement[1].name}</Text>
                            <Text>3rd - {racePlacement[2].name}</Text>
                            <Text>4th - {racePlacement[3].name}</Text>
                        </View>
                    </View>

                    <View style={{flex:.08, justifyContent:'flex-end'}}>
                        <Text style={{fontSize:20, fontWeight:'500'}}>Your pick -    {horseList[Number(pick[1]) - 1].name}</Text>
                    </View>

                    <View style={{flex:.16, justifyContent:'center'}}>
                        {
                            checkWinner()
                            ? <Text numberOfLines={1} style={{fontSize:27, fontWeight:'600', color:'green'}}>You Win !!! ₦ {Platform.OS === 'android' ? totalEarnings.toFixed(2) : totalEarnings.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits : 2})}</Text>
                            : <Text style={{fontSize:40, fontWeight:'600', color:'crimson'}}>You Lose :(</Text>
                        }
                    </View>

                    <View style={{flex:.2, paddingLeft:20, paddingRight:20, width:window.width - 20}}>
                        <Pressable onPress={()=>navigation.replace('Single-placement')} style={({pressed}) => pressed ? styles.modalBtnPressed : styles.modalBtn}>
                            <Text style={{fontSize:18, color:'white', fontWeight:'600'}}>Continue betting</Text>
                        </Pressable>
                        <Pressable onPress={()=>navigation.navigate('Home')} style={({pressed}) => pressed ? styles.modalBtnPressed : styles.modalBtn}>
                            <Text style={{fontSize:18, color:'white', fontWeight:'600'}}>Go back Home</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <ImageBackground style={{flex:1}} source={require('../images/race-page-bgn.jpg')} >
                {
                    !raceStart
                    ? <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:35, color:'white'}}>Race will begin in ...</Text>
                        <Text style={{fontSize:150, color:'white'}}>{countdown}</Text>
                    </View>
                    : <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text
                        numberOfLines={1}
                        style={{color:'white',fontSize:27, fontStyle:'italic', fontWeight:'700', bottom: 40}}>
                            Cash: ₦ {Platform.OS === 'android' ? cash.toFixed(2) : cash.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits : 2})}
                        </Text>
                        <View style={{backgroundColor:'white', width:window.width - 20, borderRadius:15, flex:.7, justifyContent:'space-evenly', paddingLeft:15, paddingRight:15}}>
                            <View style={styles.track}>
                                <Animated.View style={[styles.horse, { backgroundColor:'red', transform:[{translateX:horse1Animation}] }]}>
                                    <Text style={{bottom:65, position:'absolute'}}>Bolt</Text>
                                    <Image source={require('../images/race-horse.png')} />
                                </Animated.View>
                            </View>
                            <View style={styles.track}>
                                <Animated.View style={[styles.horse, { backgroundColor:'gold', transform:[{translateX:horse2Animation}] }]}>
                                    <Text style={{bottom:65, position:'absolute'}}>Henry</Text>
                                    <Image source={require('../images/race-horse.png')} />
                                </Animated.View>
                            </View>
                            <View style={styles.track}>
                                <Animated.View style={[styles.horse, { backgroundColor:'green', transform:[{translateX:horse3Animation}] }]}>
                                    <Text style={{bottom:65, position:'absolute'}}>Gus</Text>
                                    <Image source={require('../images/race-horse.png')} />
                                </Animated.View>
                            </View>
                            <View style={styles.track}>
                                <Animated.View style={[styles.horse, { backgroundColor:'purple', transform:[{translateX:horse4Animation}] }]}>
                                    <Text style={{bottom:65, position:'absolute'}}>Julius</Text>
                                    <Image source={require('../images/race-horse.png')} />
                                </Animated.View>
                            </View>
                        </View>
                    </View>
                }
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    track : {
        backgroundColor:'rgb(215, 215, 215)',
        height:20,
        justifyContent:'center',
        borderRadius: 10,
    },
    horse : {
        borderRadius:50,
        width:45,
        height:45,
        padding:30,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute'
    },
    winnerImage : {
        width : 350,
        height : 220
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
    }
})