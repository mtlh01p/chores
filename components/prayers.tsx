import { Collapsible } from '@/components/collapsible';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const style_pray = StyleSheet.create({
  container: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
    textAlign: 'justify',
  },
  italy: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
    textAlign: 'justify',
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  box: {
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    padding: 15,
    marginBottom: 10,
    width: '100%',
  }
});

/**
 * HELPER: Renders specific prayer text based on ID
 */
const MainPrayersGetText = ({ id }: { id: string }) => {
  const foundPrayer = mainPrayers.find((prayer) => prayer.id === id);
  if (foundPrayer) {
    return (
      <Collapsible title={foundPrayer.title}>
        {foundPrayer.text.split('\n').map((line, index) => (
          <Text key={index} style={style_pray.container}>{line}</Text>
        ))}
      </Collapsible>
    );
  }
  return <Text style={{color: 'red'}}>Prayer not found: {id}</Text>;
};

/**
 * COMPONENT: Handles the display of prayer content
 */
export function PrayText({ itemId }: { itemId: string }) {
  const [selectedMasa, setSelectedMasa] = useState('Biasa');

  useEffect(() => {
    AsyncStorage.getItem('@settings:selectedMasa').then(val => {
      if (val) setSelectedMasa(val);
    });
  }, []);

  const dayIndex = new Date().getDay();

  switch (itemId) {
    case 'malaikattuhan':
      return (
        <View style={style_pray.box}>
          <MainPrayersGetText id="salammaria" />
          <Text style={style_pray.container}>Maria diberi kabar oleh Malaikat Allah, bahwa ia akan mengandung dari Roh Kudus...</Text>
        </View>
      );

    case 'ratusurga':
      return (
        <View style={style_pray.box}>
          <Text style={style_pray.container}>Ratu Surga bersukacitalah, alleluia. Sebab Ia yang sudi kau kandung, alleluia...</Text>
        </View>
      );

    case 'rosario':
      // Logical selection of mysteries
      let mystery = "Gembira";
      if (selectedMasa === 'Prapaskah') {
        mystery = "Sedih";
      } else if (selectedMasa === 'Paskah') {
        mystery = "Mulia";
      } else if (selectedMasa === 'Adven') {
        mystery = "Gembira";
      } else {
        if ([2, 5].includes(dayIndex)) mystery = "Sedih";
        else if ([3, 0].includes(dayIndex)) mystery = "Mulia";
        else if (dayIndex === 4) mystery = "Terang";
      }

      return (
        <>
          <Text style={style_pray.subtitle}>Peristiwa {mystery}</Text>
          <View style={style_pray.box}><MainPrayersGetText id="akupercaya" /></View>
          <View style={style_pray.box}><MainPrayersGetText id="bapakami" /></View>
          <View style={style_pray.box}><MainPrayersGetText id="salammaria" /></View>
        </>
      );

    case 'kerahimanilahi':
      return (
        <View style={style_pray.box}>
          <Text style={style_pray.container}>Allah yang kudus, kudus dan berkuasa, kudus dan kekal, kasihanilah kami...</Text>
        </View>
      );

    default:
      return <Text style={style_pray.container}>Konten sedang disiapkan.</Text>;
  }
}

const mainPrayers = [
  {
    id: 'akupercaya',
    title: 'Aku Percaya',
    text: 'Aku percaya akan Allah, Bapa yang Mahakuasa, Pencipta langit dan bumi...',
  },
  {
    id: 'bapakami',
    title: 'Bapa Kami',
    text: 'Bapa kami yang ada di Surga, dimuliakanlah nama-Mu...',
  },
  {
    id: 'salammaria',
    title: 'Salam Maria',
    text: 'Salam Maria, penuh rahmat, Tuhan sertamu...',
  },
  {
    id: 'kemuliaan',
    title: 'Kemuliaan',
    text: 'Kemuliaan kepada Bapa, Putra, dan Roh Kudus...',
  },
];

export const prayData = [
  {
    id: 'malaikattuhan',
    title: 'Malaikat Tuhan',
    description: '06.00, 12.00, 18.00',
    imageUrl: 'https://i.ytimg.com/vi/_5x_XTSu4iQ/sddefault.jpg',
    text: <PrayText itemId="malaikattuhan" />,
  },
  {
    id: 'ratusurga',
    title: 'Ratu Surga',
    description: '06.00, 12.00, 18.00 (Paskah)',
    imageUrl: 'https://publisher-ncreg.s3.us-east-2.amazonaws.com/pb-ncregister/swp/hv9hms/media/2020082710084_5f47694ac2bf74d8ccdc358bjpeg.webp',
    text: <PrayText itemId="ratusurga" />,
  },
  {
    id: 'kerahimanilahi',
    title: 'Kerahiman Ilahi',
    description: '15.00',
    imageUrl: 'https://www.archgh.org/media/14285/texas-catholic-herald-divine-mercy.jpg',
    text: <PrayText itemId="kerahimanilahi" />,
  },
  {
    id: 'rosario',
    title: 'Rosario',
    description: '22.00',
    imageUrl: 'https://tandirection.com/wp-content/uploads/2024/05/shutterstock_2211643749-scaled.jpg',
    text: <PrayText itemId="rosario" />,
  },
];