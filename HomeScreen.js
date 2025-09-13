import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    getUser();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {user ? `Hello, ${user.username}` : 'Hello, Guest'}
        </Text>
        <View style={styles.pointBox}>
          <Text style={styles.pointText}>Starter | 5 Poin</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* MENU GRID */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Katalog')}>
            <Ionicons name="cart-outline" size={26} color="#e53935" />
            <Text style={styles.menuText}>Katalog</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Voucher')}>
            <Ionicons name="gift-outline" size={26} color="#1e88e5" />
            <Text style={styles.menuText}>Voucher</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Games')}>
            <Ionicons name="game-controller-outline" size={26} color="#43a047" />
            <Text style={styles.menuText}>Games</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Berita')}>
            <Ionicons name="newspaper-outline" size={26} color="#fb8c00" />
            <Text style={styles.menuText}>Berita</Text>
          </TouchableOpacity>
        </View>

        {/* PROMO */}
        <Text style={styles.sectionTitle}>Promo Terbaru</Text>
        <Image
          source={{ uri: 'https://www.dayaauto.co.id/wp-content/uploads/2021/08/Booking-Service-90-Hari-1536x751-1.webp' }}
          style={styles.promoBanner}
        />

        {/* MOTOR SAYA */}
        <Text style={styles.sectionTitle}>Motor Saya</Text>
        <View style={styles.motorCard}>
          <Image
            source={{ uri: 'https://i0.wp.com/cdn.juraganwp.com/monkeymotoblog/wp-content/uploads/2020/11/11221011/wp-1606274534502.png?ssl=1' }}
            style={styles.motorImage}
          />
          <View>
            <Text style={styles.motorTitle}>YAMAHA GEAR 125</Text>
            <Text style={styles.motorText}>B 3117 WDV</Text>
            <Text style={styles.motorDesc}>JL. Griya Satwika C7 No 3.</Text>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM NAVBAR */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={22} color="#e53935" />
          <Text style={styles.navTextActive}>Beranda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Aktivitas')}>
          <Ionicons name="time-outline" size={22} color="#777" />
          <Text style={styles.navText}>Aktivitas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Service')}>
          <Ionicons name="construct-outline" size={22} color="#777" />
          <Text style={styles.navText}>Service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Formulasi')}>
          <Ionicons name="document-text-outline" size={22} color="#777" />
          <Text style={styles.navText}>Formulasi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profil')}>
          <Ionicons name="person-outline" size={22} color="#777" />
          <Text style={styles.navText}>Profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#d32f2f',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  pointBox: {
    marginTop: 8,
    backgroundColor: '#c62828',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  pointText: { color: '#fff', fontSize: 13 },

  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 12,
    marginHorizontal: 12,
    elevation: 2,
  },
  menuItem: { alignItems: 'center' },
  menuText: { fontSize: 12, marginTop: 6 },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 15,
  },
  promoBanner: {
    width: width * 0.9,
    height: 140,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
  },

  motorCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    elevation: 2,
  },
  motorImage: { width: 80, height: 80, marginRight: 15, resizeMode: 'contain' },
  motorTitle: { fontSize: 16, fontWeight: 'bold' },
  motorText: { fontSize: 13, color: '#555' },
  motorDesc: { fontSize: 12, color: '#777', marginTop: 5 },

  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 11, color: '#777', marginTop: 2 },
  navTextActive: { fontSize: 11, color: '#e53935', marginTop: 2, fontWeight: 'bold' },
});
