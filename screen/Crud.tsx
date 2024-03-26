import React, { useState } from 'react';
import { View, Text, FlatList, RefreshControl, } from 'react-native';
import { useHandleApi} from '../query/ReactQuery';
import { styles } from '../style';
import { onlineManager } from "@tanstack/react-query";
import TodoCard from '../components/TodoCard';
import InputModal from '../components/InputModal';
import Header from '../components/Header';
import { useAddItem } from '../hook/useAddItem';
import { useUpdateItem } from '../hook/useUpdateItem';
import { useDeleteItem } from '../hook/useDeleteItem';

interface Item {
  id: number;
  title: string;
  description: string;
}

const CrudExample: React.FC = () => {
  // const [title, setTitle] = useState<string>('');
  // const [description, setDesc] = useState<string>('');
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


  const reset = () => {
    console.log('reset');
    // setTitle('');
    // setDesc('');
    setUpdateId(null);
  }

  // For Create a new todo

  const { addItem } = useAddItem();

  const addHandle = (data) => {
    setModalVisible(false);
    reset();
    addItem(data);
  };

  // For Update an existing todo

  const editHandle = (id: number) => {
    const selectedItem = data?.find((item: Item) => item.id === id);
    if (selectedItem) {
      // setTitle(selectedItem.title);
      // setDesc(selectedItem.description);
      setUpdateId(id);
      setModalVisible(true);
      console.log(id);
    }
  };

  const { updateItemData } = useUpdateItem();
  
  const updateHandle = () => {
    if (title && description && updateId) {
      updateItemData({ title, description, id: updateId });
      reset();
      setModalVisible(false);
    } else {
      console.error('Please fill required fields');
    }
  };
  
  // For Delete todo
  const { deleteItemData } = useDeleteItem();

  const deleteHandle = (id: number) => {
    if (id) {
   deleteItemData({id});
    } else {
      console.error('Something went wrong');
    }
  };
 
  return (
    <>
      <View style={styles.inputContainer}>
        <Header
        isOnline={isOnline}
          setIsOnline={setIsOnline}
          setModalVisible={setModalVisible}
        />
        <FlatList
          style={{ height: '100%' }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={data}
          keyExtractor={(item: any) => item?.id}
          renderItem={
            ({ item }: any) => (
              <TodoCard item={item} editHandle={editHandle} deleteHandle={deleteHandle} />
            )
          }
          ListEmptyComponent={
            <View style={styles.centeredView}>
              <Text style={{ marginTop: 50, fontSize: 30, color: 'grey' }}>The list is empty</Text>
              <Text style={{ marginTop: 20, fontSize: 20, color: 'blue' }}>Try to add Something</Text>
            </View>
          }
        />
        <View style={styles.centeredView}>
          <InputModal
            modalVisible={modalVisible}
            // title={title}
            // setTitle={setTitle}
            // description={description}
            // setDesc={setDesc}
            setModalVisible={setModalVisible}
            reset={reset}
            updateId={updateId}
            updateHandle={updateHandle}
            addHandle={addHandle}
          />
        </View>

      </View>
    </>
  );
};

export default CrudExample;
