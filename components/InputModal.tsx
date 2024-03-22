import React from 'react';
import { View, Text, Modal, TextInput, Button, Pressable } from 'react-native';
import { styles } from '../style';


const InputModal = ({
    modalVisible,
    title,
    setTitle,
    desc,
    setDesc,
    setModalVisible,
    reset,
    updateId,
    updateHandle,
    addHandle   
}:any) => {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
  // onRequestClose={() => {
  //   setModalVisible(!modalVisible);
  // }}
  >
    <View style={styles.internalView}>
      <View style={styles.modalView}>
        {/* <View style={styles.inputs}> */}
        <TextInput
          style={styles.titleInput}
          autoFocus
          maxLength={15}
          placeholder="Add title here"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.descInput}
          placeholder="Add description here"
          maxLength={65}
          value={desc}
          onChangeText={(text) => setDesc(text)}
        />
        <View style={{ alignItems: 'flex-end', flexDirection: 'row-reverse' }}>
          <View style={{ marginHorizontal: 5 }}>
            <Button title='Close' color={'red'} onPress={() => { setModalVisible(false); reset() }} />
          </View>
          <Pressable
          >
            <Text></Text>
            <Button
              onPress={() => (updateId ? updateHandle() : addHandle())}
              color={'green'}
              title={updateId ? 'Update' : 'Add'} />
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
  );
}

export default InputModal;
