import { prayData, PrayText } from '@/components/prayers';
import { workData, WorkoutText } from '@/components/workouts';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

interface DetailsParams extends Record<string, string | string[] | undefined> {
  itemId?: string;
}

type PrayItem = (typeof prayData)[number];
type WorkItem = (typeof workData)[number];
type DetailItem = PrayItem | WorkItem;

function DetailsScreen() {
  const { itemId } = useLocalSearchParams() as DetailsParams;
  const statusBarHeight = Platform.OS === 'ios' ? 20 : Platform.OS === 'android' ? 50 : 0;
  const selectedItem = [...prayData, ...workData].find((item): item is DetailItem => item.id === itemId);

  if (!selectedItem) {
    return (
      <>
      <Stack.Screen options={{ headerShown: false }} />
      <AntDesign name="arrow-left" size={24} color="white" style={[styles.backIcon, { top: statusBarHeight + 10, left:20, zIndex:100,}]} onPress={() => router.back()} />
      <ScrollView style={styles.scroll}>
        <View style={[styles.container, { paddingTop: statusBarHeight + 10 }]}>
          <Text style={styles.title}>Halaman ini tidak tersedia.</Text>
          <Text style={styles.detailText}>Silakan kembali ke halaman utama.</Text>
        </View>
      </ScrollView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <AntDesign name="arrow-left" size={24} color="white" style={[styles.backIcon, { top: statusBarHeight + 10, left:20, zIndex:100, }]} onPress={() => router.back()} />
      <ScrollView style={styles.scroll}>
        <View style={[styles.container, { paddingTop: statusBarHeight + 10 }]}>
          {selectedItem.imageUrl && <Image source={{ uri: selectedItem.imageUrl }} style={styles.image} />}
          <Text style={styles.title}>{selectedItem.title}</Text>
          {selectedItem.description && <Text style={styles.detailText}>{selectedItem.description}</Text>}
          {selectedItem.id && prayData.some(item => item.id === selectedItem.id) && (
            <>
            <PrayText itemId={selectedItem.id} onResetTrigger={false} onResetComplete={function (): void {
                throw new Error('Function not implemented.');
              } } />
            <Text style={styles.amin_lat}>Amen.</Text>
            </>
          )}
          {selectedItem.id && workData.some(item => item.id === selectedItem.id) && (
            <>
            <WorkoutText itemId={selectedItem.id} />
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  backIcon: {
    marginBottom: 5,
    padding: 8,
    backgroundColor: 'black',
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',  
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  amin_lat: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  amin_ind: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 25,
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