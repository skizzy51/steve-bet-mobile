import { useEffect, useState } from 'react'
import { Alert, Modal, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import BottomNav from '../components/BottomNav'
import TopNav from '../components/TopNav'
import { RandomNumber } from '../functions/RandomNumber'
import { AntDesign } from '@expo/vector-icons';
import StakeModal from '../components/StakeModal'


const teams = require('../data/teams.json')

export default function Football({ navigation }) {
    const [randomTeamsList, setRandomTeamsList] = useState([...teams])
    const [matchupArray, setMatchupArray] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [betSelections, setBetSelections] = useState([])
    const [stake, setStake] = useState(100)
    const [totalOdds, setTotalOdds] = useState(0)

    useEffect(()=>{
        setRandomTeamsList(prevList => prevList.sort(()=>0.5 - Math.random()))
        function matchups () {
            const dummyRandomArray = randomTeamsList
            while (dummyRandomArray.length > 0) {
                let team1odds = 0
                let team2odds = 0
                let drawOdds = 0
                let team1Score = 0
                let team2Score = 0
                if (dummyRandomArray[0].strength < dummyRandomArray[1].strength) {
                    if (Math.abs(dummyRandomArray[0].strength - dummyRandomArray[1].strength) === 1) {
                        team1odds = RandomNumber(1.8, 2.1).toFixed(2)
                        team2odds = RandomNumber(2.0, 2.3).toFixed(2)
                        drawOdds = RandomNumber(2.2, 2.5).toFixed(2)
                        team1Score = Math.floor(RandomNumber(0, 4))
                        team2Score = Math.floor(RandomNumber(0, 4))
                    }
                    else if (Math.abs(dummyRandomArray[0].strength - dummyRandomArray[1].strength) === 2) {
                        team1odds = RandomNumber(1.5, 1.8).toFixed(2)
                        team2odds = RandomNumber(2.2, 2.5).toFixed(2)
                        drawOdds = RandomNumber(2.5, 2.8).toFixed(2)
                        team1Score = Math.floor(RandomNumber(0, 5))
                        team2Score = Math.floor(RandomNumber(0, 3))
                    }
                    else if (Math.abs(dummyRandomArray[0].strength - dummyRandomArray[1].strength) === 3) {
                        team1odds = RandomNumber(1.2, 1.5).toFixed(2)
                        team2odds = RandomNumber(2.7, 3.0).toFixed(2)
                        drawOdds = RandomNumber(3.0, 3.5).toFixed(2)
                        team1Score = Math.floor(RandomNumber(0, 5))
                        team2Score = Math.floor(RandomNumber(0, 3))
                    }
                }
                else if (dummyRandomArray[0].strength > dummyRandomArray[1].strength) {
                    if (Math.abs(dummyRandomArray[0].strength - dummyRandomArray[1].strength) === 1) {
                        team2odds = RandomNumber(1.8, 2.1).toFixed(2)
                        team1odds = RandomNumber(2.0, 2.3).toFixed(2)
                        drawOdds = RandomNumber(2.2, 2.5).toFixed(2)
                        team2Score = Math.floor(RandomNumber(0, 4))
                        team1Score = Math.floor(RandomNumber(0, 3))
                    }
                    else if (Math.abs(dummyRandomArray[0].strength - dummyRandomArray[1].strength) === 2) {
                        team2odds = RandomNumber(1.5, 1.8).toFixed(2)
                        team1odds = RandomNumber(2.2, 2.5).toFixed(2)
                        drawOdds = RandomNumber(2.5, 2.8).toFixed(2)
                        team2Score = Math.floor(RandomNumber(0, 5))
                        team1Score = Math.floor(RandomNumber(0, 3))
                    }
                    else if (Math.abs(dummyRandomArray[0].strength - dummyRandomArray[1].strength) === 3) {
                        team2odds = RandomNumber(1.2, 1.5).toFixed(2)
                        team1odds = RandomNumber(2.7, 3.0).toFixed(2)
                        drawOdds = RandomNumber(3.0, 3.5).toFixed(2)
                        team2Score = Math.floor(RandomNumber(0, 5))
                        team1Score = Math.floor(RandomNumber(0, 3))
                    }
                }
                else if (dummyRandomArray[0].strength === dummyRandomArray[1].strength) {
                    team1odds = RandomNumber(2.2, 2.5).toFixed(2)
                    team2odds = RandomNumber(2.4, 2.6).toFixed(2)
                    drawOdds = RandomNumber(2.0, 2.29).toFixed(2)
                    team1Score = Math.floor(RandomNumber(0, 3))
                    team2Score = Math.floor(RandomNumber(0, 3))
                }
                let matchupObject = {team1 : dummyRandomArray[0], team2 : dummyRandomArray[1], team1odds, team2odds, drawOdds, team1Score, team2Score, selected : ''}
                dummyRandomArray.splice(0,2)
                setMatchupArray(prevArray => [...prevArray, matchupObject])
            }
        }
        matchups()
    }, [randomTeamsList])

    function handleSelection (selection, sName) {
        let dummy = matchupArray
        let index = dummy.findIndex((element)=>{
            return element.team1.shortName === sName
        })
        if (dummy[index].selected === selection) {
            dummy[index].selected = ''
            setMatchupArray(prevArray => [...dummy])
        }else{
            dummy[index].selected = selection
            setMatchupArray(prevArray => [...dummy])
        }

        let dummySelection = []
        matchupArray.forEach(element => {
            if (element.selected.length > 1) {
                dummySelection.push(element)
            }
        })
        setBetSelections(dummySelection)
    }

    function openModal () {
        let add = 0
        betSelections.forEach(element => {
            if (element.selected === 'team1') {
                add += Number(element.team1odds)
            }
            else if (element.selected === 'team2') {
                add += Number(element.team2odds)
            }else if (element.selected === 'draw') {
                add += Number(element.drawOdds)
            }
        })

        setTotalOdds(add.toFixed(2))

        if (add < 1) {
            return Alert.alert('Bets must be selected')
        }
        setModalOpen(true)
    }
    const teamsRender = matchupArray.map(matchup => {
        return (
            <View key={matchup.team1.name} style={{paddingBottom:10, borderBottomWidth:.9, borderBottomColor:'grey', marginBottom:25}}>
                <View style={{justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
                    <Text style={{fontSize:22}}>{matchup.team1.name}</Text>
                    <Text>vs</Text>
                    <Text style={{fontSize:22}}>{matchup.team2.name}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:15}}>
                    <Pressable onPress={()=>handleSelection('team1', matchup.team1.shortName)} style={matchup.selected === 'team1' ? styles.betBtnSelected : styles.betBtn}>
                        <Text style={styles.betBtnText}>Home win</Text>
                        <Text style={styles.betBtnText}>{matchup.team1odds}</Text>
                    </Pressable>
                    <Pressable onPress={()=>handleSelection('draw', matchup.team1.shortName)} style={matchup.selected === 'draw' ? styles.betBtnSelected : styles.betBtn}>
                        <Text style={styles.betBtnText}>Draw</Text>
                        <Text style={styles.betBtnText}>{matchup.drawOdds}</Text>
                    </Pressable>
                    <Pressable onPress={()=>handleSelection('team2', matchup.team1.shortName)} style={matchup.selected === 'team2' ? styles.betBtnSelected : styles.betBtn}>
                        <Text style={styles.betBtnText}>Away win</Text>
                        <Text style={styles.betBtnText}>{matchup.team2odds}</Text>
                    </Pressable>
                </View>
            </View>
        )
    })

    const totalEarnings = stake * totalOdds
    const redirectScreen = 'Match-sim-page'
    const returnPage = 'Football'
    const data = { stake, totalOdds, totalEarnings, matchupArray, betSelections, returnPage }

    return (
        <>
            <StatusBar barStyle="dark-content"/>

            <StakeModal values={{modalOpen, setModalOpen, setStake, redirectScreen, data}} />

            <View style={{flex:1, paddingLeft : 16, paddingRight : 16}}>
                <View style={{flex : .25, justifyContent : 'center'}}>
                    <TopNav/>
                </View>

                <Text style={{textAlign:'center',flex:.1, fontSize:17}}>Make bet selections</Text>

                <ScrollView style={{flex:1}}>{ teamsRender }</ScrollView>

                <View style={{flex:.25}}>
                    <Pressable onPress={openModal} style={ ({pressed})=> pressed ? styles.confirmStakePressed : styles.confirmStake }>
                        <Text style={{fontSize:22, color:'white', fontWeight:'600'}}>Confirm stake</Text>
                    </Pressable>
                </View>
            </View>
            <BottomNav navigation={navigation} />
        </>
    )
}

const styles = StyleSheet.create({
    betBtn : {
        flex:.22,
        backgroundColor : '#04791C',
        paddingTop : 6.5,
        paddingBottom : 6.5,
        borderRadius : 8
    },
    betBtnSelected : {
        flex:.22,
        backgroundColor : '#044311',
        paddingTop : 6.5,
        paddingBottom : 6.5,
        borderRadius : 8
    },
    betBtnText : {
        textAlign:'center',
        color:'white',
        fontWeight : '500'
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