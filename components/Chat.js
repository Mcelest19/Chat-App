import { useEffect, useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView, } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {  
  const { name, color } = route.params;
  const [messages, setMessages] = useState([]);
  //to send messages
  const onSend = (newMessages) => {
  setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
 }

 useEffect(() => {
  setMessages([
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
    {
      _id: 2,
      text: 'This is a system message',
      createdAt: new Date(),
      system: true,
    },
  ]);
}, []);


  useEffect(() => {
    navigation.setOptions({ title: name })
  }, []);

  // to change the speech bubble color
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }


  return (
    <View style={[{ backgroundColor: color }, styles.container]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
        }}
      />
      {/* fixes the keyboard entering the input box */}
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    </View>
   )
 
 }
 
 const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
 
 export default Chat;