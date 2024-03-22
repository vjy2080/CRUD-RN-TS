import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from '../style';
import { onlineManager } from '@tanstack/react-query';
import { MaterialIcons } from '@expo/vector-icons';



const Header = ({setIsOnline,setModalVisible}:any) => {
  return (
    <View style={styles.startButton}>
          <Text style={{ color: 'brown', fontSize: 30, textAlign: 'center', marginStart: 15 }}>TODO List</Text>
          <View>
            <Pressable
              onPress={() => {
                onlineManager.setOnline(true);
                setIsOnline(onlineManager.isOnline());
              }}
            >
              <MaterialIcons name='wifi' size={35} color="blue" />
            </Pressable>
          </View>
          <View>
            <Pressable
              onPress={() => {
                onlineManager.setOnline(false);
                setIsOnline(onlineManager.isOnline());
              }}
            >
              <MaterialIcons name='wifi-off' size={35} color="red" />
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
