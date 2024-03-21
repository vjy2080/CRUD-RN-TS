import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, RefreshControl, Pressable, Modal, Alert } from 'react-native';
import { useHandleApi, createItem, updateItem, deleteItem } from './ReactQuery';
import { useMutation } from '@tanstack/react-query';
import { styles } from './style';
import { MaterialIcons } from '@expo/vector-icons';
import { onlineManager } from "@tanstack/react-query";


interface Item {
  id: number;
  title: string;
  description: string;
}

const CrudExample: React.FC = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isOnline, setIsOnline] = useState(onlineManager.isOnline());

  const { data, refetch } = useHandleApi();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch()
    reset()
    setRefreshing(false);
  }, []);


useEffect(() => {
  return () => {
    refetch()
  };
}, []);

  const reset = () => {
    console.log('reset');
    refetch();
    setTitle('');
    setDesc('');
    setUpdateId(null);
  }
  const create = useMutation({
    mutationFn: () => createItem(title, desc),
    onSuccess: () => {
      reset();
      setModalVisible(false);
    }
  });
  const update = useMutation({
    mutationFn: () => updateItem(title, desc, updateId!),
    onSuccess: () => {
      reset();
      setModalVisible(false);
    }
  });
  const deleteData = useMutation({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: () => reset(),
  });

  const addHandle = () => {
    setModalVisible(true);
    if (title && desc) {
      create.mutate();
    } else {
      console.error('Please fill required field');
    }
  };

  const editHandle = (id: number) => {
    const selectedItem = data?.find((item: Item) => item.id === id);
    if (selectedItem) {
      setTitle(selectedItem.title);
      setDesc(selectedItem.description);
      setUpdateId(id);
      setModalVisible(true);
      console.log(id);
    }
  };

  const updateHandle = () => {
    if (title && desc) {
      update.mutate();
    } else {
      console.error('Please fill required field');
    }
  };

  const deleteHandle = (id: number) => {
    if (id) {
      deleteData.mutate(id);
    } else {
      console.error('Something went wrong');
    }
  };

  const renderItem = ({ item }: any) => (
    <View
      style={styles.card}
    >
      <View style={styles.inputBlock}>
        <Text style={styles.headerText}>Title:</Text>
        <Text
          style={styles.cardText}
        >{item.title}</Text>
        <Text style={styles.headerText}>Desc:</Text>

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

  return (
    <>
      <View style={styles.inputContainer}>
        <View style={styles.startButton}>
          {/* <Button title='Update' onPress={() => setModalVisible(true)} /> */}
          <Text style={{ color: 'brown', fontSize: 30, textAlign: 'center',marginStart:15 }}>TODO List</Text>
          <View>
            <Pressable
            onPress={()=>{
              onlineManager.setOnline(true);
            setIsOnline(onlineManager.isOnline());
            }}
            >
              <MaterialIcons name='wifi' size={35} color="blue"/>
            </Pressable>
          </View>
          <View>
            <Pressable
            onPress={()=>{
              onlineManager.setOnline(false);
            setIsOnline(onlineManager.isOnline());
            }}
            >
              <MaterialIcons name='wifi-off' size={35} color="red"/>
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
        <View>
        <Text style={styles.status}>Internet Status: {isOnline ? "ONLINE" : "OFFLINE"}</Text>
        </View>
        <FlatList
          style={{ height: '100%' }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={data}
          keyExtractor={(item: any) => item?.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={styles.centeredView}>
              <Text style={{ marginTop: 50, fontSize: 30, color: 'red' }}>The list is empty</Text>
              <Text style={{ marginTop: 20, fontSize: 20, color: 'blue' }}>Try to add Something</Text>
            </View>
          }
        />
        <View style={styles.centeredView}>
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
        </View>

      </View>
    </>
  );
};

export default CrudExample;
