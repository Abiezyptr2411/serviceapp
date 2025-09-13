import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

export default function RiwayatServiceScreen() {
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (!userData) return;
        const user = JSON.parse(userData);
        const res = await axios.get(`http://192.168.0.205:3001/booking?userId=${user.id}`);
        if (res.data) {
          if (res.data.responseCode === '00') {
            setRiwayat(res.data.bookings);
          }
          if (res.data.message) {
            setApiMessage(res.data.message);
          }
        }
      } catch (err) {
        setRiwayat([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRiwayat();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'success':
      case 'selesai':
        return '#2e7d32';
      case 'pending':
      case 'proses':
        return '#ff8f00';
      case 'canceled':
      case 'batal':
        return '#c62828';
      default:
        return '#555';
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.layanan}</Text>

      {/* Kode transaksi */}
      <View style={styles.row}>
        <Ionicons name="pricetag-outline" size={16} color="#666" />
        <Text style={styles.subText}>{item.kode_transaksi || 'TRX-' + item.id}</Text>
      </View>

      {/* Tanggal */}
      <View style={styles.row}>
        <Ionicons name="calendar-outline" size={16} color="#666" />
        <Text style={styles.subText}>{item.tanggal?.slice(0, 10)}</Text>
      </View>

      {/* Jumlah */}
      <View style={styles.amountBox}>
        <Text style={styles.amount}>Rp{item.jumlah?.toLocaleString() || '0'}</Text>
        <Text style={[styles.status, { color: getStatusColor(item.status) }]}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Riwayat Service Anda</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#d32f2f" style={{ marginTop: 50 }} />
      ) : riwayat.length === 0 ? (
        <View style={styles.notFoundContainer}>
          <Image
            source={require('./assets/notfound.png')}
            style={styles.notFoundImage}
            resizeMode="contain"
          />
          <Text style={styles.notFoundText}>{apiMessage ? apiMessage : 'Data tidak ditemukan'}</Text>
        </View>
      ) : (
        <FlatList
          data={riwayat}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 15, paddingBottom: 30 }}
        />
      )}
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
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#222' },
  subText: { fontSize: 13, color: '#555', marginLeft: 6 },

  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },

  amountBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  amount: { fontSize: 15, fontWeight: 'bold', color: '#111' },
  status: { fontSize: 14, fontWeight: 'bold' },

  notFoundContainer: { justifyContent: 'center', alignItems: 'center', marginTop: 90 },
  notFoundImage: { width: 180, height: 180, marginBottom: 18 },
  notFoundText: { fontSize: 16, color: '#888', fontWeight: 'bold' },
});
