import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

const style_pray = StyleSheet.create({
  container: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
    textAlign: 'left',
  },
  italy: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
    textAlign: 'left',
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
});

export function PrayText({ itemId }) {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const formattedDate = now.toLocaleDateString(undefined, options);
    setCurrentDate(formattedDate);
  }, []);

  const getDayIndex = () => {
    const now = new Date();
    return now.getDay();
  };

  switch (itemId) {
    case 'rosario':
      const dayIndex = getDayIndex();
      return (
        <>
          {dayIndex === 1 || dayIndex === 6 ? (
            <Text style={style_pray.subtitle}>Peristiwa Gembira</Text>
          ) : dayIndex === 2 || dayIndex === 5 ? (
            <Text style={style_pray.subtitle}>Peristiwa Sedih</Text>
          ) : dayIndex === 3 || dayIndex === 0 ? ( 
            <Text style={style_pray.subtitle}>Peristiwa Mulia</Text>
          ) : ( 
            <Text style={style_pray.subtitle}>Peristiwa Terang</Text>
          )}
        </>
      );
    case 'malaikattuhan':
      return (
        <>
          <Text style={style_pray.italy}>Angelus Domini nuntiavit Mariae,</Text>
          <Text style={style_pray.italy}>Et concepit de Spiritu Sancto.</Text>
          <Text style={style_pray.italy}>Ave Maria, gratia plena, Dominus tecum. Benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus. * Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc et in hora mortis nostræ. Amen. </Text>
          <Text style={style_pray.italy}>Ecce ancilla Domini.</Text>
          <Text style={style_pray.italy}>Fiat mihi secundum verbum tuum.</Text>
          <Text style={style_pray.italy}>Ave Maria, gratia plena, Dominus tecum. Benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus. * Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc et in hora mortis nostræ. Amen. </Text>
          <Text style={style_pray.italy}>Et Verbum caro factum est.</Text>
          <Text style={style_pray.italy}>Et habitavit in nobis.</Text>
          <Text style={style_pray.italy}>Ave Maria, gratia plena, Dominus tecum. Benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus. * Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc et in hora mortis nostræ. Amen. </Text>
          <Text style={style_pray.italy}>Ora pro nobis, Sancta Dei Genitrix.</Text>
          <Text style={style_pray.italy}>Ut digni efficiamur promissionibus Christi.</Text>
          <Text style={style_pray.italy}>Gratiam tuam, quæsumus, Domine, mentibus nostris infunde; ut qui, Angelo nuntiante, Christi Filii tui incarnationem cognovimus, per passionem eius et Crucem ad resurrectionis gloriam perducamur. Per eundem Christum Dominum nostrum. Amen.</Text>
          <Text></Text>
          <Text style={style_pray.container}>Maria diberi kabar oleh Malaikat Allah,</Text>
          <Text style={style_pray.container}>bahwa ia akan mengandung dari Roh Kudus.</Text>
          <Text style={style_pray.container}>Salam Maria, penuh rahmat, Tuhan sertamu. Terpujilah engkau di antara wanita, dan terpujilah Buah Tubuhmu, Yesus. Santa Maria, Bunda Allah, doakanlah kami yang berdosa ini, sekarang dan waktu kami mati. Amin. </Text>
          <Text style={style_pray.container}>Aku ini hamba Allah,</Text>
          <Text style={style_pray.container}>terjadilah padaku menurut perkataanmu.</Text>
          <Text style={style_pray.container}>Salam Maria, penuh rahmat, Tuhan sertamu. Terpujilah engkau di antara wanita, dan terpujilah Buah Tubuhmu, Yesus. Santa Maria, Bunda Allah, doakanlah kami yang berdosa ini, sekarang dan waktu kami mati. Amin. </Text>
          <Text style={style_pray.container}>Sabda sudah menjadi Daging,</Text>
          <Text style={style_pray.container}>dan tinggal di antara kita.</Text>
          <Text style={style_pray.container}>Salam Maria, penuh rahmat, Tuhan sertamu. Terpujilah engkau di antara wanita, dan terpujilah Buah Tubuhmu, Yesus. Santa Maria, Bunda Allah, doakanlah kami yang berdosa ini, sekarang dan waktu kami mati. Amin. </Text>
          <Text style={style_pray.container}>Doakanlah kami, ya Santa Bunda Allah, </Text>
          <Text style={style_pray.container}>supaya kami dapat menikmati janji Kristus.</Text>
          <Text style={style_pray.container}>Ya Allah, karena kabar malaikat, kami mengetahui bahwa Yesus Kristus, Putra-Mu menjadi manusia. Curahkanlah rahmat-Mu ke dalam hati kami, supaya karena sengsara dan salib-Nya, kami dibawa kepada kebangkitan yang mulia. Sebab Dialah Tuhan, pengantara kami.</Text>
        </>
      );
    case 'ratusurga':
      return (
        <>
          <Text style={style_pray.italy}>Regina caeli, laetare, alleluia.</Text>
          <Text style={style_pray.italy}>Quia quem meruisti portare, alleluia.</Text>
          <Text style={style_pray.italy}>Resurrexit, sicut dixit, alleluia. </Text>
          <Text style={style_pray.italy}>Ora poro nobis Deum, alleluia.</Text>
          <Text style={style_pray.italy}>Gaude et laetare, Virgo Maria, alleluia.</Text>
          <Text style={style_pray.italy}>Quia surrexit Dominus vere, alleluia.</Text>
          <Text style={style_pray.italy}>Oremus. Deus, qui per ressurectionem Filli tui, Domini nostri lesu Christi, mundum laetificare dignatus es: praesta, quaesumus; ut per eius Genetricem Virginem Mariam, perpetuae capiamus gaudia vitae. Per eundem Christum Dominum nostrum. Amen.</Text>
          <Text></Text>
          <Text style={style_pray.container}>Ratu Surga bersukacitalah, alleluia.</Text>
          <Text style={style_pray.container}>Sebab Ia yang sudi kau kandung, alleluia.</Text>
          <Text style={style_pray.container}>Telah bangkit seperti disabdakan-Nya, alleluia. </Text>
          <Text style={style_pray.container}>Doakanlah kami pada Allah, alleluia.</Text>
          <Text style={style_pray.container}>Bersukacitalah dan bergembiralah, Perawan Maria, alleluia.</Text>
          <Text style={style_pray.container}>Sebab Tuhan sungguh telah bangkit, alleluia.</Text>
          <Text style={style_pray.container}>Ya Allah, Engkau telah menggembirakan dunia dengan kebangkitan Putra-Mu, Tuhan kami Yesus Kristus. Kami mohon, perkenankanlah kami bersukacita dalam kehidupan kekal bersama bunda-Nya, Perawan Maria. Demi Kristus, pengantara kami. Amin.</Text>
        </>
      );
    case 'kerahimanilahi':
      return <Text>Welcome, Guest.</Text>;
    default:
      const foundPrayer = prayData.find((prayer) => prayer.id === itemId);
      if (foundPrayer && typeof foundPrayer.text === 'string') {
        return foundPrayer.text.split('\n').map((line, index) => (
          <Text key={index} style={style_pray.container}>{line}</Text>
        ));
      } 
  }
}

export const prayData = [
  {
    title: 'Rosario',
    description: '22.00',
    imageUrl: 'https://tandirection.com/wp-content/uploads/2024/05/shutterstock_2211643749-scaled.jpg',
    text: <PrayText itemId="rosario" />,
    id: 'rosario',
  },
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
];

// The map is no longer needed as the logic is within the component
// export const textElementMap: Record<string, React.ReactNode> = {};

// export function getTextElementprayFromMap(itemId: string): React.ReactNode {
//   return textElementMap[itemId] || <Text>No element found.</Text>;
// }