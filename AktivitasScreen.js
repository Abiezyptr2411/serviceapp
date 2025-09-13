import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ServiceContext } from './ServiceContext';
import { Ionicons } from '@expo/vector-icons';

export default function AktivitasScreen() {
  const { riwayat } = useContext(ServiceContext);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>📅 {item.tanggal}</Text>
      <Text style={styles.itemText}>📝 {item.keluhan}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="bar-chart-outline" size={28} color="#fff" />
        <Text style={styles.headerTitle}>Aktivitas</Text>
      </View>

      {/* Konten */}
      {riwayat.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noData}>Belum ada aktivitas booking.</Text>
        </View>
      ) : (
        <FlatList
          data={riwayat}
          keyExtractor={(item) => item.id.toString()}
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
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  itemText: { fontSize: 16 },
  noDataContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  noData: { fontSize: 16, color: '#888' },
});
