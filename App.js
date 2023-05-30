// import the screens
import Start from './components/Start.js';
import Chat from './components/Chat.js';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork, } from "firebase/firestore";
import{ Alert } from "react-native";

import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";

// Create the navigator
const Stack = createNativeStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyAEno7N717iX8UULes3vfRYodOBs8TEhG0",
  authDomain: "chatapp-8ca3c.firebaseapp.com",
  projectId: "chatapp-8ca3c",
  storageBucket: "chatapp-8ca3c.appspot.com",
  messagingSenderId: "354776809796",
  appId: "1:354776809796:web:a23fb52040845330bc5711"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// The app’s main Chat component that renders the chat UI
const App = () => {

  const connectionStatus = useNetInfo();
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen name='Chat'>
                    {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;