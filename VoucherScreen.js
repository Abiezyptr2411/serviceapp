import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const vouchers = [
  {
    id: 1,
    title: 'Diskon Kupon Hotel',
    code: 'TVLKTEMANSTAYCATION',
    info: 'Hanya berlaku untuk pemesanan melalui Traveloka App versi minimum 3.20.0',
  },
  {
    id: 2,
    title: 'Kupon Budget Hotel',
    code: 'STAYCATIONHEMAT',
    info: 'Hanya berlaku untuk pemesanan melalui Traveloka App versi minimum 3.20.0',
  },
  {
    id: 3,
    title: 'Kupon Diskon Villa & Apartment',
    code: 'SANTAIDIVLLAAPART',
    info: 'Berlaku untuk pemesanan melalui Traveloka App versi minimum 3.20.0',
  },
];

export default function VoucherScreen() {
  const handleCopy = (code) => {
    Clipboard.setString(code);
    Alert.alert('Berhasil', `Kode "${code}" disalin ke clipboard!`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>

      <View style={styles.codeBox}>
        <Text style={styles.codeText}>{item.code}</Text>
        <TouchableOpacity onPress={() => handleCopy(item.code)}>
          <Text style={styles.copyBtn}>Copy</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.infoText}>{item.info}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="gift-outline" size={28} color="#fff" />
        <Text style={styles.headerTitle}>Voucher & Promo</Text>
      </View>

      <FlatList
        data={vouchers}
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
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  codeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  codeText: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  copyBtn: { color: '#1e88e5', fontWeight: 'bold' },
  infoText: { fontSize: 12, color: '#888' },
});
