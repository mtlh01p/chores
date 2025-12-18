import { Stack, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DetailsParams {
  itemId?: string;
}

interface HistoryEntry {
  date: string;
  chestArmsCount: number;
  legsBackCount: number;
  absShouldersCount: number;
}

function WorkHistoryScreen() {
  const statusBarHeight = Platform.OS === 'ios' ? 20 : Platform.OS === 'android' ? 50 : 0;
  const [historyData, setHistoryData] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem('@workout:History');
        if (storedHistory) {
          setHistoryData(JSON.parse(storedHistory));
        }
      } catch (e) {
        console.error('Failed to load workout history:', e);
      }
    };
    fetchHistory();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <AntDesign
        name="arrow-left"
        size={24}
        color="white"
        style={[styles.backIcon, { top: statusBarHeight + 10, left: 20, zIndex: 100 }]}
        onPress={() => router.back()}
      />
      <ScrollView style={styles.scroll}>
        <View style={[styles.container, { paddingTop: statusBarHeight + 10 }]}>
          <Text style={styles.title}>Riwayat Olahraga</Text>
          {historyData.length === 0 ? (
            <Text style={styles.detailText}>Riwayat pertama akan muncul malam ini.</Text>
          ) : (
            historyData.map((entry, index) => (
              <View key={index} style={{ marginBottom: 20, width: '100%' }}>
                <Text style={styles.dateText}>{entry.date}</Text>
                <View style={styles.historyBox}>
                  <View style={styles.historyItem}>
                    <Text style={styles.countText}>{entry.chestArmsCount}</Text>
                    <Text style={styles.labelHistory}>Dada/Lengan</Text>
                  </View>
                  <View style={styles.historyItem}>
                    <Text style={styles.countText}>{entry.legsBackCount}</Text>
                    <Text style={styles.labelHistory}>Kaki/Punggung</Text>
                  </View>
                  <View style={styles.historyItem}>
                    <Text style={styles.countText}>{entry.absShouldersCount}</Text>
                    <Text style={styles.labelHistory}>Perut/Bahu</Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: 'black', // Assuming a dark background
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backIcon: {
    marginBottom: 5,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyBox: {
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  historyItem: {
    alignItems: 'center',
  },
  countText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  labelHistory: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default WorkHistoryScreen;