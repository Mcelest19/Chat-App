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
              style={[styles.radioButton, { backgroundColor: "#ff5e5e" }]}
              onPress={() => setColor("#ff5e5e")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#69cfff" }]}
              onPress={() => setColor("#69cfff")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#8a95a5" }]}
              onPress={() => setColor("#8a95a5")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#fff869" }]}
              onPress={() => setColor("#fff869")}
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
    marginBottom: 100,
    height: '44%',
    width: '88%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20
},
textInBox: {
  fontWeight: "bold",
  fontSize: 15,
  color: '#8a95a5',
},
  radioButtonContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
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
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    color: "white"
  },
});

export default Start;