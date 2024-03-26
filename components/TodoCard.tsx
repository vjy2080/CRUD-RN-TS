import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from '../style';
import { MaterialIcons } from '@expo/vector-icons';


const TodoCard = ({item,editHandle,deleteHandle}:any) => {
  return (
    <View
      style={styles.card}
    >
      <View style={styles.inputBlock}>
        <Text style={styles.headerText}>Title:</Text>
        <Text
          style={styles.cardText}
        >{item.title}</Text>
        <Text style={styles.headerText}>description:</Text>

        <Text
          style={styles.cardText}

        >{item.description}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ marginBottom: 10, backgroundColor: 'blue', borderRadius: 10 }}>
          <Pressable
            onPress={() => editHandle(item.id)}
          >
            <MaterialIcons name="edit-note" size={40} color="white" />
          </Pressable>
        </View>
        <View style={{ backgroundColor: '#F75D59', borderRadius: 10 }}>
          <Pressable
            onPress={() => deleteHandle(item.id)}
          >
            <MaterialIcons name="delete-outline" size={40} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default TodoCard;
