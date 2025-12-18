import { router, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DetailsParams {
  itemId?: string;
}

interface PrayerHistoryEntry {
  date: string;
  checkedPrayers: string[];
}

function PrayHistoryScreen() {
  const statusBarHeight = Platform.OS === 'ios' ? 20 : Platform.OS === 'android' ? 50 : 0;
  const [history, setHistory] = useState<PrayerHistoryEntry[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const stored = await AsyncStorage.getItem('@prayer:History');
        if (stored) {
          setHistory(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Failed to load prayer history:', e);
      }
    };
    fetchHistory();
  }, []);

  const prayerLabels = [
    { label: '06.00', id: '06.00' },
    { label: '12.00', id: '12.00' },
    { label: '15.00', id: '15.00' },
    { label: '18.00', id: '18.00' },
    { label: '22.00', id: '22.00' },
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <AntDesign name="arrow-left" size={24} color="white" style={[styles.backIcon, { top: statusBarHeight + 10, left: 20, zIndex: 100 }]} onPress={() => router.back()} />
      <ScrollView style={styles.scroll}>
        <View style={[styles.container, { paddingTop: statusBarHeight + 10 }]}>
          <Text style={styles.title}>Riwayat Doa</Text>
          {history.length === 0 ? (
            <Text style={styles.detailText}>Riwayat pertama akan muncul malam ini.</Text>
          ) : (
            history.map((entry, index) => (
              <View key={index} style={{ marginBottom: 15, width: '100%' }}>
                <Text style={styles.dateText}>{entry.date}</Text>
                <View style={styles.historyBox}>
                  {prayerLabels.map((prayer) => (
                    <View key={prayer.id} style={styles.historyItem}>
                      <View style={[styles.checkbox, entry.checkedPrayers.includes(prayer.id) && styles.checkedCheckbox]}>
                        {entry.checkedPrayers.includes(prayer.id) && <Text style={styles.checkMark}>✓</Text>}
                      </View>
                      <Text style={styles.labelHistory}>{prayer.label}</Text>
                    </View>
                  ))}
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
    backgroundColor: 'black',
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
    flexWrap: 'wrap',
  },
  historyItem: {
    alignItems: 'center',
    width: '45%',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  labelHistory: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  detailText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#277db3',
    borderColor: '#277db3',
  },
  checkMark: {
    color: 'white',
    fontSize: 12,
  },
});

export default PrayHistoryScreen;