import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const games = [
  {
    id: 1,
    title: '🧩 Puzzle Challenge',
    info: 'Asah otak Anda dengan puzzle menarik.',
  },
  {
    id: 2,
    title: '🏎️ Racing Mania',
    info: 'Balapan seru untuk mengisi waktu.',
  },
  {
    id: 3,
    title: '🎯 Target Shoot',
    info: 'Tembak target dan raih skor tinggi!',
  },
];

export default function GamesScreen() {
  const handlePlay = (title) => {
    Alert.alert('Game Dipilih', `Kamu memilih "${title}"!`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePlay(item.title)}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.infoText}>{item.info}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="game-controller-outline" size={28} color="#fff" />
        <Text style={styles.headerTitle}>Games</Text>
      </View>

      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 15, paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d32f2f',
    padding: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  infoText: { fontSize: 14, color: '#555' },
});
