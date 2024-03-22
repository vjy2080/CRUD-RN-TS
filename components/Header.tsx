import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from '../style';
import { onlineManager } from '@tanstack/react-query';
import { MaterialIcons } from '@expo/vector-icons';



const Header = ({isOnline,setIsOnline,setModalVisible}:any) => {
  return (
    <View style={styles.startButton}>
          <Text style={{ color: 'brown', fontSize: 30, textAlign: 'center', marginStart: 15 }}>TODO List</Text>
        <View>
          <Text style={styles.statusText}> Status </Text>
          <Text style={styles.status}> {isOnline ? "ONLINE" : "OFFLINE"}</Text>
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
              <MaterialIcons name='wifi' size={30} color="blue" />
              :
              <MaterialIcons name='wifi-off' size={30} color="red" />
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
