import React from 'react';
import { View, ScrollView, Text, StyleSheet, Image, Platform } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { prayData } from '@/components/prayers';
import { workData } from '@/components/workouts';
import AntDesign from '@expo/vector-icons/AntDesign';
import { PrayText } from '@/components/prayers';
import { WorkoutText } from '@/components/workouts';

interface DetailsParams {
  itemId?: string;
  [key: string]: any;
}

function DetailsScreen() {
  const { itemId } = useLocalSearchParams<DetailsParams>();
  const statusBarHeight = Platform.OS === 'ios' ? 20 : Platform.OS === 'android' ? 50 : 0;
  let selectedItem;

  if (prayData.find((item) => item.id === itemId)) {
    selectedItem = prayData.find((item) => item.id === itemId);
  } else if (workData.find((item) => item.id === itemId)) {
    selectedItem = workData.find((item) => item.id === itemId);
  } else {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={[styles.container, { paddingTop: statusBarHeight + 10 }]}>
          <AntDesign name="arrowleft" size={24} color="white" marginBottom={15} onPress={() => router.back()} />
          <Text style={styles.title}>Item Not Found</Text>
        </View>
      </ScrollView>
    );
  }

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
          {selectedItem.imageUrl && <Image source={{ uri: selectedItem.imageUrl }} style={styles.image} />}
          <Text style={styles.title}>{selectedItem.title}</Text>
          {selectedItem.description && <Text style={styles.detailText}>{selectedItem.description}</Text>}
          <Text></Text>
          {selectedItem?.id && prayData.find(item => item.id === selectedItem.id) && (
            <PrayText itemId={selectedItem.id} />
          )}
          {selectedItem?.id && workData.find(item => item.id === selectedItem.id) && (
            <WorkoutText itemId={selectedItem.id} />
          )}
          <Text></Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'left',
    marginLeft: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
    textAlign: 'left',
  },
  image: {
    width: '95%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
});

export default DetailsScreen;