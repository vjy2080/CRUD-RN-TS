import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, RefreshControl } from 'react-native';
import { useHandleApi, createItem, updateItem, deleteItem } from './ReactQuery';
import { useMutation } from '@tanstack/react-query';

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
  const { data, refetch } = useHandleApi();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch()
    reset()
    // setTimeout(() => {
      setRefreshing(false);
    // }, 2000);
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
    onSuccess: () => reset(),
  });
  const update = useMutation({
    mutationFn: () => updateItem(title, desc, updateId!),
    onSuccess: () => reset(),
  });
  const deleteData = useMutation({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: () => reset(),
  });

  const addHandle = () => {
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
      style={{ flexDirection: 'row', backgroundColor: '#d3d3d3', alignSelf: 'center', margin: 3, borderRadius: 3, padding: 5 }}
    >
      <View style={{ flex: 4 / 4 }}>
        <Text
          style={{ paddingHorizontal: 5, marginHorizontal: 5 }}

        >Title:{item.title}</Text>
        <Text
          style={{ paddingHorizontal: 5, marginHorizontal: 5 }}

        >Desc:{item.description}</Text>
      </View>
      <View style={{ flex: 1 / 4 }}>
        <View style={{ marginBottom: 3 }}>
          <Button title="Edit" onPress={() => editHandle(item.id)} />
        </View>
        <Button title="Delete" color={'#F75D59'} onPress={() => deleteHandle(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16, width: '100%' }}>
      <View style={{ flexDirection: 'row', marginBottom: 10, backgroundColor: '#ADD8E6', padding: 10, borderRadius: 5 }}>
        <TextInput
          style={{ borderWidth: 1, borderColor: 'black', paddingHorizontal: 5, marginHorizontal: 5, borderRadius: 5 }}
          autoFocus
          placeholder="Add title here"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={{ borderWidth: 1, borderColor: 'black', paddingHorizontal: 5, marginHorizontal: 5, borderRadius: 5 }}
          placeholder="Add description here"
          value={desc}
          onChangeText={(text) => setDesc(text)}
        />
        <View style={{ marginStart: 2 }}>
          <Button
            color={'green'}
            title={updateId ? 'Update' : 'Create'}
            onPress={() => (updateId ? updateHandle() : addHandle())}
          />
        </View>
      </View>
      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={data}
        keyExtractor={(item: any) => item?.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default CrudExample;
