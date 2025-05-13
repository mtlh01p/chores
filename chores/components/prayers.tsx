import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Collapsible } from '@/components/Collapsible';

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@settings:selectedMasa';

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
    marginBottom: 20,
    width: '95%',
    }
});

export function PrayText({ itemId }: { itemId: string }) {
  const [currentDate, setCurrentDate] = useState('');
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
  }, []);

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

  switch (itemId) {
    case 'rosario':
      const dayIndex = getDayIndex();
      if(selectedMasa === 'Biasa') {
      return (
        <>
          {dayIndex === 1 || dayIndex === 6 ? (
            <>
          <Text style={[style_pray.subtitle, { marginTop: 0, paddingBottom: 10, }]}>Peristiwa Gembira</Text>
          <View style={style_pray.box}>
          {mainPrayersGetText('akupercaya')}
          </View>
          <View style={style_pray.box}>
          {mainPrayersGetText('kemuliaan')}
          </View>
          <View style={style_pray.box}>
          {mainPrayersGetText('bapakami')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Salam, Putri Allah Bapa</Text>
          {mainPrayersGetText('salammaria')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Salam, Bunda Allah Putra</Text>
          {mainPrayersGetText('salammaria')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Salam, Mempelai Allah Roh Kudus</Text>
          {mainPrayersGetText('salammaria')}
          </View>
          <View style={style_pray.box}>
          {mainPrayersGetText('kemuliaan')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Gembira I: Maria Menerima Kabar dari Malaikat Gabriel</Text>
          <Text style={style_pray.container}>Salam hai engkau yang dikaruniai, Tuhan menyertai engkau; jangan takut, hai Maria, sebab engkau beroleh kasih karunia di hadapan Allah. Sesungguhnya engkau akan mengandung dan melahirkan seorang anak laki-laki dan hendaklah engkau menamai dia Yesus (Luk1:28b,30b-31).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Gembira II: Maria Mengunjungi Elisabet, Saudarinya</Text>
          <Text style={style_pray.container}>Diberkatilah engkau diantara semua perempuan dan diberkatilah buah rahimmu. Siapakah aku ini sampai Ibu Tuhanku datang mengunjungi aku? (Luk1:42-43)</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Gembira III: Yesus Dilahirkan di Bethlehem</Text>
          <Text style={style_pray.container}>Maria melahirkan seorang anak laki-laki, lalu dibungkusnya dengan kain lampin dan dibaringkannya di dalam palungan, karena tidak ada tempat bagi mereka di rumah penginapan (Luk 2:7)</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Gembira IV: Yesus Dipersembahkan ke Bait Allah</Text>
          <Text style={style_pray.container}>Simeon berkata pada Maria, Sesungguhnya Anak ini ditentukan untuk menjatuhkan atau membangkitkan banyak orang di Israel dan untuk menjadi suatu tanda yang menimbulkan perbantahan. Kelak suatu pedang akan menembus jiwamu sendiri (Luk 2:34-35).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Gembira V: Yesus Ditemukan di Bait Allah</Text>
          <Text style={style_pray.container}>Mengapa kamu mencari Aku? Tidaklah kamu tahu, bahwa Aku harus berada di dalam Rumah Bapa-Ku? Tetapi mereka tidak mengerti apa yang dikatakan-Nya kepada mereka (Luk 2:49-50).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
            </>
          ) : dayIndex === 2 || dayIndex === 5 ? (
            <>
          <Text style={[style_pray.subtitle, { marginTop: 0, paddingBottom: 10, }]}>Peristiwa Sedih</Text>
          <View style={style_pray.box}>
          {mainPrayersGetText('akupercaya')}
          </View>
          <View style={style_pray.box}>
          {mainPrayersGetText('kemuliaan')}
          </View>
          <View style={style_pray.box}>
          {mainPrayersGetText('bapakami')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Salam, Putri Allah Bapa</Text>
          {mainPrayersGetText('salammaria')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Salam, Bunda Allah Putra</Text>
          {mainPrayersGetText('salammaria')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Salam, Mempelai Allah Roh Kudus</Text>
          {mainPrayersGetText('salammaria')}
          </View>
          <View style={style_pray.box}>
          {mainPrayersGetText('kemuliaan')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Sedih I: Yesus Berdoa kepada Bapa-Nya di Surga dalam Sakratul Maut</Text>
          <Text style={style_pray.container}>Ya Bapa-Ku, jikalau Engkau berkenan, ambilah cawan ini dari hadapan-Ku, tetapi janganlah menurut kehendak-Ku, melainkan kehendak-Mu yang terjadi (Mat 26:39).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Sedih II: Yesus Didera</Text>
          <Text style={style_pray.container}>Mereka memukul kepalanya-Nya dengan buluh, dan meludahi-Nya dan berlutut menyembah-Nya. Sesudah mengolok-olok Dia, mereka menanggalkan jubah ungu yang dipakai-Nya dan mengenakan lagi pakaian-Nya kepada-Nya (Mrk 15:19-20a).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Sedih III: Yesus Dimahkotai Duri</Text>
          <Text style={style_pray.container}>Mereka menganyam sebuah mahkota duri dan menaruh di atas kepala-Nya. Kemudian mereka mulai memberi hormat kepada-Nya, katanya, Salam, hai raja orang Yahudi (Mrk 15:17-18).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Sedih IV: Yesus Memanggul Salib-Nya ke Gunung Kalvari</Text>
          <Text style={style_pray.container}>Sambil memikul salib-Nya, Ia pergi keluar ketempat yang bernama Tempat Tengkorak, yang dalam bahasa Ibrani disebut Golgota (Yoh 19:16b).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Sedih V: Yesus Wafat di Salib</Text>
          <Text style={style_pray.container}>Yesus berseru dengan suara nyaring "Ya Bapa ke dalam tangan-Mu Ku serahkan nyawa-Ku". Sesudah berkata demikian Ia menyerahkan nyawa-Nya (Luk 23:46).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
            </>
          ) : dayIndex === 3 || dayIndex === 0 ? ( 
            <>
          <Text style={[style_pray.subtitle, { marginTop: 0, paddingBottom: 10, }]}>Peristiwa Mulia</Text>
          <View style={style_pray.box}>
          {mainPrayersGetText('akupercaya')}
          </View>
          <View style={style_pray.box}>
          {mainPrayersGetText('kemuliaan')}
          </View>
          <View style={style_pray.box}>
          {mainPrayersGetText('bapakami')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Salam, Putri Allah Bapa</Text>
          {mainPrayersGetText('salammaria')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Salam, Bunda Allah Putra</Text>
          {mainPrayersGetText('salammaria')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Salam, Mempelai Allah Roh Kudus</Text>
          {mainPrayersGetText('salammaria')}
          </View>
          <View style={style_pray.box}>
          {mainPrayersGetText('kemuliaan')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Mulia I: Yesus Bangkit dari Antara Orang Mati</Text>
          <Text style={style_pray.container}>Malaikat itu berkata, janganlah kamu takut; sebab aku tahu kamu mencari Yesus yang disalibkan itu. Ia tidak ada di sini, sebab Ia telah bangkit, sama seperti yang telah dikatakan-Nya (Mat 28:5-6).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Mulia II: Yesus Naik ke Surga</Text>
          <Text style={style_pray.container}>Sesudah Ia mengatakan demikian, Ia diangkat ke surga disaksikan oleh mereka, dan awan menutup-Nya dari pandangan mereka. Hai orang Galilea, mengapa kamu berdiri melihat ke langit? Yesus ini, yang diangkat ke surga meninggalkan kamu, akan kembali dengan cara yang sama seperti kamu lihat Dia naik ke surga (Kis1:9-11).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Mulia III: Roh Kudus Turun Atas Para Rasul</Text>
          <Text style={style_pray.container}>Tiba-tiba terdengarlah bunyi dari langit seperti tiupan angin keras yang memenuhi seluruh rumah, dimana mereka duduk, lalu mereka semua dipenuhi Roh Kudus, dan mulai berbicara dalam bahasa lain, seperti yang diberikan oleh Roh itu kepada mereka untuk dikatakan (Kis 2:2,4)</Text>
                    {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Mulia IV: Maria Diangkat ke Surga</Text>
          <Text style={style_pray.container}>Jikalau kita percaya, bahwa Yesus telah mati dan telah bangkit, maka kita percaya juga bahwa dengan perantaraan Yesus, Allah akan mengumpulkan bersama-sama dengan Dia, mereka yang telah meninggal. Sesudah itu kita yang hidup, yang masih tinggal, akan diangkat bersama-sama dengan mereka dalam awan menyongsong Tuhan di angkasa. Demikianlah kita akan selama-lamanya bersama-sama Tuhan (1Tes4:14,17)</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Mulia V: Maria Dimahkotai di Surga</Text>
          <Text style={style_pray.container}>Tampaklah suatu tanda besar di langit; seorang perempuan berselubungkan matahari, dengan bulan di bawah kakinya dan sebuah mahkota dari dua belas bintang di atas kepalaNya (Why 21:1)</Text>
                    {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
            </>
          ) : ( 
            <>
          <Text style={[style_pray.subtitle, { marginTop: 0, paddingBottom: 10, }]}>Peristiwa Terang</Text>
          <View style={style_pray.box}>
          {mainPrayersGetText('akupercaya')}
          </View>
          <View style={style_pray.box}>
          {mainPrayersGetText('kemuliaan')}
          </View>
          <View style={style_pray.box}>
          {mainPrayersGetText('bapakami')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Salam, Putri Allah Bapa</Text>
          {mainPrayersGetText('salammaria')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Salam, Bunda Allah Putra</Text>
          {mainPrayersGetText('salammaria')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Salam, Mempelai Allah Roh Kudus</Text>
          {mainPrayersGetText('salammaria')}
          </View>
          <View style={style_pray.box}>
          {mainPrayersGetText('kemuliaan')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Terang I: Yesus Dibaptis di Sungai Yordan</Text>
          <Text style={style_pray.container}>Sesudah dibaptis, Yesus segera keluar dari air dan pada waktu itu juga langit terbuka dan Ia melihat Roh Allah seperti burung merpati turun ke atas-Nya, lalu terdengarlah suara dari surga mengatakan, "Inilah Anak-Ku yang terkasih, kepada-Nyalah Aku berkenan." (Mat 3:16-17).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Terang II: Yesus Menyatakan Diri-Nya dalam Pesta Perkawinan di Kana</Text>
          <Text style={style_pray.container}>Atas permintaan Maria, bunda-Nya, Yesus mengatasi kekurangan anggur. Hal itu dilakukan Yesus sebagai yang pertama dari tanda-tanda-Nya dan dengan itu Ia telah menyatakan kemuliaan-Nya, dan murid-murid-Nya percaya kepada-Nya (Yoh 2:11).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Terang III: Yesus Memberitakan Kerajaan Allah dan Menyerukan Pertobatan</Text>
          <Text style={style_pray.container}>Bertobatlah, sebab kerajaan surga sudah dekat. Yesus pun berkeliling di seluruh Galilea, Ia mengajar dalam rumah-rumah ibadat dan memberitakan Injil Kerajaan Surga serta menyembuhkan orang-orang di antara bangsa itu (Mat 4:17,23)</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Mulia IV: Yesus Menampakkan Kemuliaan-Nya</Text>
          <Text style={style_pray.container}>Yesus berubah rupa di sebuah gunung yang tinggi. Wajah-Nya bercahaya seperti matahari. Allah bersabda kepada tiga rasul Yesus, "Inilah Anak-Ku yang terkasih, kepada-Nyalah Aku berkenan, dengarkanlah Dia" (Mat 17:2,5).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Terang V: Yesus Menetapkan Ekaristi</Text>
          <Text style={style_pray.container}>Yesus mengambil roti, mengucap syukur, memecahkan-mecahkannya lalu memberikannya kepada mereka dan berkata, "Ambilah, inilah tubuh-Ku". Sesudah itu Ia mengambil cawan, mengucap syukur lalu memberikannya kepada mereka. Ia berkata, "Inilah darah-Ku yang ditumpahkan bagi banyak orang" (Mar 14:22-24).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
            </>
          )}
        </>
      );
    }else if (selectedMasa == 'Prapaskah') {
      return (
                  <>
          <Text style={[style_pray.subtitle, { marginTop: 0, paddingBottom: 10, }]}>Peristiwa Sedih</Text>
          <View style={style_pray.box}>
          {mainPrayersGetText('akupercaya')}
          </View>
          <View style={style_pray.box}>
          {mainPrayersGetText('kemuliaan')}
          </View>
          <View style={style_pray.box}>
          {mainPrayersGetText('bapakami')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Salam, Putri Allah Bapa</Text>
          {mainPrayersGetText('salammaria')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Salam, Bunda Allah Putra</Text>
          {mainPrayersGetText('salammaria')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Salam, Mempelai Allah Roh Kudus</Text>
          {mainPrayersGetText('salammaria')}
          </View>
          <View style={style_pray.box}>
          {mainPrayersGetText('kemuliaan')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Sedih I: Yesus Berdoa kepada Bapa-Nya di Surga dalam Sakratul Maut</Text>
          <Text style={style_pray.container}>Ya Bapa-Ku, jikalau Engkau berkenan, ambilah cawan ini dari hadapan-Ku, tetapi janganlah menurut kehendak-Ku, melainkan kehendak-Mu yang terjadi (Mat 26:39).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Sedih II: Yesus Didera</Text>
          <Text style={style_pray.container}>Mereka memukul kepalanya-Nya dengan buluh, dan meludahi-Nya dan berlutut menyembah-Nya. Sesudah mengolok-olok Dia, mereka menanggalkan jubah ungu yang dipakai-Nya dan mengenakan lagi pakaian-Nya kepada-Nya (Mrk 15:19-20a).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Sedih III: Yesus Dimahkotai Duri</Text>
          <Text style={style_pray.container}>Mereka menganyam sebuah mahkota duri dan menaruh di atas kepala-Nya. Kemudian mereka mulai memberi hormat kepada-Nya, katanya, Salam, hai raja orang Yahudi (Mrk 15:17-18).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Sedih IV: Yesus Memanggul Salib-Nya ke Gunung Kalvari</Text>
          <Text style={style_pray.container}>Sambil memikul salib-Nya, Ia pergi keluar ketempat yang bernama Tempat Tengkorak, yang dalam bahasa Ibrani disebut Golgota (Yoh 19:16b).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Sedih V: Yesus Wafat di Salib</Text>
          <Text style={style_pray.container}>Yesus berseru dengan suara nyaring "Ya Bapa ke dalam tangan-Mu Ku serahkan nyawa-Ku". Sesudah berkata demikian Ia menyerahkan nyawa-Nya (Luk 23:46).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
            </>
      );
    }else if (selectedMasa == 'Paskah') {
      return(
                  <>
          <Text style={[style_pray.subtitle, { marginTop: 0, paddingBottom: 10, }]}>Peristiwa Mulia</Text>
          <View style={style_pray.box}>
          {mainPrayersGetText('akupercaya')}
          </View>
          <View style={style_pray.box}>
          {mainPrayersGetText('kemuliaan')}
          </View>
          <View style={style_pray.box}>
          {mainPrayersGetText('bapakami')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Salam, Putri Allah Bapa</Text>
          {mainPrayersGetText('salammaria')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Salam, Bunda Allah Putra</Text>
          {mainPrayersGetText('salammaria')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Salam, Mempelai Allah Roh Kudus</Text>
          {mainPrayersGetText('salammaria')}
          </View>
          <View style={style_pray.box}>
          {mainPrayersGetText('kemuliaan')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Mulia I: Yesus Bangkit dari Antara Orang Mati</Text>
          <Text style={style_pray.container}>Malaikat itu berkata, janganlah kamu takut; sebab aku tahu kamu mencari Yesus yang disalibkan itu. Ia tidak ada di sini, sebab Ia telah bangkit, sama seperti yang telah dikatakan-Nya (Mat 28:5-6).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Mulia II: Yesus Naik ke Surga</Text>
          <Text style={style_pray.container}>Sesudah Ia mengatakan demikian, Ia diangkat ke surga disaksikan oleh mereka, dan awan menutup-Nya dari pandangan mereka. Hai orang Galilea, mengapa kamu berdiri melihat ke langit? Yesus ini, yang diangkat ke surga meninggalkan kamu, akan kembali dengan cara yang sama seperti kamu lihat Dia naik ke surga (Kis1:9-11).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Mulia III: Roh Kudus Turun Atas Para Rasul</Text>
          <Text style={style_pray.container}>Tiba-tiba terdengarlah bunyi dari langit seperti tiupan angin keras yang memenuhi seluruh rumah, dimana mereka duduk, lalu mereka semua dipenuhi Roh Kudus, dan mulai berbicara dalam bahasa lain, seperti yang diberikan oleh Roh itu kepada mereka untuk dikatakan (Kis 2:2,4)</Text>
                    {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Mulia IV: Maria Diangkat ke Surga</Text>
          <Text style={style_pray.container}>Jikalau kita percaya, bahwa Yesus telah mati dan telah bangkit, maka kita percaya juga bahwa dengan perantaraan Yesus, Allah akan mengumpulkan bersama-sama dengan Dia, mereka yang telah meninggal. Sesudah itu kita yang hidup, yang masih tinggal, akan diangkat bersama-sama dengan mereka dalam awan menyongsong Tuhan di angkasa. Demikianlah kita akan selama-lamanya bersama-sama Tuhan (1Tes4:14,17)</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Mulia V: Maria Dimahkotai di Surga</Text>
          <Text style={style_pray.container}>Tampaklah suatu tanda besar di langit; seorang perempuan berselubungkan matahari, dengan bulan di bawah kakinya dan sebuah mahkota dari dua belas bintang di atas kepalaNya (Why 21:1)</Text>
                    {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
            </>
      );
    }else{
      return(
            <>
          <Text style={[style_pray.subtitle, { marginTop: 0, paddingBottom: 10, }]}>Peristiwa Gembira</Text>
          <View style={style_pray.box}>
          {mainPrayersGetText('akupercaya')}
          </View>
          <View style={style_pray.box}>
          {mainPrayersGetText('kemuliaan')}
          </View>
          <View style={style_pray.box}>
          {mainPrayersGetText('bapakami')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Salam, Putri Allah Bapa</Text>
          {mainPrayersGetText('salammaria')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Salam, Bunda Allah Putra</Text>
          {mainPrayersGetText('salammaria')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Salam, Mempelai Allah Roh Kudus</Text>
          {mainPrayersGetText('salammaria')}
          </View>
          <View style={style_pray.box}>
          {mainPrayersGetText('kemuliaan')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Gembira I: Maria Menerima Kabar dari Malaikat Gabriel</Text>
          <Text style={style_pray.container}>Salam hai engkau yang dikaruniai, Tuhan menyertai engkau; jangan takut, hai Maria, sebab engkau beroleh kasih karunia di hadapan Allah. Sesungguhnya engkau akan mengandung dan melahirkan seorang anak laki-laki dan hendaklah engkau menamai dia Yesus (Luk1:28b,30b-31).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Gembira II: Maria Mengunjungi Elisabet, Saudarinya</Text>
          <Text style={style_pray.container}>Diberkatilah engkau diantara semua perempuan dan diberkatilah buah rahimmu. Siapakah aku ini sampai Ibu Tuhanku datang mengunjungi aku? (Luk1:42-43)</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Gembira III: Yesus Dilahirkan di Bethlehem</Text>
          <Text style={style_pray.container}>Maria melahirkan seorang anak laki-laki, lalu dibungkusnya dengan kain lampin dan dibaringkannya di dalam palungan, karena tidak ada tempat bagi mereka di rumah penginapan (Luk 2:7)</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Gembira IV: Yesus Dipersembahkan ke Bait Allah</Text>
          <Text style={style_pray.container}>Simeon berkata pada Maria, Sesungguhnya Anak ini ditentukan untuk menjatuhkan atau membangkitkan banyak orang di Israel dan untuk menjadi suatu tanda yang menimbulkan perbantahan. Kelak suatu pedang akan menembus jiwamu sendiri (Luk 2:34-35).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
          <View style={style_pray.box}>
          <Text style={[style_pray.subtitle, { marginTop: 0}]}>Peristiwa Gembira V: Yesus Ditemukan di Bait Allah</Text>
          <Text style={style_pray.container}>Mengapa kamu mencari Aku? Tidaklah kamu tahu, bahwa Aku harus berada di dalam Rumah Bapa-Ku? Tetapi mereka tidak mengerti apa yang dikatakan-Nya kepada mereka (Luk 2:49-50).</Text>
          {mainPrayersGetText('bapakami')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('salammaria')}
          {mainPrayersGetText('kemuliaan')}
          {mainPrayersGetText('terpujilah')}
          {mainPrayersGetText('doafatima')}
          </View>
            </>
      );
    }
    case 'malaikattuhan':
      return (
        <>
        <View style={style_pray.box}>
        <Collapsible title="Latina">
          <Text style={style_pray.italy}>Angelus Domini nuntiavit Mariae,</Text>
          <Text style={style_pray.italy}>Et concepit de Spiritu Sancto.</Text>
          {mainPrayersGetText('avemaria')}
          <Text style={style_pray.italy}>Ecce ancilla Domini.</Text>
          <Text style={style_pray.italy}>Fiat mihi secundum verbum tuum.</Text>
          {mainPrayersGetText('avemaria')}
          <Text style={style_pray.italy}>Et Verbum caro factum est.</Text>
          <Text style={style_pray.italy}>Et habitavit in nobis.</Text>
          {mainPrayersGetText('avemaria')}
          <Text style={style_pray.italy}>Ora pro nobis, Sancta Dei Genitrix.</Text>
          <Text style={style_pray.italy}>Ut digni efficiamur promissionibus Christi.</Text>
          <Text style={style_pray.italy}>Gratiam tuam, quæsumus, Domine, mentibus nostris infunde; ut qui, Angelo nuntiante, Christi Filii tui incarnationem cognovimus, per passionem eius et Crucem ad resurrectionis gloriam perducamur. Per eundem Christum Dominum nostrum. </Text>
        </Collapsible>
        </View>
        <View style={style_pray.box}>
        <Collapsible title="Bahasa Indonesia">
          <Text style={style_pray.container}>Maria diberi kabar oleh Malaikat Allah,</Text>
          <Text style={style_pray.container}>bahwa ia akan mengandung dari Roh Kudus.</Text>
          {mainPrayersGetText('salammaria')}
          <Text style={style_pray.container}>Aku ini hamba Allah,</Text>
          <Text style={style_pray.container}>terjadilah padaku menurut perkataanmu.</Text>
          {mainPrayersGetText('salammaria')}
          <Text style={style_pray.container}>Sabda sudah menjadi Daging,</Text>
          <Text style={style_pray.container}>dan tinggal di antara kita.</Text>
          {mainPrayersGetText('salammaria')}
          <Text style={style_pray.container}>Doakanlah kami, ya Santa Bunda Allah, </Text>
          <Text style={style_pray.container}>supaya kami dapat menikmati janji Kristus.</Text>
          <Text style={style_pray.container}>Ya Allah, karena kabar malaikat, kami mengetahui bahwa Yesus Kristus, Putra-Mu menjadi manusia. Curahkanlah rahmat-Mu ke dalam hati kami, supaya karena sengsara dan salib-Nya, kami dibawa kepada kebangkitan yang mulia. Sebab Dialah Tuhan, pengantara kami.</Text>
          </Collapsible>
          </View>
        </>
      );
    case 'ratusurga':
      return (
        <>
        <View style={style_pray.box}>
        <Collapsible title="Latina">
          <Text style={style_pray.italy}>Regina caeli, laetare, alleluia.</Text>
          <Text style={style_pray.italy}>Quia quem meruisti portare, alleluia.</Text>
          <Text style={style_pray.italy}>Resurrexit, sicut dixit, alleluia. </Text>
          <Text style={style_pray.italy}>Ora poro nobis Deum, alleluia.</Text>
          <Text style={style_pray.italy}>Gaude et laetare, Virgo Maria, alleluia.</Text>
          <Text style={style_pray.italy}>Quia surrexit Dominus vere, alleluia.</Text>
          <Text style={style_pray.italy}>Oremus. Deus, qui per ressurectionem Filli tui, Domini nostri lesu Christi, mundum laetificare dignatus es: praesta, quaesumus; ut per eius Genetricem Virginem Mariam, perpetuae capiamus gaudia vitae. Per eundem Christum Dominum nostrum. </Text>
        </Collapsible>
        </View>
        <View style={style_pray.box}>
        <Collapsible title="Bahasa Indonesia">
          <Text style={style_pray.container}>Ratu Surga bersukacitalah, alleluia.</Text>
          <Text style={style_pray.container}>Sebab Ia yang sudi kau kandung, alleluia.</Text>
          <Text style={style_pray.container}>Telah bangkit seperti disabdakan-Nya, alleluia. </Text>
          <Text style={style_pray.container}>Doakanlah kami pada Allah, alleluia.</Text>
          <Text style={style_pray.container}>Bersukacitalah dan bergembiralah, Perawan Maria, alleluia.</Text>
          <Text style={style_pray.container}>Sebab Tuhan sungguh telah bangkit, alleluia.</Text>
          <Text style={style_pray.container}>Ya Allah, Engkau telah menggembirakan dunia dengan kebangkitan Putra-Mu, Tuhan kami Yesus Kristus. Kami mohon, perkenankanlah kami bersukacita dalam kehidupan kekal bersama bunda-Nya, Perawan Maria. Demi Kristus, pengantara kami. Amin.</Text>
          </Collapsible>
          </View>
        </>
      );
    case 'kerahimanilahi':
      return (
        <>
        <View style={style_pray.box}>
        <Collapsible title="Latina">
          <Text style={style_pray.italy}>Exspirásti, Iesu, sed fons vitæ pro animis erupit, et mare misericórdiæ toti mundo manávit. O fons vitæ, inénarrábilis misericórdiæ Dei, contege mundum univérsum, et effúnde Te super nos.</Text>
          <Text style={style_pray.italy}>O Sanguis et Aqua, quae ex Corde Iesu tamquam fons misericórdiæ pro nobis emanásti, confído in Te!</Text>
          <Text style={style_pray.italy}>O Sanguis et Aqua, quae ex Corde Iesu tamquam fons misericórdiæ pro nobis emanásti, confído in Te!</Text>
          <Text style={style_pray.italy}>O Sanguis et Aqua, quae ex Corde Iesu tamquam fons misericórdiæ pro nobis emanásti, confído in Te!</Text>
          <Text style={style_pray.italy}>Sanctus Deus, Sanctus Fortis, Sanctus Immortalis, miserere nobis et totius mundi.</Text>
          <Text style={style_pray.italy}>Sanctus Deus, Sanctus Fortis, Sanctus Immortalis, miserere nobis et totius mundi.</Text>
          <Text style={style_pray.italy}>Sanctus Deus, Sanctus Fortis, Sanctus Immortalis, miserere nobis et totius mundi.</Text>
          <Text style={style_pray.italy}>Iesu, Rex divinae misericordiae, tu es firmamentum meum.</Text>
          </Collapsible>
        </View>
        <View style={style_pray.box}>
        <Collapsible title="Bahasa Indonesia">
          <Text style={style_pray.container}>Ya Yesus, Engkau telah wafat. Namun, Sumber Kerahiman telah memancar bagi jiwa-jiwa dan terbukalah lautan kerahiman bagi segenap dunia. Oh, Sumber Kerahiman Sejati yang Abadi, naungilah seluruh bangsa dan curahkanlah diri-Mu kepada kami.</Text>
          <Text style={style_pray.container}>Darah dan air yang memancar dari hati Yesus sebagai Sumber Kerahiman bagi kami, Engkaulah andalanku.</Text>
          <Text style={style_pray.container}>Darah dan air yang memancar dari hati Yesus sebagai Sumber Kerahiman bagi kami, Engkaulah andalanku.</Text>
          <Text style={style_pray.container}>Darah dan air yang memancar dari hati Yesus sebagai Sumber Kerahiman bagi kami, Engkaulah andalanku.</Text>
          <Text style={style_pray.container}>Allah yang kudus, kudus dan berkuasa, kudus dan kekal, kasihanilah kami dan seluruh dunia.</Text>
          <Text style={style_pray.container}>Allah yang kudus, kudus dan berkuasa, kudus dan kekal, kasihanilah kami dan seluruh dunia.</Text>
          <Text style={style_pray.container}>Allah yang kudus, kudus dan berkuasa, kudus dan kekal, kasihanilah kami dan seluruh dunia.</Text>
          <Text style={style_pray.container}>Yesus, Raja Kerahiman Ilahi, Engkaulah andalanku.</Text>
          </Collapsible>
          </View>
        </>
      )
    default:
      const foundPrayer = prayData.find((prayer) => prayer.id === itemId);
      if (foundPrayer && typeof foundPrayer.text === 'string') {
        return (foundPrayer.text as string).split('\n').map((line:string, index:number) => (
          <Text key={index} style={style_pray.container}>{line}</Text>
        ));
      } 
  }
}

const mainPrayers = [
  {
    title: 'Aku Percaya',
    text: 'Aku percaya akan Allah, Bapa yang Mahakuasa, Pencipta langit dan bumi. Dan akan Yesus Kristus, Putra-Nya yang tunggal, Tuhan kita, yang dikandung dari Roh Kudus, lahir dari Perawan Maria, yang menderita sengsara dalam pemerintahan Pontius Pilatus, disalibkan, mati dan dikuburkan; turun ke tempat penantian; pada hari ketiga bangkit dari antara orang mati; naik ke surga, duduk di sebelah kanan Allah Bapa yang Mahakuasa; dari situ Ia akan datang mengadili orang yang hidup dan yang mati. Aku percaya akan Roh Kudus; Gereja Katolik yang kudus; persekutuan para kudus; pengampunan dosa; kebangkitan tubuh; dan hidup kekal. Amin.',
    id: 'akupercaya',
  },
  {
    title: 'Bapa Kami',
    text: 'Bapa kami yang ada di Surga, dimuliakanlah nama-Mu. Datanglah Kerajaan-Mu, jadilah kehendak-Mu. Di atas Bumi seperti di dalam surga. Berilah kami rezeki pada hari ini, dan ampunilah kesalahan kami, seperti kami pun mengampuni yang bersalah kepada kami. Janganlah masukkan kami ke dalam pencobaan, tetapi bebaskanlah kami dari yang jahat. Amin.',
    id: 'bapakami',
  },
  {
    title: 'Salam Maria',
    text: 'Salam Maria, penuh rahmat, Tuhan sertamu. Terpujilah engkau di antara wanita, dan terpujilah buah tubuhmu Yesus. Santa Maria, Bunda Allah, doakanlah kami yang berdosa ini, sekarang dan waktu kami mati. Amin.',
    id: 'salammaria',
  },
  {
    title: 'Ave Maria',
    text: 'Ave Maria, gratia plena, Dominus tecum. Benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus. * Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc et in hora mortis nostræ. Amen.',
    id: 'avemaria',
  },
  {
    title: 'Kemuliaan',
    text: 'Kemuliaan kepada Bapa, Putra, dan Roh Kudus, seperti pada permulaan, sekarang selalu dan sepanjang segala abad. Amin.',
    id: 'kemuliaan',
  },
  {
    title: 'Terpujilah',
    text: 'Terpujilah nama Yesus, Maria dan Yusuf, sekarang dan selama-lamanya.',
    id: 'terpujilah',
  },
  {
    title: 'Doa Fatima',
    text: 'Ya Yesus yang baik, ampunilah dosa-dosa kami. Selamatkanlah kami dari api neraka, dan antarlah jiwa-jiwa ke Surga, terutama mereka yang sangat membutuhkan kerahiman-Mu.',
    id: 'doafatima', 
  },
]
const mainPrayersGetText = (itemId: string): React.ReactNode => {
  const foundPrayer = mainPrayers.find((prayer) => prayer.id === itemId);
  if (foundPrayer && typeof foundPrayer.text === 'string') {
    return (
      <Collapsible title={foundPrayer.title}>
        {foundPrayer.text.split('\n').map((line: string, index: number) => (
          <Text key={index} style={style_pray.container}>{line}</Text>
        ))}
      </Collapsible>
    );
  } else {
    return <Text>No element found.</Text>;
  }
}

export const prayData = [
  {
    title: 'Malaikat Tuhan',
    description: '06.00, 12.00, dan 18.00 (kecuali Paskah)',
    imageUrl: 'https://i.ytimg.com/vi/_5x_XTSu4iQ/sddefault.jpg',
    text: <PrayText itemId="malaikattuhan" />,
    id: 'malaikattuhan',
  },
  {
    title: 'Ratu Surga',
    description: '06.00, 12.00, dan 18.00 (selama Paskah)',
    imageUrl: 'https://publisher-ncreg.s3.us-east-2.amazonaws.com/pb-ncregister/swp/hv9hms/media/2020082710084_5f47694ac2bf74d8ccdc358bjpeg.webp',
    text: <PrayText itemId="ratusurga" />,
    id: 'ratusurga',
  },
  {
    title: 'Kerahiman Ilahi',
    description: '15.00',
    imageUrl: 'https://www.archgh.org/media/14285/texas-catholic-herald-divine-mercy.jpg',
    text: <PrayText itemId="kerahimanilahi" />,
    id: 'kerahimanilahi',
  },
  {
    title: 'Rosario',
    description: '22.00',
    imageUrl: 'https://tandirection.com/wp-content/uploads/2024/05/shutterstock_2211643749-scaled.jpg',
    text: <PrayText itemId="rosario" />,
    id: 'rosario',
  },
];