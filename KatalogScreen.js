import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Dummy data produk
const products = [
  { id: 1, nama: 'Oli Motor Xtreme', harga: 'Rp120.000', img: 'https://www.mydigioto.com/wp-content/uploads/2023/02/6.png' },
  { id: 2, nama: 'Filter Oli Motor', harga: 'Rp45.000', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtPZhaouoO01n_XVpet2LOixJsw_brfVYkCg&s' },
  { id: 3, nama: 'Busi Motor Standard', harga: 'Rp30.000', img: 'https://yamaha-jambi.com/wp-content/uploads/2024/10/2S2z2wqKK3UZ4hwrsjzn-1024x1011.png' },
  { id: 4, nama: 'Ban Motor', harga: 'Rp250.000', img: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/104/MTA-11893865/pirelli_pirelli_diablo_rosso_corsa_ii_110-70-17_ban_motor_tubeless_bonus_pentil_full01_e0zgydrl.jpg' },
];

const { width } = Dimensions.get('window');
const cardWidth = (width - 45) / 2; 

export default function KatalogScreen() {
  const renderItem = ({ item }) => (
    <View style={[styles.card, { width: cardWidth }]}>
      <Image source={{ uri: item.img }} style={styles.image} />
      <Text style={styles.name}>{item.nama}</Text>
      <Text style={styles.price}>{item.harga}</Text>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Beli</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header konsisten */}
      <View style={styles.header}>
        <Ionicons name="construct-outline" size={28} color="#fff" />
        <Text style={styles.headerTitle}>Layanan Service</Text>
      </View>

      {/* Konten */}
     <FlatList
        key="2" // 🔹 kunci statis sesuai numColumns
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2} // dua card per baris
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
        contentContainerStyle={{ padding: 15, paddingBottom: 20 }}
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
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginLeft: 10 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    padding: 10,
    alignItems: 'center',
  },
  image: { width: '100%', height: 100, borderRadius: 8, marginBottom: 10 },
  name: { fontSize: 14, fontWeight: '600', marginBottom: 5, textAlign: 'center' },
  price: { fontSize: 13, fontWeight: 'bold', color: '#d32f2f', marginBottom: 10 },
  btn: {
    backgroundColor: '#d32f2f',
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});
