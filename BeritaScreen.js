import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BeritaScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="newspaper-outline" size={28} color="#fff" />
        <Text style={styles.headerTitle}>Berita Otomotif</Text>
      </View>

      {/* Konten berita */}
      <ScrollView style={styles.contentContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1571607383667-9c118b5c41e6?auto=format&fit=crop&w=800&q=80' }}
          style={styles.mainImage}
        />
        <Text style={styles.title}>Mobil Listrik Terbaru Meluncur di Pasar Indonesia</Text>
        <Text style={styles.meta}>🗓 17 Agustus 2025 • Penulis: Admin</Text>
        <Text style={styles.content}>
          Industri otomotif Indonesia kembali mencatat sejarah dengan peluncuran mobil listrik terbaru. 
          Kendaraan ini hadir dengan fitur canggih, efisiensi tinggi, dan desain futuristik yang ramah lingkungan.
          {'\n\n'}
          Peluncuran ini dilakukan di Jakarta, dengan hadirnya para pejabat dan pengusaha otomotif. 
          Mobil ini diharapkan mampu mendorong penggunaan kendaraan ramah lingkungan di Indonesia.
          {'\n\n'}
          Selain itu, teknologi baterai terbaru memungkinkan jarak tempuh yang lebih jauh dengan waktu pengisian lebih cepat. 
          Para penggemar otomotif pun sangat antusias menyambut kehadiran mobil listrik ini.
          {'\n\n'}
          Untuk informasi lebih lanjut, konsumen dapat mengunjungi website resmi pabrikan atau dealer terdekat.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
  contentContainer: {
    padding: 15,
  },
  mainImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  meta: {
    fontSize: 12,
    color: '#888',
    marginBottom: 15,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
});
