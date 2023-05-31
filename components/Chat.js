import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import {  collection,  addDoc,  onSnapshot,  query,  orderBy,} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ db, route, navigation, isConnected, storage }) => {  
  const { name, color, userID } = route.params;
  const [messages, setMessages] = useState([]);

  let unsubMessages;

 useEffect(() => {
  navigation.setOptions({ title: name });
  if (isConnected === true) {
        // Unregister current onSnapshot() listener to avoid registering multiple
    // listeners when useEffect code is re-executed.
    if (unsubMessages) unsubMessages();
    unsubMessages = null;
    // Create stream with database to read messages
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      cacheMessages(newMessages);
      setMessages(newMessages);
    });
  } else loadCachedMessages();
  return () => {
    if (unsubMessages) unsubMessages();
  };
}, [isConnected]);

  // Get messages from offline storage
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

   // Save messages to offline storage
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

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

// Only render text iput toolbar when online
const renderInputToolbar = (props) => {
  if (isConnected) {
    return <InputToolbar {...props} />;
  } else {
    return null;
  }
};

  // Render custom action component
  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };

  // Render element with map and geolocation
  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

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
        renderInputToolbar={renderInputToolbar}
        onSend={messages => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}        
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