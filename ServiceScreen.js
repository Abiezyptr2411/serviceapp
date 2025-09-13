import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ServiceScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="construct-outline" size={28} color="#fff" />
        <Text style={styles.headerTitle}>Layanan Service</Text>
      </View>

      {/* KONTEN */}
      <View style={styles.content}>
        <Text style={styles.intro}>
          Booking service motor Anda dengan mudah. Pilih layanan sesuai kebutuhan Anda.
        </Text>

        {/* MENU PILIHAN */}
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BookingService')}>
        <Ionicons name="calendar-outline" size={24} color="#e53935" />
        <Text style={styles.cardText}>Booking Service</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('RiwayatService')}>
        <Ionicons name="time-outline" size={24} color="#1e88e5" />
        <Text style={styles.cardText}>Riwayat Service</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('LokasiBengkel')}>
        <Ionicons name="location-outline" size={24} color="#43a047" />
        <Text style={styles.cardText}>Lokasi Bengkel Terdekat</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },

  header: {
    backgroundColor: '#d32f2f',
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginLeft: 10 },

  content: { padding: 20 },
  intro: { fontSize: 14, color: '#555', marginBottom: 20 },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  cardText: { fontSize: 16, marginLeft: 15, fontWeight: '500', color: '#333' },
});
