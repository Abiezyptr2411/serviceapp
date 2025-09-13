import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
// ...existing code...

const { width } = Dimensions.get('window');
const cardWidth = (width - 45) / 2;

export default function KatalogScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://192.168.0.205:3001/katalog');
        if (res.data) {
          if (res.data.responseCode === '00') {
            setProducts(res.data.katalog);
          }
          if (res.data.message) {
            setApiMessage(res.data.message);
          }
        }
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.card, { width: cardWidth }]}>
      <Image
        source={{
          uri: item.image || "https://via.placeholder.com/150",
        }}
        style={styles.image}
        resizeMode="contain"
      />
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
      {loading ? (
        <Text style={{ textAlign: 'center', marginTop: 30 }}>Loading...</Text>
      ) : products.length === 0 ? (
        <View style={styles.notFoundContainer}>
          <Image
            source={require('./assets/notfound.png')}
            style={styles.notFoundImage}
            resizeMode="contain"
          />
          <Text style={styles.notFoundText}>{apiMessage ? apiMessage : 'Produk tidak ditemukan'}</Text>
        </View>
      ) : (
        <FlatList
          key="2"
          data={products}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
          contentContainerStyle={{ padding: 15, paddingBottom: 20 }}
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
  notFoundContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 90,
    marginBottom: 10,
  },
  notFoundImage: {
    width: 180,
    height: 180,
    marginBottom: 18,
  },
  notFoundText: {
    fontSize: 16,
    color: '#888',
    fontWeight: 'bold',
  },
});
