import { useState } from 'react'
import { Alert, Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import BottomNav from '../components/BottomNav'
import StakeModal from '../components/StakeModal'
import TopNav from '../components/TopNav'


export default function OverallPlacement({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [stake, setStake] = useState(100)
  
  const [overallHorse1, setOverallHorse1] = useState({ name : 'Bolt', position : 1, number : 1 })
  const [overallHorse2, setOverallHorse2] = useState({ name : 'Henry', position : 1, number : 2 })
  const [overallHorse3, setOverallHorse3] = useState({ name : 'Gus', position : 1, number : 3 })
  const [overallHorse4, setOverallHorse4] = useState({ name : 'Julius', position : 1, number : 4 })
  const overallHorseList = [overallHorse1, overallHorse2, overallHorse3, overallHorse4]
  const overallSelection = [...overallHorseList].sort((a,b) => a.position - b.position)
  
  const [horse1Selection, setHorse1Selection] = useState({ first : false, second : false, third : false, fourth : false })
  const [horse2Selection, setHorse2Selection] = useState({ first : false, second : false, third : false, fourth : false })
  const [horse3Selection, setHorse3Selection] = useState({ first : false, second : false, third : false, fourth : false })
  const [horse4Selection, setHorse4Selection] = useState({ first : false, second : false, third : false, fourth : false })

  function confirmStake () {
    if (
      overallHorse1.position === overallHorse2.position ||
      overallHorse1.position === overallHorse3.position ||
      overallHorse1.position === overallHorse4.position ||
      overallHorse2.position === overallHorse3.position ||
      overallHorse2.position === overallHorse4.position ||
      overallHorse3.position === overallHorse4.position
      ) return Alert.alert('Please select different positions for all horses')
      
      setModalOpen(true)
    }
    
    const totalOdds = 5
    const totalEarnings = stake * totalOdds
    const redirectScreen = 'Overall-race-page'
    const data = { totalOdds, totalEarnings, overallSelection, overallHorseList, stake }

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
            <View style={styles.horseCard}>
              <Image source={require('../images/horse-1.jpg')} style={styles.cardImg} />
              <Text style={styles.cardText}>Meet <Text style={{fontWeight:'800'}}>Bolt</Text>. Pound for pound the fastest horse on the track, hence the name 'BOLT'. Undoubtedly a winner's pick</Text>
              <View style={{flexDirection:'row', justifyContent:'space-between', width:230}} >
                <Pressable onPress={()=>{setHorse1Selection({ first : true, second : false, third : false, fourth : false }); setOverallHorse1({ name : 'Bolt', position : 1, number : 1 })}} style={horse1Selection.first ? styles.positionBtnPressed : styles.positionBtn}>
                  <Text style={{color:'white', fontWeight:'600'}}>1st</Text>
                </Pressable>
                <Pressable onPress={()=>{setHorse1Selection({ first : false, second : true, third : false, fourth : false }); setOverallHorse1({ name : 'Bolt', position : 2, number : 1 })}} style={horse1Selection.second ? styles.positionBtnPressed : styles.positionBtn}>
                  <Text style={{color:'white', fontWeight:'600'}}>2nd</Text>
                </Pressable>
                <Pressable onPress={()=>{setHorse1Selection({ first : false, second : false, third : true, fourth : false }); setOverallHorse1({ name : 'Bolt', position : 3, number : 1 })}} style={horse1Selection.third ? styles.positionBtnPressed : styles.positionBtn}>
                  <Text style={{color:'white', fontWeight:'600'}}>3rd</Text>
                </Pressable>
                <Pressable onPress={()=>{setHorse1Selection({ first : false, second : false, third : false, fourth : true }); setOverallHorse1({ name : 'Bolt', position : 4, number : 1 })}} style={horse1Selection.fourth ? styles.positionBtnPressed : styles.positionBtn}>
                  <Text style={{color:'white', fontWeight:'600'}}>4th</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.horseCard}>
              <Image source={require('../images/horse-2.jpg')} style={styles.cardImg} />
              <Text style={styles.cardText}>Meet <Text style={{fontWeight:'800'}}>Henry</Text>. The oldest but also, the most experienced horse on the roster. Knows the racetrack more than any horse. A classic pick</Text>
              <View style={{flexDirection:'row', justifyContent:'space-between', width:230}} >
                <Pressable onPress={()=>{setHorse2Selection({ first : true, second : false, third : false, fourth : false }); setOverallHorse2({ name : 'Henry', position : 1, number : 2 })}} style={horse2Selection.first ? styles.positionBtnPressed : styles.positionBtn}>
                  <Text style={{color:'white', fontWeight:'600'}}>1st</Text>
                </Pressable>
                <Pressable onPress={()=>{setHorse2Selection({ first : false, second : true, third : false, fourth : false }); setOverallHorse2({ name : 'Henry', position : 2, number : 2 })}} style={horse2Selection.second ? styles.positionBtnPressed : styles.positionBtn}>
                  <Text style={{color:'white', fontWeight:'600'}}>2nd</Text>
                </Pressable>
                <Pressable onPress={()=>{setHorse2Selection({ first : false, second : false, third : true, fourth : false }); setOverallHorse2({ name : 'Henry', position : 3, number : 2 })}} style={horse2Selection.third ? styles.positionBtnPressed : styles.positionBtn}>
                  <Text style={{color:'white', fontWeight:'600'}}>3rd</Text>
                </Pressable>
                <Pressable onPress={()=>{setHorse2Selection({ first : false, second : false, third : false, fourth : true }); setOverallHorse2({ name : 'Henry', position : 4, number : 2 })}} style={horse2Selection.fourth ? styles.positionBtnPressed : styles.positionBtn}>
                  <Text style={{color:'white', fontWeight:'600'}}>4th</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.horseCard}>
              <Image source={require('../images/horse-3.jpg')} style={styles.cardImg} />
              <Text style={styles.cardText}>Meet <Text style={{fontWeight:'800'}}>Gus</Text>. The most competitive horse yet. He is always up for a challenge and will always give you your money's worth.</Text>
              <View style={{flexDirection:'row', justifyContent:'space-between', width:230}} >
                <Pressable onPress={()=>{setHorse3Selection({ first : true, second : false, third : false, fourth : false }); setOverallHorse3({ name : 'Gus', position : 1, number : 3 })}} style={horse3Selection.first ? styles.positionBtnPressed : styles.positionBtn}>
                  <Text style={{color:'white', fontWeight:'600'}}>1st</Text>
                </Pressable>
                <Pressable onPress={()=>{setHorse3Selection({ first : false, second : true, third : false, fourth : false }); setOverallHorse3({ name : 'Gus', position : 2, number : 3 })}} style={horse3Selection.second ? styles.positionBtnPressed : styles.positionBtn}>
                  <Text style={{color:'white', fontWeight:'600'}}>2nd</Text>
                </Pressable>
                <Pressable onPress={()=>{setHorse3Selection({ first : false, second : false, third : true, fourth : false }); setOverallHorse3({ name : 'Gus', position : 3, number : 3 })}} style={horse3Selection.third ? styles.positionBtnPressed : styles.positionBtn}>
                  <Text style={{color:'white', fontWeight:'600'}}>3rd</Text>
                </Pressable>
                <Pressable onPress={()=>{setHorse3Selection({ first : false, second : false, third : false, fourth : true }); setOverallHorse3({ name : 'Gus', position : 4, number : 3 })}} style={horse3Selection.fourth ? styles.positionBtnPressed : styles.positionBtn}>
                  <Text style={{color:'white', fontWeight:'600'}}>4th</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.horseCard}>
              <Image source={require('../images/horse-4.jpg')} style={styles.cardImg} />
              <Text style={styles.cardText}>Meet <Text style={{fontWeight:'800'}}>Julius</Text>. Beautiful and elegant but also precise and accurate.Graces the track with such finesse and evades obstacles with precision.An exquisite pick</Text>
              <View style={{flexDirection:'row', justifyContent:'space-between', width:230}} >
                <Pressable onPress={()=>{setHorse4Selection({ first : true, second : false, third : false, fourth : false }); setOverallHorse4({ name : 'Julius', position : 1, number : 4 })}} style={horse4Selection.first ? styles.positionBtnPressed : styles.positionBtn}>
                  <Text style={{color:'white', fontWeight:'600'}}>1st</Text>
                </Pressable>
                <Pressable onPress={()=>{setHorse4Selection({ first : false, second : true, third : false, fourth : false }); setOverallHorse4({ name : 'Julius', position : 2, number : 4 })}} style={horse4Selection.second ? styles.positionBtnPressed : styles.positionBtn}>
                  <Text style={{color:'white', fontWeight:'600'}}>2nd</Text>
                </Pressable>
                <Pressable onPress={()=>{setHorse4Selection({ first : false, second : false, third : true, fourth : false }); setOverallHorse4({ name : 'Julius', position : 3, number : 4 })}} style={horse4Selection.third ? styles.positionBtnPressed : styles.positionBtn}>
                  <Text style={{color:'white', fontWeight:'600'}}>3rd</Text>
                </Pressable>
                <Pressable onPress={()=>{setHorse4Selection({ first : false, second : false, third : false, fourth : true }); setOverallHorse4({ name : 'Julius', position : 4, number : 4 })}} style={horse4Selection.fourth ? styles.positionBtnPressed : styles.positionBtn}>
                  <Text style={{color:'white', fontWeight:'600'}}>4th</Text>
                </Pressable>
              </View>
            </View>
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
    height : 72,
    marginBottom : 10
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
  },
  positionBtn : {
    backgroundColor : '#04791C',
    paddingLeft : 14,
    paddingRight : 14,
    borderRadius : 6,
    paddingTop : 10,
    paddingBottom : 10,
  },
  positionBtnPressed : {
    backgroundColor : '#044317',
    paddingLeft : 14,
    paddingRight : 14,
    borderRadius : 6,
    paddingTop : 10,
    paddingBottom : 10,
  }
})