import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";

const Start = ({ navigation }) => {
  const [text, setText] = useState("");
  const [color, setColor] = useState("");

  return (
    <ImageBackground
      source={require("../assets/chatBackgroundImage.png")}
      resizeMode='cover'
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>Chat App!</Text>
        </View>
        <View style={styles.inputBox}>
          <TextInput
            placeholder='Your name'
            style={styles.input}
            onChangeText={setText}
          />
          <Text style={styles.textInBox}>Choose Background Color:</Text>
          <View style={styles.radioButtonContainer}>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#090C08" }]}
              onPress={() => setColor("#090C08")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#474056" }]}
              onPress={() => setColor("#474056")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#8A95A5" }]}
              onPress={() => setColor("#8A95A5")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#B9C6AE" }]}
              onPress={() => setColor("#B9C6AE")}
            ></TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("Chat", {
                name: text ? text : "User",
                color: color ? color : "white",
              })
            }
          >
            <Text>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "88%",  

  },
  inputBox: {
    backgroundColor: '#fff',
    marginBottom: 60,
    height: '44%',
    width: '88%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20
},
textInBox: {
  fontWeight: "300",
  fontSize: 16,
  color: '#757083',  
},
  radioButtonContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
  },
  title: {
    fontWeight: "600",
    fontSize: 45,
    color: "white",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    fontSize: 16,
    fontWeight: "600",    
    padding: 10,
    width: "88%",
  },
  radioButton: {
    backgroundColor: "black",
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  input: {
    height: 50,
    width: "88%",
    margin: 12,
    fontSize: 16,
    fontWeight: "300",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    color: "#757083",
    opacity: 50,
  },
});

export default Start;