import { StyleSheet, Image, Platform, TouchableOpacity, Text } from 'react-native';

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

const router = useRouter();
  const handleAddClick = () => {
      router.push('/add_pray');
  };


export default function TabTwoScreen() {
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
      <ThemedText>
        {prayData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
            item={card}
          />
        ))}
        </ThemedText>
      <TouchableOpacity style={styles.button} onPress={handleAddClick}><Text style={styles.buttonTitle}>Tambahkan Doa</Text></TouchableOpacity> 
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
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    textAlign: 'center',
  }
});
