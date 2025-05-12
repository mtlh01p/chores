import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { prayData, PrayText } from '@/components/prayers';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface DetailsParams {
  itemId?: string;
}

type PrayItem = (typeof prayData)[number];
type DetailItem = PrayItem;

function PrayHistoryScreen() {
  const statusBarHeight = Platform.OS === 'ios' ? 20 : Platform.OS === 'android' ? 50 : 0;
const [history, setHistory] = React.useState<{ timestamp: string; states: Record<number, boolean> }[]>([]);

useEffect(() => {
  const fetchHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem('checklist_history');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load history:', e);
    }
  };
  fetchHistory();
}, []);
const checklistLabels = [
  { id: 0, label: 'M' },
  { id: 1, label: 'S' },
  { id: 2, label: 'S' },
  { id: 3, label: 'R' },
  { id: 4, label: 'K' },
  { id: 5, label: 'J' },
  { id: 6, label: 'S' },
];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <AntDesign name="arrowleft" size={24} color="white" style={[styles.backIcon, { top: statusBarHeight + 10, left:20, zIndex:100, }]} onPress={() => router.back()} />
      <ScrollView style={styles.scroll}>
        <View style={[styles.container, { paddingTop: statusBarHeight + 10 }]}>
        <Text style={styles.title}>Riwayat Doa</Text>
        {history.length === 0 ? (
          <Text style={styles.detailText}>Belum ada riwayat. Riwayat akan muncul pada hari Minggu pekan ini.</Text>
          ) : (
          history.map((entry, index) => (
            <View key={index} style={{ marginBottom: 15 }}>
            <Text style={styles.amin_ind}>
                Pekan {new Date(entry.timestamp).toLocaleString()}
            </Text>
              <View style={[styles.box]}>
                {Object.entries(entry.states).map(([id, checked]) => (
                  <TouchableOpacity
                    key={id}
                    style={styles.item}
                    disabled={true}
                  >
                    <View style={styles.checkboxContainer}>
                      <View style={[styles.checkbox, checked && styles.checkedCheckbox]}>
                        {checked && <Text style={styles.checkMark}>✓</Text>}
                      </View>
                    </View>
                    <View style={styles.labelContainer}>
                      <Text style={[styles.label, checked && styles.checkedLabel]}>
                        {checklistLabels.find(i => i.id === +id)?.label || `#${id}`}
                      </Text>
                    </View>
                  </TouchableOpacity>
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
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '4%',
    marginRight: '4%',
  },
  checkedCheckbox: {
    backgroundColor: '#277db3',
    borderColor: '#277db3',
  },
  checkMark: {
    color: 'white',
    fontSize: 12,
  },
  checkboxContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  labelContainer: { 
    width: '100%',
    alignItems: 'center', 
    marginTop: 5, 
  },
    item: {
    alignItems: 'center',
    color: 'green',
  },
  label: {
    fontSize: 16,
    color: 'white',
    flexShrink: 1,
  },
  checkedLabel: {
    color: 'gray',
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
    box: {
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  amin_ind: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
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

export default PrayHistoryScreen;