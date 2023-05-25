import { useEffect, useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView, } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import {  collection,  addDoc,  onSnapshot,  query,  orderBy,} from "firebase/firestore";

const Chat = ({ db, route, navigation }) => {  
  const { name, color, userID } = route.params;
  const [messages, setMessages] = useState([]);

 useEffect(() => {
  navigation.setOptions({ title: name });
  const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
  const unsubMessages = onSnapshot(q, (docs) => {
    let newMessages = [];
    docs.forEach((doc) => {
      newMessages.push({
        id: doc.id,
        ...doc.data(),
        createdAt: new Date(doc.data().createdAt.toMillis()),
      });
    });
    setMessages(newMessages);
  });
  return () => {
    if (unsubMessages) unsubMessages();
  };
}, []);


const addMessagesItem = async (newMessage) => {
  const newMessageRef = await addDoc(
    collection(db, "messages"),
    newMessage[0]
  );
  if (!newMessageRef.id) {
    Alert.alert(
      "There was an error sending your message. Please try again later"
    );
  }
};

 //to send messages
 const onSend = (newMessages) => {
  addMessagesItem(newMessages);
};

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
          _id: userID,          
        }}
        name={{ name: name }}
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