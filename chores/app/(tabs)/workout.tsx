import { StyleSheet, Image, Platform, TouchableOpacity, Text } from 'react-native';
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

export default function WorkoutScreen() {
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
      {(dayIndex === 3 || dayIndex === 6) && (
        <>
        <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Hari Dada dan Lengan</ThemedText>
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
        </ThemedView>
        </>
      )}  
      {(dayIndex === 4 || dayIndex === 0) && (
        <>
        <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Hari Perut dan Bahu</ThemedText>
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
        </ThemedView>
        </>
      )}
      {(dayIndex === 5 || dayIndex === 1) && (
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
      {(dayIndex === 2) && (
        <>
        <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Hari Istirahat</ThemedText>
        <ThemedText>Tidak ada latihan hari ini. Selamat beristirahat.</ThemedText>
        <ThemedText type="subtitle">Menggantikan Hari-Hari Lalu?</ThemedText>
        {workData.map(card => (
            <Card
              key={card.id}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              item={card}
            />
        ))}
        </ThemedView>
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
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    textAlign: 'center',
  }
});
