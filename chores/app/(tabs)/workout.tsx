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
import { workData } from '@/components/workouts';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WorkoutScreen() {
      const [currentDate, setCurrentDate] = useState('');

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
    router.push('/history_work');
  };
  interface ChecklistItem {
  id: number;
  label: string;
  isChecked: boolean;
}

  const [items, setItems] = useState<ChecklistItem[]>([
    { id: 2, label: 'KP1', isChecked: false },
    { id: 3, label: 'DL1', isChecked: false },
    { id: 4, label: 'PB1', isChecked: false },
    { id: 5, label: 'KP2', isChecked: false },
    { id: 6, label: 'DL2', isChecked: false },
    { id: 0, label: 'PB2', isChecked: false },
    { id: 1, label: 'I', isChecked: false },
  ]);

  useEffect(() => {
    const loadCheckedStates = async () => {
      try {
        const storedStates = await AsyncStorage.getItem('checklist_states2');
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
      const day = now.getDay();
      const diffToTuesday = (day >= 2) ? day - 2 : 7 - (2 - day);
      const lastTuesdayMidnight = new Date(now);
      lastTuesdayMidnight.setDate(now.getDate() - diffToTuesday);
      lastTuesdayMidnight.setHours(0, 0, 0, 0);


      const firstLaunch = await AsyncStorage.getItem('first_launch_time');
      const isOneWeekOld =
        firstLaunch &&
        new Date().getTime() - new Date(firstLaunch).getTime() >= 7 * 24 * 60 * 60 * 1000;

      const lastReset = await AsyncStorage.getItem('last_reset_time2');
      const lastResetDate = lastReset ? new Date(lastReset) : null;

      if (!lastResetDate || lastResetDate < lastTuesdayMidnight){
        const storedStates = await AsyncStorage.getItem('checklist_states2');
        const parsedStates = storedStates ? JSON.parse(storedStates) : {};

        if (isOneWeekOld) {
          const history = await AsyncStorage.getItem('checklist_history2');
          const parsedHistory = history ? JSON.parse(history) : [];

          parsedHistory.unshift({
            timestamp: lastTuesdayMidnight.toISOString(),
            states: parsedStates,
          });

          await AsyncStorage.setItem('checklist_history2', JSON.stringify(parsedHistory));
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

        await AsyncStorage.setItem('checklist_states2', JSON.stringify(resetStates));
        await AsyncStorage.setItem('last_reset_time2', now.toISOString());
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
        await AsyncStorage.setItem('checklist_states2', JSON.stringify(statesToSave));
      } catch (error) {
        console.error('Failed to save checklist states:', error);
      }
    };
    saveCheckedStates();
  }, [items]);
    
      useEffect(() => {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
        const formattedDate = now.toLocaleString('id-ID', options);
        setCurrentDate(formattedDate);
      }, []);
    
      const getDayIndex = () => {
        const now = new Date();
        return now.getDay();
      };
      const dayIndex = getDayIndex();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#277db3' }}
      headerImage={
        <FontAwesome5
          size={310}
          color="#808080"
          name="dumbbell"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Workout</ThemedText>
      </ThemedView>
      <ThemedText>Utamakan pengendalian diri. Lakukan yang maksimal. Tubuhmu adalah bait suci.</ThemedText>
       <View style={[styles.box]}>
       {items.map((item) => (
         <TouchableOpacity
            key={item.id}
            style={styles.item}
              onPress={() => handleCheckboxToggle(item.id)}
              disabled={false}
              >
              <View style={styles.checkboxContainer}>
              <View style={[styles.checkbox, item.isChecked && styles.checkedCheckbox]}>
              {item.isChecked && <Text style={styles.checkMark}>✓</Text>}
              </View>
              </View>
              <View style={styles.labelContainer}><Text style={[styles.label, item.isChecked && styles.checkedLabel,]}>
                {item.label}
              </Text>
              </View>
              </TouchableOpacity>
              ))} 
       </View>
       <TouchableOpacity style={[styles.button]} onPress={movetoHistory}>
        <Text style={styles.buttonTitle}>Lihat Riwayat</Text>
       </TouchableOpacity>
      {(dayIndex === 3 || dayIndex === 6) && (
        <>
        <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Hari Dada dan Lengan</ThemedText>
        </ThemedView>
        {getSpecificCard('chest-arms')}
        <ThemedText type="subtitle">Latihan Lainnya</ThemedText>
        {workData.filter(card => card.id !== 'chest-arms').map(card => (
            <Card
              key={card.id}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              item={card}
            />
        ))}
        </>
      )}  
      {(dayIndex === 4 || dayIndex === 0) && (
        <>
        <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Hari Perut dan Bahu</ThemedText>
        </ThemedView>
        {getSpecificCard('abs-shoulders')}
        <ThemedText type="subtitle">Latihan Lainnya</ThemedText>
        {workData.filter(card => card.id !== 'abs-shoulders').map(card => (
            <Card
              key={card.id}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              item={card}
            />
        ))}
        </>
      )}
      {(dayIndex === 2 || dayIndex === 5) && (
        <>
        <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Hari Kaki dan Punggung</ThemedText>
        </ThemedView>
        <ThemedText>{getSpecificCard('legs-back')}</ThemedText>
        <ThemedText type="subtitle">Latihan Lainnya</ThemedText>
        <ThemedText>
        {workData.filter(card => card.id !== 'legs-back').map(card => (
            <Card
              key={card.id}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              item={card}
            />
        ))}
        </ThemedText>
        </>
      )}    
      {(dayIndex === 1) && (
        <>
        <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Hari Istirahat</ThemedText>
        </ThemedView>
        <ThemedText>Tidak ada latihan hari ini. Selamat beristirahat.</ThemedText>
        <ThemedText type="subtitle">Menggantikan Hari-Hari Lalu?</ThemedText>
        <ThemedText>
        {workData.map(card => (
            <Card
              key={card.id}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              item={card}
            />
        ))}
        </ThemedText>
        </>
      )}
    </ParallaxScrollView>
  );
}
const getSpecificCard = (id: string) => {
  const card = workData.find((card) => card.id === id);
  if (!card) {
    throw new Error(`Kartu tidak ditemukan.`);
  }
  return (
    <Card
      key={card.id}
      title={card.title}
      description={card.description}
      imageUrl={card.imageUrl}
      item={card}
    />
  )
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
