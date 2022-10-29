import { useState } from 'react'
import { Alert, Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import BottomNav from '../components/BottomNav'
import StakeModal from '../components/StakeModal'
import TopNav from '../components/TopNav'
import { RandomNumber } from '../functions/RandomNumber'
import Checkbox from '../components/Checkbox'


export default function SinglePlacement({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [checkBox1, setCheckBox1] = useState(false)
  const [checkBox2, setCheckBox2] = useState(false)
  const [checkBox3, setCheckBox3] = useState(false)
  const [checkBox4, setCheckBox4] = useState(false)

  const [stake, setStake] = useState(100)
  const [singleHorse, setSingleHorse] = useState({horse : '', odds : 0})

  const max = 3.5
  const min = 2.2

  const [horseList, setHorseList] = useState([
      { name : 'Bolt', number : 1, odds : RandomNumber(min, max).toFixed(2) },
      { name : 'Henry', number : 2, odds : RandomNumber(min, max).toFixed(2) },
      { name : 'Gus', number : 3, odds : RandomNumber(min, max).toFixed(2) },
      { name : 'Julius', number : 4, odds : RandomNumber(min, max).toFixed(2) }
  ])
  
  function checkBox (box) {
    if (box === 'checkBox1') {
      setCheckBox1(true)
      setCheckBox2(false)
      setCheckBox3(false)
      setCheckBox4(false)
      setSingleHorse({ horse: 'horse-1', odds: horseList[0].odds })
    }
    else if (box === 'checkBox2') {
      setCheckBox1(false)
      setCheckBox2(true)
      setCheckBox3(false)
      setCheckBox4(false)
      setSingleHorse({ horse: 'horse-2', odds: horseList[1].odds })
    }
    else if (box === 'checkBox3') {
      setCheckBox1(false)
      setCheckBox2(false)
      setCheckBox3(true)
      setCheckBox4(false)
      setSingleHorse({ horse: 'horse-3', odds: horseList[2].odds })
    }
    else if (box === 'checkBox4') {
      setCheckBox1(false)
      setCheckBox2(false)
      setCheckBox3(false)
      setCheckBox4(true)
      setSingleHorse({ horse: 'horse-4', odds: horseList[3].odds })
    }
  }
  
  function confirmStake () {
    if (checkBox1 || checkBox2 || checkBox3 || checkBox4) setModalOpen(true)
    else Alert.alert('A horse must be selected')
  }

  const totalOdds = singleHorse.odds
  const totalEarnings = stake * totalOdds
  const redirectScreen = 'Single-race-page'
  const data = { totalOdds, totalEarnings, singleHorse, horseList, stake }

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='white' />

      <StakeModal values={{modalOpen, setModalOpen, setStake, redirectScreen, data}} />

      <View style={{flex:1, paddingLeft:20, paddingRight:20}}>
        <View style={{flex:.3, justifyContent:'center'}}>
          <TopNav/>
        </View>

        <Text style={{fontSize:20, fontWeight:'500', textAlign:'center', marginBottom:15}}>Place bets on specific positions you think horses would take</Text>

        <View style={{flex:1}}>
          <ScrollView contentContainerStyle={{alignItems:'center'}} horizontal={true}>
            <Pressable onPress={()=>checkBox('checkBox1')} style={styles.horseCard}>
              <Image source={require('../images/horse-1.jpg')} style={styles.cardImg} />
              <Text style={styles.cardText}>Meet <Text style={{fontWeight:'800'}}>Bolt</Text>. Pound for pound the fastest horse on the track, hence the name 'BOLT'. Undoubtedly a winner's pick</Text>
              <Text style={{fontWeight:'700', marginBottom : 15}}>Odds: {horseList[0].odds}</Text>
              <Checkbox checked={checkBox1} />
            </Pressable>
            <Pressable onPress={()=>checkBox('checkBox2')} style={styles.horseCard}>
              <Image source={require('../images/horse-2.jpg')} style={styles.cardImg} />
              <Text style={styles.cardText}>Meet <Text style={{fontWeight:'800'}}>Henry</Text>. The oldest but also, the most experienced horse on the roster. Knows the racetrack more than any horse. A classic pick</Text>
              <Text style={{fontWeight:'700', marginBottom : 15}}>Odds: {horseList[1].odds}</Text>
              <Checkbox checked={checkBox2} />
            </Pressable>
            <Pressable onPress={()=>checkBox('checkBox3')} style={styles.horseCard}>
              <Image source={require('../images/horse-3.jpg')} style={styles.cardImg} />
              <Text style={styles.cardText}>Meet <Text style={{fontWeight:'800'}}>Gus</Text>. The most competitive horse yet. He is always up for a challenge and will always give you your money's worth.</Text>
              <Text style={{fontWeight:'700', marginBottom : 15}}>Odds: {horseList[2].odds}</Text>
              <Checkbox checked={checkBox3} />
            </Pressable>
            <Pressable onPress={()=>checkBox('checkBox4')} style={styles.horseCard}>
              <Image source={require('../images/horse-4.jpg')} style={styles.cardImg} />
              <Text style={styles.cardText}>Meet <Text style={{fontWeight:'800'}}>Julius</Text>. Beautiful and elegant but also precise and accurate.Graces the track with such finesse and evades obstacles with precision.An exquisite pick</Text>
              <Text style={{fontWeight:'700', marginBottom : 15}}>Odds: {horseList[3].odds}</Text>
              <Checkbox checked={checkBox4} />
            </Pressable>
          </ScrollView>
        </View>
        
        <View style={{flex:.22}}>
          <Pressable onPress={confirmStake} style={ ({pressed})=> pressed ? styles.confirmStakePressed : styles.confirmStake }>
            <Text style={{fontSize:22, color:'white', fontWeight:'600'}}>Confirm stake</Text>
          </Pressable>
        </View>
      </View>

      <BottomNav navigation={navigation} />
    </>
  )
}

const styles = StyleSheet.create({
  horseCard : {
    alignItems:'center',
    justifyContent:'center',
    borderWidth : 1.5,
    borderColor : 'black',
    width : 253,
    height : 350,
    borderRadius : 15,
    marginRight : 20
  },
  cardImg : {
    width:227,
    height:151,
    marginBottom : 20
  },
  cardText : {
    textAlign:'center',
    fontSize:12,
    lineHeight : 16,
    paddingLeft : 10,
    paddingRight : 10,
    height : 72
  },
  checkBox : {
    borderColor : '#8A8A8A',
    borderWidth : 1.6,
    borderRadius : 5,
    justifyContent : 'center',
    alignItems : 'center',
    height : 25,
    width : 25
  },
  confirmStake : {
    justifyContent : 'center',
    alignItems : 'center',
    flexDirection : 'row',
    backgroundColor : '#046317',
    paddingTop : 15,
    paddingBottom : 15,
    borderRadius : 7,
    marginTop : 20
  },
  confirmStakePressed : {
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