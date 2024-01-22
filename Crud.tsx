import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, RefreshControl, Pressable } from 'react-native';
import { useHandleApi, createItem, updateItem, deleteItem } from './ReactQuery';
import { useMutation } from '@tanstack/react-query';
import { styles } from './style';
import { MaterialIcons } from '@expo/vector-icons';

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
    setRefreshing(false);
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
    }
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
        <View style={{ marginBottom: 10, backgroundColor: 'blue',borderRadius:10 }}>
          <Pressable
            onPress={() => editHandle(item.id)}
          >
            <MaterialIcons name="edit-note" size={40} color="white" />
          </Pressable>
        </View>
        <View style={{ backgroundColor: '#F75D59',borderRadius:10 }}>
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
    <View style={styles.inputContainer}>
      <View style={styles.inputs}>
        <TextInput
          style={styles.titleInput}
          autoFocus
          maxLength={15}
          placeholder="Add title here"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={styles.descInput}
          placeholder="Add description here"
          maxLength={65}
          value={desc}
          onChangeText={(text) => setDesc(text)}
        />
        <View style={{ marginStart: 2 }}>
          {/* <Button
            color={'green'}
            title={updateId ? 'Update' : 'Create'}
            onPress={() => }
          /> */}
          <View style={styles.btn}>
            {
              <Pressable
                onPress={() => (updateId ? updateHandle() : addHandle())}
              >
                <MaterialIcons name={updateId ? 'format-list-bulleted-add' : 'add'} size={24} color="white" />
              </Pressable>
            }
          </View>
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
