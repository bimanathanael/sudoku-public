import React , { useEffect, useState, useDebugValue } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, Dimensions, Button } from 'react-native';
import { onChange } from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../store/actions/sudokuActions'
import { useNavigation } from '@react-navigation/native';

export const Finish = () => {
  const {result} = useSelector(state => state.sudokuReducers)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const newGame = () => {
    dispatch(reset())
    navigation.navigate("Home")

  }
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}> CONGRATULATION!  </Text>
        <Button color="#ff793f" title="New Game" onPress={ () => {
          newGame()
        }}/>
      </View>
    </> 
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
  title: {
    color: '#f7f1e3',
    fontSize: 20,
    marginBottom: 20,
    borderBottomColor: "#ff793f",
    borderBottomWidth: 3,
  },
  inputName: {
    height: 40, 
    borderColor: '#aaa69d', 
    borderBottomWidth: 1, 
    color: '#d1ccc0', 
    fontSize: 20, 
    paddingLeft:20, 
    marginBottom:20,
    textAlign: "center",
  }
});