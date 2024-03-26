import React from 'react';
import { View, Text, Modal, TextInput, Button, Pressable } from 'react-native';
import { styles } from '../style';
import { useForm, Controller } from "react-hook-form";

const InputModal = ({
  modalVisible,
  setModalVisible,
  reset,
  updateId,
  updateHandle,
  addHandle
}: any) => {

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: any) => {
    if (updateId) {
      updateHandle(data);
    } else {
      addHandle(data);
    }
    formReset(); // Reset the form fields
  };


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
    >
      <View style={styles.internalView}>
        <View style={styles.modalView}>

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.titleInput}
                autoFocus
                maxLength={15}
                placeholder="Add title here"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="title"
          />
          {errors.title && <Text>This is required.</Text>}

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={styles.descInput}
                placeholder="Add description here"
                maxLength={65}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="description"
          />
          {errors.description && <Text>This is required.</Text>}

          <View style={{ alignItems: 'flex-end', flexDirection: 'row-reverse' }}>
            <View style={{ marginHorizontal: 5 }}>
              <Button title='Close' color={'red'} onPress={() => { setModalVisible(false); reset() }} />
            </View>
            <Pressable>
              <Button 
                title={updateId ? 'Update' : 'Add'} 
                color={'green'}
                onPress={handleSubmit(onSubmit)} 
              />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default InputModal;
