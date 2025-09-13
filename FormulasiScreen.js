import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const formulasiData = [
  { id: 1, layanan: 'Ganti Oli Mesin', biaya: 'Rp 50.000' },
  { id: 2, layanan: 'Tune Up', biaya: 'Rp 150.000' },
  { id: 3, layanan: 'Ganti Kampas Rem', biaya: 'Rp 75.000' },
  { id: 4, layanan: 'Ganti Aki', biaya: 'Rp 200.000' },
  { id: 5, layanan: 'Servis Rutin', biaya: 'Rp 100.000' },
];

export default function FormulasiScreen() {
  const renderItem = ({ item, index }) => (
    <View style={[styles.row, index % 2 === 0 && styles.evenRow]}>
      <Text style={styles.layanan}>{item.layanan}</Text>
      <Text style={styles.biaya}>{item.biaya}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header merah */}
      <View style={styles.header}>
        <Ionicons name="cash-outline" size={28} color="#fff" />
        <Text style={styles.headerTitle}>Formulasi Biaya Service</Text>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { flex: 2 }]}>Layanan</Text>
        <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}>Biaya</Text>
      </View>

      {/* List */}
      <FlatList
        data={formulasiData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d32f2f',
    padding: 15,
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginLeft: 10 },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableHeaderText: { fontWeight: 'bold', fontSize: 16, color: '#555' },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  evenRow: { backgroundColor: '#fff' },
  layanan: { flex: 2, fontSize: 16, color: '#333' },
  biaya: { flex: 1, fontSize: 16, color: '#333', textAlign: 'right' },
});
