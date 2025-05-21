import { StyleSheet, Image, Platform, TouchableOpacity, Text, View } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useFocusEffect } from '@react-navigation/native';
import Card from '@/components/card';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { prayData } from '@/components/prayers';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@settings:selectedMasa';
const CHECKLIST_STORAGE_KEY_PRAYERS = '@prayers:Checklist';
const PRAYER_HISTORY_STORAGE_KEY = '@prayers:History';
const LAST_RESET_DATE_PRAYER_KEY = '@prayer:lastResetDatePrayers';

interface PrayerItem {
  label: string;
  isChecked: boolean;
}

interface PrayerHistoryEntry {
  date: string;
  prayersCompleted: string[];
}

export default function SpiritScreen() {
  const [selectedMasa, setSelectedMasa] = useState('');
  const [isChecklistLoaded, setIsChecklistLoaded] = useState(false);
  const [prayersData, setPrayersData] = useState<PrayerItem[]>([]);
  const [MTRS1, setMTRS1] = useState('transparent');
  const [MTRS2, setMTRS2] = useState('transparent');
  const [KI, setKI] = useState('transparent');
  const [MTRS3, setMTRS3] = useState('transparent');
  const [RO, setRO] = useState('transparent');
  const router = useRouter();
  const [currentDay, setCurrentDay] = useState('');

  const movetoHistory = () => {
    router.push('/history_pray');
  };

  const loadMasa = useCallback(async () => {
    try {
      const storedMasa = await AsyncStorage.getItem(STORAGE_KEY);
      setSelectedMasa(storedMasa || 'Biasa');
    } catch (error) {
      console.error('Failed to load masa in PrayersScreen:', error);
    }
  }, []);

  const loadChecklistData = useCallback(async () => {
    try {
      const storedPrayers = await AsyncStorage.getItem(CHECKLIST_STORAGE_KEY_PRAYERS);
      const parsedPrayers = storedPrayers ? JSON.parse(storedPrayers) : [
        { label: '06.00', isChecked: false },
        { label: '12.00', isChecked: false },
        { label: '15.00', isChecked: false },
        { label: '18.00', isChecked: false },
        { label: '22.00', isChecked: false },
      ];
      setPrayersData(parsedPrayers);
      setMTRS1(parsedPrayers.find(item => item.label === '06.00')?.isChecked ? '#424242' : 'transparent');
      setMTRS2(parsedPrayers.find(item => item.label === '12.00')?.isChecked ? '#424242' : 'transparent');
      setKI(parsedPrayers.find(item => item.label === '15.00')?.isChecked ? '#424242' : 'transparent');
      setMTRS3(parsedPrayers.find(item => item.label === '18.00')?.isChecked ? '#424242' : 'transparent');
      setRO(parsedPrayers.find(item => item.label === '22.00')?.isChecked ? '#424242' : 'transparent');
      setIsChecklistLoaded(true);
    } catch (e) {
      console.error('Failed to load checklist data', e);
    }
  }, []);

  const saveChecklistData = async (data: PrayerItem[]) => {
    try {
      await AsyncStorage.setItem(CHECKLIST_STORAGE_KEY_PRAYERS, JSON.stringify(data));
      const updatedMTRS1 = data.find(item => item.label === '06.00')?.isChecked ? '#424242' : 'transparent';
      const updatedMTRS2 = data.find(item => item.label === '12.00')?.isChecked ? '#424242' : 'transparent';
      const updatedKI = data.find(item => item.label === '15.00')?.isChecked ? '#424242' : 'transparent';
      const updatedMTRS3 = data.find(item => item.label === '18.00')?.isChecked ? '#424242' : 'transparent';
      const updatedRO = data.find(item => item.label === '22.00')?.isChecked ? '#424242' : 'transparent';
      setMTRS1(updatedMTRS1);
      setMTRS2(updatedMTRS2);
      setKI(updatedKI);
      setMTRS3(updatedMTRS3);
      setRO(updatedRO);
    } catch (e) {
      console.error('Failed to save checklist data', e);
    }
  };

  const handlePrayerToggle = (label: string) => {
    const updatedPrayers = prayersData.map(prayer =>
      prayer.label === label ? { ...prayer, isChecked: !prayer.isChecked } : prayer
    );
    setPrayersData(updatedPrayers);
    saveChecklistData(updatedPrayers);
  };

  const resetPrayers = async () => {
    try {
      const resetData = prayersData.map(item => ({ ...item, isChecked: false }));
      setPrayersData(resetData);
      await AsyncStorage.setItem(CHECKLIST_STORAGE_KEY_PRAYERS, JSON.stringify(resetData));
      await AsyncStorage.setItem(LAST_RESET_DATE_PRAYER_KEY, new Date().toDateString());
      console.log('Prayer checklist reset at midnight.');
    } catch (error) {
      console.error('Failed to reset prayer checklist', error);
    }
  };

  const storePrayerHistory = async (resetDate: string, currentPrayers: PrayerItem[]) => {
    try {
      const prayersCompleted = currentPrayers.filter(item => item.isChecked).map(item => item.label);
      const newHistoryEntry: PrayerHistoryEntry = {
        date: resetDate,
        prayersCompleted: prayersCompleted,
      };
      const storedHistory = await AsyncStorage.getItem(PRAYER_HISTORY_STORAGE_KEY);
      const existingHistory = storedHistory ? JSON.parse(storedHistory) : [];
      const updatedHistory = [...existingHistory, newHistoryEntry];
      await AsyncStorage.setItem(PRAYER_HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
      console.log('Prayer history stored for:', resetDate, prayersCompleted);
    } catch (error) {
      console.error('Failed to store prayer history', error);
    }
  };

  useEffect(() => {
    loadMasa();
    loadChecklistData();
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const now = new Date();
    setCurrentDay(days[now.getDay()]);

    const checkMidnight = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const todayDate = now.toDateString();

      AsyncStorage.getItem(LAST_RESET_DATE_PRAYER_KEY).then(lastReset => {
        if (hours === 0 && minutes === 0 && seconds < 5 && lastReset !== todayDate) {
          storePrayerHistory(todayDate, prayersData);
          resetPrayers();
        }
      });
    };

    const intervalId = setInterval(checkMidnight, 1000);
    return () => clearInterval(intervalId);
  }, [loadMasa, loadChecklistData, prayersData]);

  useFocusEffect(
    useCallback(() => {
      loadChecklistData();
    }, [loadChecklistData])
  );

  useFocusEffect(
    useCallback(() => {
      const catchUpPrayers = async () => {
        const today = new Date().toDateString();
        const lastResetDate = await AsyncStorage.getItem(LAST_RESET_DATE_PRAYER_KEY);

        if (lastResetDate !== today) {
          console.log('App was inactive at midnight — catching up prayer history and resetting.');
          await storePrayerHistory(today, prayersData); // Store yesterday's state
          await resetPrayers(); // Reset today's state
        }
      };

      catchUpPrayers().catch(error =>
        console.error('Error catching up prayers on focus', error)
      );
    }, [prayersData])
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#400099' }}
      headerImage={
        <FontAwesome5
          size={310}
          color="#8139e6"
          name="pray"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Spirit</ThemedText>
      </ThemedView>
      <ThemedText>Berdoalah sesuai jadwal. Tepati janjimu dengan Tuhan.</ThemedText>
      <View style={[styles.box]}>
        <TouchableOpacity style={[styles.box2, { backgroundColor: MTRS1 }]} onPress={() => handlePrayerToggle('06.00')}>
          <ThemedText style={{ fontSize: 16, fontWeight: 'bold' }}>06.00</ThemedText>
          <ThemedText style={{ fontSize: 11, fontWeight: 'bold' }}>MT/RS 1</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.box2, { backgroundColor: MTRS2 }]} onPress={() => handlePrayerToggle('12.00')}>
          <ThemedText style={{ fontSize: 16, fontWeight: 'bold' }}>12.00</ThemedText>
          <ThemedText style={{ fontSize: 11, fontWeight: 'bold' }}>MT/RS 2</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.box2, { backgroundColor: KI }]} onPress={() => handlePrayerToggle('15.00')}>
          <ThemedText style={{ fontSize: 16, fontWeight: 'bold' }}>15.00</ThemedText>
          <ThemedText style={{ fontSize: 11, fontWeight: 'bold' }}>KI</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.box2, { backgroundColor: MTRS3 }]} onPress={() => handlePrayerToggle('18.00')}>
          <ThemedText style={{ fontSize: 16, fontWeight: 'bold' }}>18.00</ThemedText>
          <ThemedText style={{ fontSize: 11, fontWeight: 'bold' }}>MT/RS 3</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.box2, { backgroundColor: RO }]} onPress={() => handlePrayerToggle('22.00')}>
          <ThemedText style={{ fontSize: 16, fontWeight: 'bold' }}>22.00</ThemedText>
          <ThemedText style={{ fontSize: 11, fontWeight: 'bold' }}>RO</ThemedText>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.button]} onPress={movetoHistory}>
        <Text style={styles.buttonTitle}>Lihat Riwayat</Text>
      </TouchableOpacity>
      <ThemedText type="subtitle">{currentDay} dalam Pekan {selectedMasa}</ThemedText>
      <ThemedText>
        {selectedMasa === 'Paskah' ? (
          prayData.filter(card => card.title != 'Malaikat Tuhan').map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              item={card}
            />
          ))
        ) : (
          prayData.filter(card => card.title != 'Ratu Surga').map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              item={card}
            />
          ))
        )}
      </ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    borderRadius: 8,
    marginBottom: 8,
    padding: 16,
    width: '100%',
    backgroundColor: '#262626',
    elevation: 1,
  },
  checkedLabel: {
    color: 'gray',
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    textAlign: 'center',
  },
  box: {
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box2: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '18%',
    marginBottom: 0,
    paddingTop: 10,
    padding: 5,
  },
  item: {
    alignItems: 'center',
    color: 'green',
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
  checkboxContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  labelContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
  },
  label_d: {
    fontSize: 16,
    color: 'black',
    flexShrink: 1,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: 'white',
    flexShrink: 1,
    textAlign: 'center',
  },
});