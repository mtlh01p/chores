import Card from '@/components/card';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { workData } from '@/components/workouts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const CHECKLIST_STORAGE_KEY_CA = '@workout:CA';
const CHECKLIST_STORAGE_KEY_LB = '@workout:LB';
const CHECKLIST_STORAGE_KEY_AS = '@workout:AS';

export default function HomeScreen() {
  const [currentDate, setCurrentDate] = useState('');
  const [countCA, setCountCA] = useState(0);
  const [countLB, setCountLB] = useState(0);
  const [countAS, setCountAS] = useState(0);
  const [LBcolor, setLBcolor] = useState('transparent');
  const [CAcolor, setCAcolor] = useState('transparent');
  const [AScolor, setAScolor] = useState('transparent');
  const [dayIndex, setdayIndex] = useState(0);

  const loadChecklistData = useCallback(async () => {
    try {
      const storedCA = await AsyncStorage.getItem(CHECKLIST_STORAGE_KEY_CA);
      const parsedCA = storedCA ? JSON.parse(storedCA) : [];
      setCountCA(parsedCA.filter(item => item.id <= 8 && item.isChecked).length);

      const storedLB = await AsyncStorage.getItem(CHECKLIST_STORAGE_KEY_LB);
      const parsedLB = storedLB ? JSON.parse(storedLB) : [];
      setCountLB(parsedLB.filter(item => item.id <= 8 && item.isChecked).length);

      const storedAS = await AsyncStorage.getItem(CHECKLIST_STORAGE_KEY_AS);
      const parsedAS = storedAS ? JSON.parse(storedAS) : [];
      setCountAS(parsedAS.filter(item => item.id <= 8 && item.isChecked).length);
    } catch (e) {
      console.error('Failed to load checklist data', e);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadChecklistData(); // Load data when the screen comes into focus

      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const formattedDate = now.toLocaleString('id-ID', options);
      setCurrentDate(formattedDate);

      const getDayIndex = () => {
        const now = new Date();
        return now.getDay();
      };
      const index = getDayIndex();
      setdayIndex(index);

      if (index === 3 || index === 6) {
        setCAcolor('#424242');
        setAScolor('transparent');
        setLBcolor('transparent');
      }
      if (index === 4 || index === 0) {
        setCAcolor('transparent');
        setAScolor('#424242');
        setLBcolor('transparent');
      }
      if (index === 2 || index === 5) {
        setCAcolor('transparent');
        setAScolor('transparent');
        setLBcolor('#424242');
      }
    }, [loadChecklistData])
  );


  const getSpecificCard = (id: string) => {
    const card = workData.find(card => card.id === id);
    if (card) {
      return (
        <Card
          key={card.id}
          title={card.title}
          description={card.description}
          imageUrl={card.imageUrl}
          item={card}
        />
      );
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hari Ini</ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">{currentDate}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Olahraga</ThemedText>
        {dayIndex === 3 || dayIndex === 6 ? (
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
        ) : dayIndex === 4 || dayIndex === 0 ? (
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
        ) : dayIndex === 5 || dayIndex === 2 ? (
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
        ) : (
          <ThemedText>Istirahat</ThemedText>
        )}
        {dayIndex === 3 || dayIndex === 6
          ? getSpecificCard('chest-arms')
          : dayIndex === 4 || dayIndex === 0
          ? getSpecificCard('abs-shoulders')
          : dayIndex === 5 || dayIndex === 2
          ? getSpecificCard('legs-back')
          : null}
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Doa</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  box: {
    borderRadius: 15,
    backgroundColor: '#1a1a1a',
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box2: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '30%',
    paddingVertical: 10,
  },
});