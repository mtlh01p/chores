import Card from '@/components/card';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { prayData } from '@/components/prayers';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const STORAGE_KEY = '@settings:selectedMasa';
const CHECKLIST_STORAGE_KEY_PRAYERS = '@prayers:Checklist';
const PRAYER_HISTORY_STORAGE_KEY = '@prayers:History';
const LAST_RESET_DATE_PRAYER_KEY = '@prayer:lastResetDatePrayers';

interface PrayerItem {
  label: string;
  isChecked: boolean;
}

export default function SpiritScreen() {
  const router = useRouter();
  const [selectedMasa, setSelectedMasa] = useState('Biasa');
  const [currentDay, setCurrentDay] = useState('');
  const [prayersData, setPrayersData] = useState<PrayerItem[]>([
    { label: '06.00', isChecked: false },
    { label: '12.00', isChecked: false },
    { label: '15.00', isChecked: false },
    { label: '18.00', isChecked: false },
    { label: '22.00', isChecked: false },
  ]);

  const loadInitialData = useCallback(async () => {
    try {
      const [storedMasa, storedChecklist] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY),
        AsyncStorage.getItem(CHECKLIST_STORAGE_KEY_PRAYERS),
      ]);
      
      if (storedMasa) setSelectedMasa(storedMasa);
      if (storedChecklist) setPrayersData(JSON.parse(storedChecklist));
      
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      setCurrentDay(days[new Date().getDay()]);
    } catch (e) {
      console.error('Failed to load data', e);
    }
  }, []);

  const saveHistory = async (date: string, data: PrayerItem[]) => {
    try {
      const history = await AsyncStorage.getItem(PRAYER_HISTORY_STORAGE_KEY);
      const parsed = history ? JSON.parse(history) : [];
      const entry = { date, completed: data.filter(p => p.isChecked).map(p => p.label) };
      await AsyncStorage.setItem(PRAYER_HISTORY_STORAGE_KEY, JSON.stringify([...parsed, entry]));
    } catch (e) { console.error(e); }
  };

  const checkMidnightReset = useCallback(async () => {
    const today = new Date().toDateString();
    const lastReset = await AsyncStorage.getItem(LAST_RESET_DATE_PRAYER_KEY);

    if (lastReset !== today) {
      // Save yesterday's data before resetting
      const currentData = await AsyncStorage.getItem(CHECKLIST_STORAGE_KEY_PRAYERS);
      if (currentData && lastReset) {
        await saveHistory(lastReset, JSON.parse(currentData));
      }

      const resetData = prayersData.map(p => ({ ...p, isChecked: false }));
      setPrayersData(resetData);
      await AsyncStorage.setItem(CHECKLIST_STORAGE_KEY_PRAYERS, JSON.stringify(resetData));
      await AsyncStorage.setItem(LAST_RESET_DATE_PRAYER_KEY, today);
    }
  }, [prayersData]);

  const togglePrayer = async (label: string) => {
    const updated = prayersData.map(p => p.label === label ? { ...p, isChecked: !p.isChecked } : p);
    setPrayersData(updated);
    await AsyncStorage.setItem(CHECKLIST_STORAGE_KEY_PRAYERS, JSON.stringify(updated));
  };

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  useFocusEffect(
    useCallback(() => {
      checkMidnightReset();
    }, [checkMidnightReset])
  );

  // Derived style logic (replaces MTRS1, MTRS2 etc state)
  const getBoxStyle = (label: string) => ({
    ...styles.box2,
    backgroundColor: prayersData.find(p => p.label === label)?.isChecked ? '#424242' : 'transparent',
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#400099' }}
      headerImage={<FontAwesome5 size={310} color="#8139e6" name="pray" style={styles.headerImage} />}>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Spirit</ThemedText>
      </ThemedView>

      <View style={styles.box}>
        {['06.00', '12.00', '15.00', '18.00', '22.00'].map((time, idx) => {
          const subLabels = ['MT/RS 1', 'MT/RS 2', 'KI', 'MT/RS 3', 'RO'];
          return (
            <TouchableOpacity key={time} style={getBoxStyle(time)} onPress={() => togglePrayer(time)}>
              <ThemedText style={styles.boxTextMain}>{time}</ThemedText>
              <ThemedText style={styles.boxTextSub}>{subLabels[idx]}</ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/history_pray')}>
        <Text style={styles.buttonTitle}>Lihat Riwayat</Text>
      </TouchableOpacity>

      <ThemedText type="subtitle">{currentDay} dalam Pekan {selectedMasa}</ThemedText>

      <View>
        {prayData
          .filter(card => selectedMasa === 'Paskah' ? card.id !== 'malaikattuhan' : card.id !== 'ratusurga')
          .map((card, index) => (
            <Card key={index} title={card.title} description={card.description} imageUrl={card.imageUrl} item={card} />
          ))}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: { color: '#808080', bottom: -90, left: -35, position: 'absolute' },
  titleContainer: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  button: { borderRadius: 8, padding: 16, backgroundColor: '#262626', marginBottom: 20 },
  buttonTitle: { color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 18 },
  box: { borderRadius: 8, backgroundColor: '#1a1a1a', padding: 15, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between' },
  box2: { borderRadius: 12, alignItems: 'center', width: '18%', paddingVertical: 10 },
  boxTextMain: { fontSize: 14, fontWeight: 'bold' },
  boxTextSub: { fontSize: 10, fontWeight: 'bold' }
});