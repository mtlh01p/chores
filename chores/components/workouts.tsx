import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react'; // Import if you anticipate dynamic content later

const style_work = StyleSheet.create({
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
});

// Create a WorkoutText component
export function WorkoutText({ itemId }: { itemId: string }) {

  switch (itemId) {
    case 'change': // This itemId seems misplaced for workouts, adjust as needed
      return <Text style={style_work.container}>Workout for Rosario</Text>;
    case 'station': // Also seems misplaced
      return <Text style={style_work.container}>Workout for Malaikat Tuhan</Text>;
    case 'destroyed': // And this one too
      return (
        <>
          <Text style={style_work.italy}>Workout Regina caeli, laetare, alleluia.</Text>
          {/* ... more workout text ... */}
        </>
      );
    case 'ah': // And this one
      return <Text style={style_work.container}>Workout for Kerahiman Ilahi</Text>;
  }
}

export const workData = [
  {
    title: 'Rosario Workout', // Updated title to reflect workout context
    description: 'Workout at 22:00',
    imageUrl: 'https://via.placeholder.com/150',
    text: <WorkoutText itemId="rosario" />, // Use the WorkoutText component
    id: 'rosario',
  },
  {
    title: 'Malaikat Tuhan Workout', // Updated title
    description: 'Workout at 06:00, 12:00, and 18:00',
    imageUrl: 'https://i.ytimg.com/vi/_5x_XTSu4iQ/sddefault.jpg',
    text: <WorkoutText itemId="malaikattuhan" />, // Use the WorkoutText component
    id: 'malaikattuhan',
  },
  {
    title: 'Ratu Surga Workout', // Updated title
    description: 'Workout during Easter',
    imageUrl: 'https://publisher-ncreg.s3.us-east-2.amazonaws.com/pb-ncregister/swp/hv9hms/media/2020082710084_5f47694ac2bf74d8ccdc358bjpeg.webp',
    text: <WorkoutText itemId="ratusurga" />, // Use the WorkoutText component
    id: 'ratusurga',
  },
  {
    title: 'Kerahiman Ilahi Workout', // Updated title
    description: 'Workout at 15:00',
    imageUrl: 'https://via.placeholder.com/150',
    text: <WorkoutText itemId="kerahimanilahi" />, // Use the WorkoutText component
    id: 'kerahimanilahi',
  },
];

// The getTextElementwork and getTextElementworkFromMap functions are no longer needed
// as the logic is within the WorkoutText component.