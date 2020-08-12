import React , { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Picker, TextInput, Dimensions, Button, Image, Alert } from 'react-native';
import logo from '../assets/sudoku.png'

export const Home = ({navigation}) => {
  const [username, setUsername] = useState("")
  const [selectedValue, setSelectedValue] = useState("easy");
  const onChangeHandle = (e) => {
    setUsername(e)
  }

  const navigatePage = () => {
    if(username == ""){
      // return alert("Please fill name..")
      return Alert.alert(
        "Caution",
        "Please fill name..",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false })
    } else {
      navigation.navigate("Game", {
        name: username,
        difficulty: selectedValue
      })
      setUsername("")
      setSelectedValue("easy")
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Image source={logo} style={styles.image}/>
        <Text style={styles.title}> Welcome to SUDOKU!  </Text>
        <TextInput style={styles.inputName} placeholderTextColor="#aaa69d" placeholder="enter your name . . ."
          onChangeText= {(e)=> onChangeHandle(e)} value={`${username}`}
        />
        <Picker
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          selectedValue={selectedValue}
        >
          <Picker.Item label="Easy" value="easy" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Hard" value="hard" />
        </Picker>
        <Button color="#ff793f" title="LET'S PLAY" onPress={
          () => navigatePage()
        }/> 
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
  picker: {
    height: 30, 
    width: 90,
    backgroundColor: "#f7f1e3",
    color: "#40407a",
    marginBottom: 10,
    borderRadius: 4,
    
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
    
  },
  image: {
    height: 100, 
    width: 100,
    marginBottom: 10
  }
});