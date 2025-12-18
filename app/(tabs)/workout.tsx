import Card from '@/components/card';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { workData } from '@/components/workouts';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CHECKLIST_STORAGE_KEY_CA = '@workout:CA';
const CHECKLIST_STORAGE_KEY_LB = '@workout:LB';
const CHECKLIST_STORAGE_KEY_AS = '@workout:AS';
const WORKOUT_HISTORY_STORAGE_KEY = '@workout:History';
const LAST_SAVE_DATE_KEY = '@workout:lastSaveDate';

export default function WorkoutScreen() {
  const [countCA, setCountCA] = useState(0);
  const [countLB, setCountLB] = useState(0);
  const [countAS, setCountAS] = useState(0);
  const [LBcolor, setLBcolor] = useState('transparent');
  const [CAcolor, setCAcolor] = useState('transparent');
  const [AScolor, setAScolor] = useState('transparent');
  const [dayIndex, setdayIndex] = useState(0);
  const appState = useRef(AppState.currentState);
  const router = useRouter();

  const loadChecklistDataAndCounts = useCallback(async () => {
    try {
      const storedCA = await AsyncStorage.getItem(CHECKLIST_STORAGE_KEY_CA);
      const parsedCA = storedCA ? JSON.parse(storedCA) : [];
      setCountCA(parsedCA.filter(item => item.id <= 8 && item.isChecked).length);

      const storedLB = await AsyncStorage.getItem(CHECKLIST_STORAGE_KEY_LB);
      const parsedLB = storedLB ? JSON.parse(storedLB) : [];
      setCountLB(parsedLB.filter(item => item.id <= 8 && item.isChecked).length);

      const storedAS = await AsyncStorage.getItem(CHECKLIST_STORAGE_KEY_AS);
      const parsedAS = storedAS ? JSON.parse(storedAS) : [];
      setCountAS(parsedAS.filter(item => item.id <= 7 && item.isChecked).length); // Adjusted for AS wajib count
    } catch (e) {
      console.error('Failed to load checklist data', e);
    }
  }, []);

  const resetChecklists = async () => {
    try {
      await AsyncStorage.setItem(CHECKLIST_STORAGE_KEY_CA, JSON.stringify(workData.find(item => item.id === 'chest-arms')?.text.props.children[1].props.children.map(item => ({ ...item.props.children.props.item, isChecked: false })) || []));
      await AsyncStorage.setItem(CHECKLIST_STORAGE_KEY_LB, JSON.stringify(workData.find(item => item.id === 'legs-back')?.text.props.children[1].props.children.map(item => ({ ...item.props.children.props.item, isChecked: false })) || []));
      await AsyncStorage.setItem(CHECKLIST_STORAGE_KEY_AS, JSON.stringify(workData.find(item => item.id === 'abs-shoulders')?.text.props.children[1].props.children.map(item => ({ ...item.props.children.props.item, isChecked: false })) || []));
      console.log('Checklists reset.');
    } catch (error) {
      console.error('Failed to reset checklists', error);
    }
  };

  const performSaveAndReset = async (saveDate: string) => {
    try {
      await storeWorkoutHistory(saveDate);
      setCountCA(0);
      setCountLB(0);
      setCountAS(0);
      await AsyncStorage.setItem(CHECKLIST_STORAGE_KEY_CA, JSON.stringify(workData.find(item => item.id === 'chest-arms')?.text.props.children[1].props.children.map(item => ({ ...item.props.children.props.item, isChecked: false })) || []));
      await AsyncStorage.setItem(CHECKLIST_STORAGE_KEY_LB, JSON.stringify(workData.find(item => item.id === 'legs-back')?.text.props.children[1].props.children.map(item => ({ ...item.props.children.props.item, isChecked: false })) || []));
      await AsyncStorage.setItem(CHECKLIST_STORAGE_KEY_AS, JSON.stringify(workData.find(item => item.id === 'abs-shoulders')?.text.props.children[1].props.children.map(item => ({ ...item.props.children.props.item, isChecked: false })) || []));
      await AsyncStorage.setItem(LAST_SAVE_DATE_KEY, saveDate);
      console.log('Save and reset performed.');
    } catch (error) {
      console.error('Failed to save and reset workout data', error);
    }
  };

  const storeWorkoutHistory = async (saveDate: string) => {
    try {
      const newHistoryEntry = {
        date: saveDate,
        chestArmsCount: countCA,
        legsBackCount: countLB,
        absShouldersCount: countAS,
      };

      const storedHistory = await AsyncStorage.getItem(WORKOUT_HISTORY_STORAGE_KEY);
      const existingHistory = storedHistory ? JSON.parse(storedHistory) : [];

      const updatedHistory = [...existingHistory, newHistoryEntry];
      await AsyncStorage.setItem(WORKOUT_HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
      console.log('Workout history stored for:', saveDate, newHistoryEntry);
    } catch (error) {
      console.error('Failed to store workout history', error);
    }
  };

  useEffect(() => {
    loadChecklistDataAndCounts();
  }, [loadChecklistDataAndCounts]);

  useFocusEffect(
    useCallback(() => {
      loadChecklistDataAndCounts(); // Reload counts every time the screen comes into focus

      const now = new Date();
      setdayIndex(now.getDay());
      const index = now.getDay();
      if (index === 3 || index === 6) {
        setCAcolor('#424242');
        setAScolor('transparent');
        setLBcolor('transparent');
      } else if (index === 4 || index === 0) {
        setCAcolor('transparent');
        setAScolor('#424242');
        setLBcolor('transparent');
      } else if (index === 2 || index === 5) {
        setCAcolor('transparent');
        setAScolor('transparent');
        setLBcolor('#424242');
      } else {
        setCAcolor('transparent');
        setAScolor('transparent');
        setLBcolor('transparent');
      }
    }, [loadChecklistDataAndCounts]) // Make sure to include the callback in the dependency array
  );

  useEffect(() => {
    const checkMidnight = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const todayDate = now.toDateString();

      AsyncStorage.getItem(LAST_SAVE_DATE_KEY).then(lastSavedDate => {
        if (hours === 0 && minutes === 0 && seconds < 5 && lastSavedDate !== todayDate) {
          performSaveAndReset(todayDate);
        }
      });
    };

    const intervalId = setInterval(checkMidnight, 1000);
    return () => clearInterval(intervalId);
  }, [countCA, countLB, countAS, performSaveAndReset]);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
        const lastSaveDate = await AsyncStorage.getItem(LAST_SAVE_DATE_KEY);
        const todayDate = new Date().toDateString();
        if (lastSaveDate !== todayDate) {
          console.log('Performing missed midnight save and reset.');
          await performSaveAndReset(todayDate);
        }
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, [performSaveAndReset]);

  const movetoHistory = () => {
    router.push('/history_work');
  };

  const getSpecificCard = (id: string) => {
    const card = workData.find((card) => card.id === id);
    if (!card) {
      console.error(`Card with id '${id}' not found.`);
      return null;
    }
    return (
      <ThemedText>
        <Card
          key={card.id}
          title={card.title}
          description={card.description}
          imageUrl={card.imageUrl}
          item={card}
        />
      </ThemedText>
    );
  };

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
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Workout</ThemedText>
      </ThemedView>
      <ThemedText>Utamakan pengendalian diri. Lakukan yang maksimal. Tubuhmu adalah bait suci.</ThemedText>
      <View style={[styles.box]}>
        <View style={[styles.box2, { backgroundColor: LBcolor }]}>
          <ThemedText style={{ fontSize: 25, fontWeight: 'bold' }}>{countLB}</ThemedText>
          <ThemedText style={{ fontSize: 11, fontWeight: 'bold' }}>Kaki/Punggung</ThemedText>
        </View>
        <View style={[styles.box2, { backgroundColor: CAcolor }]}>
          <ThemedText style={{ fontSize: 25, fontWeight: 'bold' }}>{countCA}</ThemedText>
          <ThemedText style={{ fontSize: 11, fontWeight: 'bold' }}>Dada/Lengan</ThemedText>
        </View>
        <View style={[styles.box2, { backgroundColor: AScolor }]}>
          <ThemedText style={{ fontSize: 25, fontWeight: 'bold' }}>{countAS}</ThemedText>
          <ThemedText style={{ fontSize: 11, fontWeight: 'bold' }}>Perut/Bahu</ThemedText>
        </View>
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
          <ThemedText>
            {workData.filter(card => card.id !== 'chest-arms').map(card => (
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
      {(dayIndex === 4 || dayIndex === 0) && (
        <>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="subtitle">Hari Perut dan Bahu</ThemedText>
          </ThemedView>
          {getSpecificCard('abs-shoulders')}
          <ThemedText type="subtitle">Latihan Lainnya</ThemedText>
          <ThemedText>
            {workData.filter(card => card.id !== 'abs-shoulders').map(card => (
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
      {(dayIndex === 2 || dayIndex === 5) && (
        <>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="subtitle">Hari Kaki dan Punggung</ThemedText>
          </ThemedView>
          {getSpecificCard('legs-back')}
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
    width: '33%',
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