import { Provider, useDispatch, useSelector } from 'react-redux'
import { giveUp, validate} from '../store/actions/sudokuActions'
import React , { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, Dimensions, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Board = ({doGiveUp}) =>{
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [getBoard, setBoard] = useState([])
  // const [getBoardOrigin, setBoardOrigin] = useState([])
  const [getResult, setResult] = useState("")
  const { result} = useSelector(state => state.sudokuReducers)
  const {sudokuBoard} = useSelector(state => state.sudokuReducers)
  
  
  useEffect( () => {
    setBoard(JSON.parse(JSON.stringify(sudokuBoard)))
    // setBoardOrigin(sudokuBoard)
  },[sudokuBoard])
  
  const handleOnChange = (e,row, col) => {
    // const {value} = e.target
    const newBoard = [...getBoard]
    newBoard[row][col] = e
    setBoard(newBoard)
  }
  
  useEffect( () => {
    if(result){
        if (result.status == "solved"){
          navigation.navigate("Finish")
        }
        else{
          alert("not solved")
        }
    }
  },[result])

  const validateSudoku = () =>{
    dispatch(validate(getBoard))
  }

  return (
    <View>
      <View  style={styles.wrapperBoard}>
        { getBoard.map((board, row) => {
          return (
            <View key={`${row}`}>
              {board.map((item, col) => {
                  return (
                    <>
                    <TextInput key={`${col}`} 
                      value={
                        item == 0 ? "" : `${item}`
                      } 
                      onChangeText={
                        (e) => handleOnChange(e,row, col)
                      } 
                      style={
                        sudokuBoard[row][col] == 0 ? styles.box(row,col) : styles.boxFix(row,col)
                      }
                      maxLength={1} 
                      editable={
                         sudokuBoard[row][col] == 0 ? true : false  
                        }
                      keyboardType={'numeric'}
                      /> 
                    </>
                  )
                })
                
              }
              </View>
              )
            })  
          }      
      </View>
      <View style={styles.btnBottom}>
        <View style={styles.validateBtn}>
          <Button color="#706fd3" style={styles.validateBtn} onPress={ ()=>  {
            validateSudoku()
          }} title="Validate"/>
        </View>
        <View style={styles.giveUpBtn}>
          <Button color="#ff793f" style={styles.giveUpBtn} onPress={ ()=>  {
            doGiveUp()
          }} title="Give Up"/>
        </View>
      </View>
    </View> 
  )
}

const widthWindows = Dimensions.get("window").width
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#40407a'
  },
  box: (row,col) => ({
    textAlign:'center', 
    width: (widthWindows-30)/9, 
    height: 30, 
    fontSize: 20,
    color: 'black',
    borderRightWidth: (row + 1) % 3 == 0 ? 2 : 0.3,
    borderBottomWidth: (col + 1) % 3 == 0 ? 2 : 0.3,
    borderLeftWidth: (row == 0 ) ? 2 : 0.3,
    borderTopWidth: (col == 0 ) ? 2 : 0.3,
    borderColor:'#2c2c54'  
  }),
  boxFix: (row,col) => ({
    textAlign:'center', 
    width: (widthWindows-30)/9, 
    height: 30, 
    fontSize: 20,
    borderRightWidth: (row + 1) % 3 == 0 ? 2 : 0.3,
    borderBottomWidth: (col + 1) % 3 == 0 ? 2 : 0.3,
    borderLeftWidth: (row == 0 ) ? 2 : 0.3,
    borderTopWidth: (col == 0 ) ? 2 : 0.3,
    borderColor:'#2c2c54',
    color: 'white',
    backgroundColor: "#ff793f",
  }),
  buttonDiff: {
    marginLeft: 5,
    marginRight: 5
  },
  wrapper: {
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 5
  },
  wrapperBoard: {
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: '#fbf9f5',
    padding: 5
  },
  title: {
    color: '#f7f1e3',
    fontSize: 20,
    marginBottom: 20,
    borderBottomColor: "#ff793f",
    borderBottomWidth: 3,
    textAlign: "center"
  },
  validateBtn:{
    marginTop: 10,
    borderTopColor: "#ff793f",
    borderTopWidth: 4,
  },
  giveUpBtn:{
    marginTop: 10,
    borderTopColor: "#706fd3",
    borderTopWidth: 4,
    marginLeft: 10
  },
  btnBottom: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems:'center', 
    justifyContent: 'center', 
    marginTop: widthWindows-700,
  }
});