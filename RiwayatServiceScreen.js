import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function RiwayatServiceScreen() {
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (!userData) return;
        const user = JSON.parse(userData);
        const res = await axios.get(`http://192.168.0.205:3001/booking?userId=${user.id}`);
        if (res.data && res.data.responseCode === '00') {
          setRiwayat(res.data.bookings);
        }
      } catch (err) {
        setRiwayat([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRiwayat();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛠️ Riwayat Service</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={riwayat}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.layanan}</Text>
              <Text style={styles.cardText}>Tanggal: {item.tanggal?.slice(0, 10)}</Text>
              <Text style={styles.cardText}>Status: {item.status}</Text>
            </View>
          )}
        />
      )}
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
  cardText: { fontSize: 14, color: '#555' },
});
