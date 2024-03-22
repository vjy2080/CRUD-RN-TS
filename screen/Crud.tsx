import React, { useState } from 'react';
import { View, Text, FlatList, RefreshControl, } from 'react-native';
import { useHandleApi, createItem, updateItem, deleteItem } from '../query/ReactQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { styles } from '../style';
import { onlineManager } from "@tanstack/react-query";
import TodoCard from '../components/TodoCard';
import InputModal from '../components/InputModal';
import Header from '../components/Header';


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
  const create = useMutation({
    mutationKey: ['addPost'],
    mutationFn: ({ title, desc }:any) => createItem(title, desc),
    onMutate: ({ title, desc }) => {
      let previousData: any[] = queryClient.getQueryData(['fetchData']) ?? []
      let oldData = [...previousData]
      console.log("oldData", oldData)
      if (oldData.length > 0) {
        oldData.push({
          id: new Date(),
          title: title,
          description: desc
        })
      } else {
        oldData = [{
          id: new Date(),
          title: title,
          description: desc
        }]
      }

      queryClient.setQueryData(['fetchData'], oldData)

      return { previousData }
    },
    onSuccess: () => {
      reset();
      setModalVisible(false);
      queryClient.invalidateQueries({queryKey: ['fetchData']})
    },
    onError: (error, variables, context) => {
      console.log('eeeeeee', error)
      reset();
      setModalVisible(false);
      queryClient.setQueryData(['fetchData'], context?.previousData)
    }

  });
  const update = useMutation({
    mutationFn: () => updateItem(title, desc, updateId!),
    onSuccess: () => {
      reset();
      refetch();
      setModalVisible(false);
    }
  });
  const deleteData = useMutation({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: () => reset(),
  });

  const addHandle = () => {
    setModalVisible(false);
    reset();
    if (title && desc) {
      create.mutate({ title, desc });
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
      reset();
      refetch();
      setModalVisible(false);
    } else {
      console.error('Please fill required field');
    }
  };

  const deleteHandle = (id: number) => {
    if (id) {
      deleteData.mutate(id);
      refetch()
    } else {
      console.error('Something went wrong');
    }
  };

  const renderItem = ({ item }: any) => (
    <TodoCard item={item} editHandle={editHandle} deleteHandle={deleteHandle} />
  );

  return (
    <>
      <View style={styles.inputContainer}>
        <Header
          setIsOnline={setIsOnline}
          setModalVisible={setModalVisible}
        />
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
