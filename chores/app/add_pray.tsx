import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, Platform, Button } from 'react-native';
import { Stack, router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Assuming you have a way to update prayData (e.g., a context or state management)
// import { usePrayers } from '../contexts/PrayersContext';

interface AddParams {
  itemId?: string;
  [key: string]: any;
}

export function AddScreen() {
  const statusBarHeight = Platform.OS === 'ios' ? 20 : Platform.OS === 'android' ? 50 : 0;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [text, setText] = useState('');
  // const { addPrayer } = usePrayers(); // Assuming you have a function to update prayData

  const generateId = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '');
  };

const handleAddPrayer = async () => {
  if (title && text) {
    const newId = generateId(title);
    const newPrayer = { title, description, imageUrl, text: newId, id: newId };

    try {
      const existingPrayersJSON = await AsyncStorage.getItem('prayData');
      const existingPrayers = existingPrayersJSON ? JSON.parse(existingPrayersJSON) : [];

      // Add the new prayer
      const updatedPrayers = [...existingPrayers, newPrayer];

      await AsyncStorage.setItem('prayData', JSON.stringify(updatedPrayers));

      console.log('Prayer saved successfully!');
      router.back();
    } catch (error) {
      console.error('Error saving prayer:', error);
      alert('Failed to save prayer.');
    }
  } else {
    alert('Title and Text are required.');
  }
};

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={[styles.container, { paddingTop: statusBarHeight + 10 }]}>
          <AntDesign name="arrowleft" size={24} color="white" marginBottom={15} onPress={() => router.back()} />
          <Text style={styles.title}>Add New Prayer</Text>

          <Text style={styles.label}>Title:</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Enter Title" />

          <Text style={styles.label}>Description:</Text>
          <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Enter Description" />

          <Text style={styles.label}>Image URL:</Text>
          <TextInput style={styles.input} value={imageUrl} onChangeText={setImageUrl} placeholder="Enter Image URL" />

          <Text style={styles.label}>Text:</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={text}
            onChangeText={setText}
            placeholder="Enter Prayer Text (use newlines for breaks)"
            multiline
            numberOfLines={5}
          />

          <Button title="Add Prayer" onPress={handleAddPrayer} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    color: 'white',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default AddScreen;