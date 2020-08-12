import React , { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, Dimensions, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar';
import { getSudokuBoard, giveUp} from '../store/actions/sudokuActions'
import { Board } from '../components/Board'
// import CountDown from 'react-native-countdown-component';
import { reset } from '../store/actions/sudokuActions'


export const Game = ({route: {params}}) => {
  const dispatch = useDispatch()
  const {sudokuBoard, difficulty} = useSelector(state => state.sudokuReducers)
  const [getBoard, setBoard] = useState([])
  const [getDifficulty, setDifficulty] = useState("")
  const [isDone, setIsDone] = useState(false)
  
  useEffect( () => {
    dispatch(getSudokuBoard(params.difficulty))
  },[dispatch])

  useEffect( () => {
    setBoard(JSON.parse(JSON.stringify(sudokuBoard)))
  },[sudokuBoard])

  useEffect( () => {
    setDifficulty(JSON.parse(JSON.stringify(difficulty)))
  },[difficulty])
  

  if(getBoard.length === 0 ) {
    return <Text> please wait ..</Text>
  }
   
  const chooseDifficulty = (level)  => {
    dispatch(reset())
    dispatch(getSudokuBoard(level))
  }

  const doGiveUp = () => {
    dispatch(giveUp(getBoard))
    setIsDone(true)
  }

  if(getDifficulty != difficulty ){
    return <Text>{`loading`}</Text>
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {console.log(getDifficulty, 'getDifficulty')}
      {/* <CountDown
        until={ getDifficulty == 'easy' ? 60 * 20 : getDifficulty == 'medium' ? 60 * 15 : 60 * 10}
        size={30}
        style={{marginTop: 50}}
        onFinish={() => alert('Finished')}
        digitStyle={{backgroundColor: '#FFF'}}
        digitTxtStyle={{color: '#ff793f'}}
        timeToShow={['M', 'S']}
        timeLabels={{m: 'MM', s: 'SS'}}
        running={!isDone}
      /> */}
      <Text style={styles.title}> Solve our SUDOKU, {`${params.name}`} ! </Text>
      <View style={styles.wrapper}>
        <View style={styles.buttonDiff}>
          <Button color="#ffb142" onPress={() => chooseDifficulty("easy")} title="Easy"/>
        </View>
        <View style={styles.buttonDiff}>
          <Button color="#ff793f" onPress={() => chooseDifficulty("medium")} title="Medium"/>
        </View>
        <View style={styles.buttonDiff}>
          <Button color="#ff5252" onPress={() => chooseDifficulty("hard")} title="Hard"/>
        </View>
      </View>
      {getBoard.length >0 ? 
        <View>
          <Board getBoard={getBoard} doGiveUp={doGiveUp}/>
        </View>
        :
        null
      }
      <StatusBar style="auto" />
    </ScrollView>
  )
}

const widthWindows = Dimensions.get("window").width
const styles = StyleSheet.create({
  title: {
    marginTop: widthWindows-250,
    color: '#f7f1e3',
    fontSize: 20,
    marginBottom: 20,
    borderBottomColor: "#ff793f",
    borderBottomWidth: 3,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#40407a'
  },
  buttonDiff: {
    marginLeft: 5,
    marginRight: 5
  },
  wrapper: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 5
  },
});