import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from '../style';
import { onlineManager } from '@tanstack/react-query';
import { MaterialIcons } from '@expo/vector-icons';



const Header = ({isOnline,setIsOnline,setModalVisible}:any) => {
  return (
    <View style={styles.startButton}>
          <Text style={styles.logo}>TODO's</Text>
        <View>
          <Text style={styles.statusText}> Status </Text>
          <Text style={styles.status}> {isOnline ?  "OFFLINE" : "ONLINE"}</Text>
        </View>

          <View style={styles.InternetButton}>
            <Pressable
              onPress={
                 isOnline ?
                 () => {onlineManager.setOnline(true);setIsOnline(!isOnline)}
                 :
                 () => {onlineManager.setOnline(false);setIsOnline(!isOnline)}
            }
            >
           { isOnline ?
              <MaterialIcons name='wifi-off' size={30} color="red" />
              :
              <MaterialIcons name='wifi' size={30} color="blue" />
           }
            </Pressable>
          </View>
          <View
            style={styles.startbtn}
          >
            <Pressable
              onPress={() => setModalVisible(true)}
            >
              <MaterialIcons name='add' size={35} color="white" />
            </Pressable>
          </View>

        </View>
  );
}

export default Header;
