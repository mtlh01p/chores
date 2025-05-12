import { Image, StyleSheet, Platform } from 'react-native';
import { useState, useEffect } from 'react'
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Card from '@/components/card'
import { workData } from '@/components/workouts';
import { prayData } from '@/components/prayers';
  
export default function HomeScreen() {
  const [currentDate, setCurrentDate] = useState('');

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
        <ThemedText>
        {dayIndex === 3 || dayIndex === 6 ? 
        getSpecificCard('chest-arms')
        : dayIndex === 4 || dayIndex === 0 ? 
        getSpecificCard('abs-shoulders')
        : dayIndex === 5 || dayIndex === 1 ? 
        getSpecificCard('legs-back')
        : <ThemedText>Istirahat</ThemedText>}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Bahasa</ThemedText>
        <ThemedText>
          Duolingo dan Wordle
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Doa</ThemedText>
        <ThemedText>
          Rosario.
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
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
});
