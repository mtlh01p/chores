import { StyleSheet, Image, Platform, TouchableOpacity, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Card from '@/components/card'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { prayData } from '@/components/prayers';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@settings:selectedMasa';

export default function SpiritScreen() {
  const [selectedMasa, setSelectedMasa] = useState('');

      useEffect(() => {
    const loadMasa = async () => {
      try {
        const storedMasa = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedMasa) {
          setSelectedMasa(storedMasa);
        } else {
          setSelectedMasa('Biasa');
        }
      } catch (error) {
        console.error('Failed to load masa in PrayersScreen:', error);
      }
    };

    loadMasa();
  }, [])

  useEffect(() => {
  const initializeFirstLaunch = async () => {
    const firstLaunch = await AsyncStorage.getItem('first_launch_time');
    if (!firstLaunch) {
      await AsyncStorage.setItem('first_launch_time', new Date().toISOString());
    }
  };
  initializeFirstLaunch();
}, []);


  const router = useRouter();
  const movetoHistory = () => {
    router.push('/history_pray');
  };
  interface ChecklistItem {
  id: number;
  label: string;
  isChecked: boolean;
}
const dayIndex = new Date().getDay();

  const [items, setItems] = useState<ChecklistItem[]>([
    { id: 0, label: 'M', isChecked: false },
    { id: 1, label: 'S', isChecked: false },
    { id: 2, label: 'S', isChecked: false },
    { id: 3, label: 'R', isChecked: false },
    { id: 4, label: 'K', isChecked: false },
    { id: 5, label: 'J', isChecked: false },
    { id: 6, label: 'S', isChecked: false },
  ]);

  useEffect(() => {
    const loadCheckedStates = async () => {
      try {
        const storedStates = await AsyncStorage.getItem('checklist_states');
        if (storedStates !== null) {
          const parsedStates = JSON.parse(storedStates);
          setItems(prevItems =>
            prevItems.map(item => ({
              ...item,
              isChecked: parsedStates[item.id] || false,
            }))
          );
        }
      } catch (error) {
        console.error('Failed to load checklist states:', error);
      }
    };
    loadCheckedStates();
  }, []);

useEffect(() => {
  const checkAndResetWeeklyChecklist = async () => {
    try {
      const now = new Date();
      const thisSundayMidnight = new Date(now);
      thisSundayMidnight.setDate(now.getDate() - thisSundayMidnight.getDay());
      thisSundayMidnight.setHours(0, 0, 0, 0);

      // Get install time
      const firstLaunch = await AsyncStorage.getItem('first_launch_time');
      const isOneWeekOld =
        firstLaunch &&
        new Date().getTime() - new Date(firstLaunch).getTime() >= 7 * 24 * 60 * 60 * 1000;

      const lastReset = await AsyncStorage.getItem('last_reset_time');
      const lastResetDate = lastReset ? new Date(lastReset) : null;

      if (!lastResetDate || lastResetDate < thisSundayMidnight) {
        const storedStates = await AsyncStorage.getItem('checklist_states');
        const parsedStates = storedStates ? JSON.parse(storedStates) : {};

        if (isOneWeekOld) {
          const history = await AsyncStorage.getItem('checklist_history');
          const parsedHistory = history ? JSON.parse(history) : [];

          parsedHistory.unshift({
            timestamp: thisSundayMidnight.toISOString(),
            states: parsedStates,
          });

          await AsyncStorage.setItem('checklist_history', JSON.stringify(parsedHistory));
        }

        const resetItems = items.map(item => ({
          ...item,
          isChecked: false,
        }));
        setItems(resetItems);

        const resetStates: Record<number, boolean> = {};
        resetItems.forEach(item => {
          resetStates[item.id] = false;
        });

        await AsyncStorage.setItem('checklist_states', JSON.stringify(resetStates));
        await AsyncStorage.setItem('last_reset_time', now.toISOString());
      }
    } catch (err) {
      console.error('Failed weekly reset:', err);
    }
  };

  checkAndResetWeeklyChecklist();
}, []);

  const handleCheckboxToggle = (id: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  useEffect(() => {
    const saveCheckedStates = async () => {
      try {
        const statesToSave = {};
        items.forEach(item => {
          statesToSave[item.id] = item.isChecked;
        });
        await AsyncStorage.setItem('checklist_states', JSON.stringify(statesToSave));
      } catch (error) {
        console.error('Failed to save checklist states:', error);
      }
    };
    saveCheckedStates();
  }, [items]);

  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const currentDay = days[dayIndex];

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
       {items.map((item) => (
         <TouchableOpacity
            key={item.id}
            style={styles.item}
              onPress={() => handleCheckboxToggle(item.id)}
              disabled={item.id <= dayIndex ? false : true}
              >
              <View style={styles.checkboxContainer}>
              <View style={[styles.checkbox, item.isChecked && styles.checkedCheckbox]}>
              {item.isChecked && <Text style={styles.checkMark}>✓</Text>}
              </View>
              </View>
              <View style={styles.labelContainer}>
              <Text style={[styles.label_d, item.id <= dayIndex && styles.label, item.isChecked && styles.checkedLabel]}>{item.label}</Text>
              </View>
              </TouchableOpacity>
              ))} 
       </View>
       <TouchableOpacity style={[styles.button]} onPress={movetoHistory}>
        <Text style={styles.buttonTitle}>Lihat Riwayat</Text>
       </TouchableOpacity>
       <ThemedText type="subtitle">{currentDay} dalam Pekan {selectedMasa}</ThemedText>
      <ThemedText>
        {selectedMasa === 'Paskah' ? (prayData.filter(card => card.title != 'Malaikat Tuhan').map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
            item={card}
          />
        ))) : (prayData.filter(card => card.title != 'Ratu Surga').map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
            item={card}
          />
        )))}
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
    alignItems: 'flex-start',
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
  label_d: {
    fontSize: 16,
    color: 'black',
    flexShrink: 1,
  },
  label: {
    fontSize: 16,
    color: 'white',
    flexShrink: 1,
  },
});
