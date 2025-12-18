import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHECKLIST_STORAGE_KEY_CA = '@workout:CA';
const CHECKLIST_STORAGE_KEY_LB = '@workout:LB';
const CHECKLIST_STORAGE_KEY_AS = '@workout:AS';

const style_work = StyleSheet.create({
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
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  item: {
    marginBottom: 10,
    width: '95%',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginRight: 10,
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
  label: {
    fontSize: 16,
    color: 'white',
    flexShrink: 1,
  },
  checkedLabel: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  desc: {
    fontSize: 14,
    color: 'white',
    marginLeft: 0,
    marginTop: 2,
    flexShrink: 1,
  },
  checkeddesc: {
    color: 'gray',
  },
});

export function WorkoutText({ itemId }: { itemId: string }) {
  const [itemsCA, setItemsCA] = useState([
    { id: 1, label: 'Bench Press', desc: '1. Konservatif dengan beban. \n2. Turunkan secara perlahan, berhenti ketika failure.\n3.Kamu bisa!', isChecked: false },
    { id: 2, label: 'Barbell Chest Press', desc: '1. Usahakan sampai bawah.\n2. Gunakan permukaan datar', isChecked: false },
    { id: 3, label: 'Vertical Chest Press', desc: '1. Kaki di lantai, bukan di pedal.\n2. Tinggi kursi level 3', isChecked: false },
    { id: 4, label: 'Horizontal Chest Press', desc: '1. Tinggi kursi 4-6\n2. Dorong pegangan yang dalam', isChecked: false },
    { id: 5, label: 'Chest Fly', desc: '1. Sekitar 1/2 atau 1/4 dari centre\n2. Boleh ditarik satu lengan dahulu baru ke tengah', isChecked: false },
    { id: 6, label: 'Triceps Pushdown', desc: '1. Usahakan satu per satu lengan\n2. Lihat cermin, apakah siku stabil?', isChecked: false },
    { id: 7, label: 'Seated Side Curl', desc: '1. Permukaan antara datar dan tegak\n2. Kedua lengan sekaligus', isChecked: false },
    { id: 8, label: 'Biceps Curl', desc: '1. Kombinasi bar dan dumbell\n2. Miringkan badan per sisi', isChecked: false },
    { id: 9, label: 'Leg Extension', desc: '1. Kontraksi cepat, relaksasi lambat\n2. Jangan tergesa-gesa', isChecked: false },
  ]);

  const [itemsLB, setItemsLB] = useState([
    { id: 1, label: 'Weighted Squat', desc: '1. Usahakan turun ke bawah\n2. Seimbangkan badan', isChecked: false },
    { id: 2, label: 'Leg Extension', desc: '1. Kontraksi cepat, relaksasi lambat\n2. Jangan tergesa-gesa', isChecked: false },
    { id: 3, label: 'Leg Curl', desc: '1. Jika sakit, turunkan beban\n2. Usahakan tegak lurus lantai', isChecked: false },
    { id: 4, label: 'Back Fly', desc: '1. Usahakan sampai kedua lengan sejajar\n2. Lihat langit-langit', isChecked: false },
    { id: 5, label: 'Seated Cable Row (Top)', desc: '1. Lihat langit-langit\n2. Dada busung', isChecked: false },
    { id: 6, label: 'Seated Cable Row (Bottom)', desc: '1. Kontraksi cepat, relaksasi lambat\n2. Pilih beban sesuai', isChecked: false },
    { id: 7, label: 'Back Cable Pull', desc: '1. Tangan di otot yang digunakan\n2. Duduk di lantai jika perlu', isChecked: false },
    { id: 8, label: 'Back Cable Up', desc: '1. Tarik ke atas\n2. Seimbangkan postur badan', isChecked: false },
    { id: 9, label: 'Biceps Curl', desc: '1. Kombinasi bar dan dumbell\n2. Miringkan badan per sisi', isChecked: false },
  ]);

  const [itemsAS, setItemsAS] = useState([
    { id: 1, label: 'Horizontal Shoulder Press', desc: '1. Miringkan badan sebisanya\n2. Kontraksi cepat, relaksasi lambat', isChecked: false },
    { id: 2, label: 'Barbell Shoulder Press', desc: '1. Tempelkan badan ke permukaan tegak\n2. Usahakan turun sampai telinga', isChecked: false },
    { id: 3, label: 'Cable Side Rises', desc: '1. Pastikan telapak tidak menekuk\n2. Usahakan badan stabil', isChecked: false },
    { id: 4, label: 'Cable Front Rises', desc: '1. Pastikan siku lurus ke depan\n2. Usahakan badan stabil', isChecked: false },
    { id: 5, label: 'Barbell Side Rises', desc: '1. Usahakan badan tegak\n2. Lengan membuka 45deg', isChecked: false },
    { id: 6, label: 'Weighted Sit Up', desc: '1. Tempelkan dumbbell ke dada\n2. Dari bawah (menempel) sampai atas', isChecked: false },
    { id: 7, label: 'Abs Rises', desc: '1. Kaki menempel sempurna di bawah\n2. Sikap lilin di atas', isChecked: false },
    { id: 8, label: 'Biceps Curl', desc: '1. Kombinasi bar dan dumbell\n2. Miringkan badan per sisi', isChecked: false },
    { id: 9, label: 'Chest Fly', desc: '1. Sekitar 1/2 atau 1/4 dari centre\n2. Boleh ditarik satu lengan dahulu baru ke tengah', isChecked: false },
  ]);

  const saveChecklistDataCA = async (data: typeof itemsCA) => {
    try {
      await AsyncStorage.setItem(CHECKLIST_STORAGE_KEY_CA, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save checklist data for Chest-Arms', e);
    }
  };

  const saveChecklistDataLB = async (data: typeof itemsLB) => {
    try {
      await AsyncStorage.setItem(CHECKLIST_STORAGE_KEY_LB, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save checklist data for Legs-Back', e);
    }
  };

  const saveChecklistDataAS = async (data: typeof itemsAS) => {
    try {
      await AsyncStorage.setItem(CHECKLIST_STORAGE_KEY_AS, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save checklist data for Abs-Shoulders', e);
    }
  };

  const handleCheckboxToggleLB = (id: number) => {
    const updated = itemsLB.map(item =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );
    setItemsLB(updated);
    saveChecklistDataLB(updated);
  };

  const handleCheckboxToggleCA = (id: number) => {
    const updated = itemsCA.map(item =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );
    setItemsCA(updated);
    saveChecklistDataCA(updated);
  };

  const handleCheckboxToggleAS = (id: number) => {
    const updated = itemsAS.map(item =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );
    setItemsAS(updated);
    saveChecklistDataAS(updated);
  };

  const resetChecklists = async () => {
    try {
      const resetCA = itemsCA.map(item => ({ ...item, isChecked: false }));
      const resetLB = itemsLB.map(item => ({ ...item, isChecked: false }));
      const resetAS = itemsAS.map(item => ({ ...item, isChecked: false }));

      setItemsCA(resetCA);
      setItemsLB(resetLB);
      setItemsAS(resetAS);

      await AsyncStorage.setItem(CHECKLIST_STORAGE_KEY_CA, JSON.stringify(resetCA));
      await AsyncStorage.setItem(CHECKLIST_STORAGE_KEY_LB, JSON.stringify(resetLB));
      await AsyncStorage.setItem(CHECKLIST_STORAGE_KEY_AS, JSON.stringify(resetAS));

      console.log('Checklists reset.');
    } catch (error) {
      console.error('Failed to reset checklists', error);
    }
  };

  useEffect(() => {
    const loadChecklistData = async () => {
      try {
        const storedCA = await AsyncStorage.getItem(CHECKLIST_STORAGE_KEY_CA);
        if (storedCA) setItemsCA(JSON.parse(storedCA));

        const storedLB = await AsyncStorage.getItem(CHECKLIST_STORAGE_KEY_LB);
        if (storedLB) setItemsLB(JSON.parse(storedLB));

        const storedAS = await AsyncStorage.getItem(CHECKLIST_STORAGE_KEY_AS);
        if (storedAS) setItemsAS(JSON.parse(storedAS));
      } catch (e) {
        console.error('Failed to load checklist data', e);
      }
    };

    loadChecklistData();
  }, []);

  return (
    <>
      {itemId === 'legs-back' && (
        <>
          <Text style={[style_work.subtitle, { marginTop: 0 }]}>Wajib</Text>
          {itemsLB.filter(item => item.id < 9).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={style_work.item}
              onPress={() => handleCheckboxToggleLB(item.id)}
            >
              <View style={[style_work.box]}>
                <View style={[style_work.checkbox, item.isChecked && style_work.checkedCheckbox]}>
                  {item.isChecked && <Text style={style_work.checkMark}>✓</Text>}
                </View>
                <View style={{ flexDirection: 'column', width: '85%' }}>
                  <Text style={[style_work.label, item.isChecked && style_work.checkedLabel]}>
                    {item.label}
                  </Text>
                  <Text style={[style_work.desc, item.isChecked && style_work.checkeddesc]}>
                    {item.desc}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <Text style={[style_work.subtitle, { marginTop: 0 }]}>Opsional</Text>
          {itemsLB.filter(item => item.id >= 9).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={style_work.item}
              onPress={() => handleCheckboxToggleLB(item.id)}
            >
              <View style={[style_work.box]}>
                <View style={[style_work.checkbox, item.isChecked && style_work.checkedCheckbox]}>
                  {item.isChecked && <Text style={style_work.checkMark}>✓</Text>}
                </View>
                <View style={{ flexDirection: 'column', width: '85%' }}>
                  <Text style={[style_work.label, item.isChecked && style_work.checkedLabel]}>
                    {item.label}
                  </Text>
                  <Text style={[style_work.desc, item.isChecked && style_work.checkeddesc]}>
                    {item.desc}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </>
      )}
      {itemId === 'chest-arms' && (
        <>
          <Text style={[style_work.subtitle, { marginTop: 0 }]}>Wajib</Text>
          {itemsCA.filter(item => item.id < 9).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={style_work.item}
              onPress={() => handleCheckboxToggleCA(item.id)}
            >
              <View style={[style_work.box]}>
                <View style={[style_work.checkbox, item.isChecked && style_work.checkedCheckbox]}>
                  {item.isChecked && <Text style={style_work.checkMark}>✓</Text>}
                </View>
                <View style={{ flexDirection: 'column', width: '85%' }}>
                  <Text style={[style_work.label, item.isChecked && style_work.checkedLabel]}>
                    {item.label}
                  </Text>
                  <Text style={[style_work.desc, item.isChecked && style_work.checkeddesc]}>
                    {item.desc}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <Text style={[style_work.subtitle, { marginTop: 0 }]}>Opsional</Text>
          {itemsCA.filter(item => item.id >= 9).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={style_work.item}
              onPress={() => handleCheckboxToggleCA(item.id)}
            >
              <View style={[style_work.box]}>
                <View style={[style_work.checkbox, item.isChecked && style_work.checkedCheckbox]}>
                  {item.isChecked && <Text style={style_work.checkMark}>✓</Text>}
                </View>
                <View style={{ flexDirection: 'column', width: '85%' }}>
                  <Text style={[style_work.label, item.isChecked && style_work.checkedLabel]}>
                    {item.label}
                  </Text>
                  <Text style={[style_work.desc, item.isChecked && style_work.checkeddesc]}>
                    {item.desc}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </>
      )}
      {itemId === 'abs-shoulders' && (
        <>
          <Text style={[style_work.subtitle, { marginTop: 0 }]}>Wajib</Text>
          {itemsAS.filter(item => item.id < 8).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={style_work.item}
              onPress={() => handleCheckboxToggleAS(item.id)}
            >
              <View style={[style_work.box]}>
                <View style={[style_work.checkbox, item.isChecked && style_work.checkedCheckbox]}>
                  {item.isChecked && <Text style={style_work.checkMark}>✓</Text>}
                </View>
                <View style={{ flexDirection: 'column', width: '85%' }}>
                  <Text style={[style_work.label, item.isChecked && style_work.checkedLabel]}>
                    {item.label}
                  </Text>
                  <Text style={[style_work.desc, item.isChecked && style_work.checkeddesc]}>
                    {item.desc}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <Text style={[style_work.subtitle, {marginTop: 0}]}>Opsional</Text>
            {itemsAS.filter(item => item.id >= 8).map((item) => (
              <TouchableOpacity
                key={item.id}
                style={style_work.item}
                onPress={() => handleCheckboxToggleAS(item.id)}
              >
                <View style={[style_work.box]}>
                  <View style={[style_work.checkbox, item.isChecked && style_work.checkedCheckbox]}>
                    {item.isChecked && <Text style={style_work.checkMark}>✓</Text>}
                  </View>
                  <View style={{ flexDirection: 'column', width: '85%' }}>
                    <Text style={[style_work.label, item.isChecked && style_work.checkedLabel]}>
                      {item.label}
                    </Text>
                    <Text style={[style_work.desc, item.isChecked && style_work.checkeddesc]}>
                      {item.desc}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
        ))}
        </>
      )}  
      </>
    )
}


export const workData = [
  {
    title: 'Kaki dan Punggung',
    description: 'Selasa dan Jumat',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Trapezius.png',
    text: <WorkoutText itemId='legs-back'/>,
    id: 'legs-back',
  },
  {
    title: 'Dada dan Lengan',
    description: 'Rabu dan Sabtu',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Flexi%C3%B3n_del_brazo.png',
    text: <WorkoutText itemId='chest-arms'/>,
    id: 'chest-arms',
  },
  {
    title: 'Perut dan Bahu',
    description: 'Kamis dan Minggu',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Illu_trunk_muscles.jpg',
    text: <WorkoutText itemId='abs-shoulders'/>,
    id: 'abs-shoulders',
  },
]