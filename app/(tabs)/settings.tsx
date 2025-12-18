import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const STORAGE_KEY = '@settings:selectedMasa';

const RadioChecklist = ({ items, label, onSelect, selectedItem }) => {
  return (
    <View>
      {items.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.item}
          onPress={() => onSelect(item)}
        >
          <View style={styles.radiocontainer}>
            <View style={styles.radio}>
            {selectedItem === item && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.optionText}>{item}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function SettingsScreen() {
  const [currentDate, setCurrentDate] = useState('');
  const [selectedMasa, setSelectedMasa] = useState('');
  const masaOptions = ['Biasa', 'Prapaskah', 'Paskah', 'Adven'];

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

    const loadMasa = async () => {
      try {
        const storedMasa = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedMasa) {
          setSelectedMasa(storedMasa);
        } else if (masaOptions.length > 0) {
          setSelectedMasa(masaOptions[0]);
        }
      } catch (error) {
        console.error('Failed to load masa:', error);
      }
    };
    loadMasa();
  }, [masaOptions]);

  const handleMasaSelect = async (masa: string) => {
    setSelectedMasa(masa);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, masa);
    } catch (error) {
      console.error('Failed to save masa:', error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#242424' }}
      headerImage={
        <FontAwesome5
          size={310}
          color="#808080"
          name="cog"
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Pengaturan</ThemedText>
      </ThemedView>
      <ThemedText>Sesuaikan dengan konteks saat ini.</ThemedText>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Doa</ThemedText>
          <View style={[styles.box]}>
            <Text style={[styles.subtitle, { marginTop: 0 }]}>Masa</Text>
            <RadioChecklist
              items={masaOptions}
              label="Pilih Masa"
              onSelect={handleMasaSelect}
              selectedItem={selectedMasa}
            />
          </View>
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
  box: {
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    padding: 15,
    marginBottom: 20,
    
  },
  radiocontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  dropdownButton: {
    padding: 12,
    backgroundColor: '#000',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#fff'
  },
  selectedText: {
    fontSize: 16,
    color: '#fff',
  },
  optionsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#000',
    borderRadius: 8,
    marginTop: 2,
    borderWidth: 1,
    borderColor: '#333',
    zIndex: 1000,
  },
  item: {
    padding: 8,
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
  },
  closeButton: {
    padding: 20,
    backgroundColor: 'lightgray',
    alignItems: 'center',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});

