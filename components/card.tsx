import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  item: {
    id: string;
    [key: string]: any;
  };
}

function Card({ title, description, imageUrl, item }: CardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    if (item && item.id) {
      router.push({
        pathname: '/details',
        params: { itemId: item.id, title:title, description:description, imageUrl:imageUrl },
      });
    } else {
      router.push('/details');
    }
  };

  return (
    <TouchableOpacity onPress={handleCardClick} style={styles.card}>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.cardImage} />}
      <View style={styles.cardContent}>
        {title && <Text style={styles.cardTitle}>{title}</Text>}
        {description && <Text style={styles.cardDescription}>{description}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    margin: 8,
    padding: 16,
    width: '100%',
    backgroundColor: '#262626',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 4,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 16,
    color: 'white',
  },
  cardContent: {},
});

export default Card;