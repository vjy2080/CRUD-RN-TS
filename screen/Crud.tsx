import React, { useState } from 'react';
import { View, Text, FlatList, RefreshControl, } from 'react-native';
import { useHandleApi, createItem, updateItem, deleteItem } from '../query/ReactQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { styles } from '../style';
import { onlineManager } from "@tanstack/react-query";
import TodoCard from '../components/TodoCard';
import InputModal from '../components/InputModal';
import Header from '../components/Header';
import { useAddItem } from '../hook/useAddItem';
import { useUpdateItem } from '../hook/useUpdateItem';



interface Item {
  id: number;
  title: string;
  description: string;
}

const CrudExample: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isOnline, setIsOnline] = useState(onlineManager.isOnline());

  const queryClient = useQueryClient()
  const { data, refetch } = useHandleApi();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch()
    reset()
    setRefreshing(false);
  }, []);


  const reset = () => {
    console.log('reset');
    setTitle('');
    setDesc('');
    setUpdateId(null);
  }

  // For Create a new todo

  const { addItem } = useAddItem();
  // const { updateItem, isLoading } = useUpdateItem();

  const addHandle = () => {
    setModalVisible(false);
    reset();
    addItem({ title, desc });
  };

  // For Update an existing todo

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

  const { updateItemData } = useUpdateItem();

  const updateHandle = () => {
    if (title && desc && updateId) {
      updateItemData({ title, desc, id: updateId });
      reset();
      setModalVisible(false);
    } else {
      console.error('Please fill required fields');
    }
  };

// For Delete todo

  const deleteHandle = (id: number) => {
    if (id) {
      deleteData.mutate(id);
      refetch()
    } else {
      console.error('Something went wrong');
    }
  };

  const deleteData = useMutation({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: () => reset(),
  });

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
            title={title}
            setTitle={setTitle}
            desc={desc}
            setDesc={setDesc}
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
