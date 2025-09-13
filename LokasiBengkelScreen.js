import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const bengkel = [
  { id: '1', nama: 'Bengkel Yamaha Abadi', alamat: 'Jl. Sudirman No. 45', telp: '081234567890' },
  { id: '2', nama: 'Bengkel Motor Sejahtera', alamat: 'Jl. Gatot Subroto No. 12', telp: '082345678901' },
  { id: '3', nama: 'Bengkel Mekar Jaya', alamat: 'Jl. Diponegoro No. 33', telp: '083456789012' },
];

export default function LokasiBengkelScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Bengkel Terdekat</Text>
      <FlatList
        data={bengkel}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.nama}</Text>
            <Text style={styles.cardText}>{item.alamat}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.telp}`)}>
              <View style={styles.phoneBox}>
                <Ionicons name="call-outline" size={20} color="#fff" />
                <Text style={styles.phoneText}>Hubungi</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardText: { fontSize: 14, color: '#555', marginBottom: 10 },
  phoneBox: {
    flexDirection: 'row',
    backgroundColor: '#43a047',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: 110,
    justifyContent: 'center',
  },
  phoneText: { color: '#fff', marginLeft: 5, fontWeight: 'bold' },
});
