import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfilScreen({ navigation }) { // ← dapatkan navigation
  const user = {
    nama: 'Budi Santoso',
    email: 'budi@example.com',
    noHp: '0812-3456-7890',
    avatar: 'https://i.pravatar.cc/150?img=3',
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Apakah Anda yakin ingin keluar?',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Ya', 
          onPress: () => {
            console.log('User logged out');
            navigation.replace('Login'); // ← pindah ke halaman Login
          } 
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil Saya</Text>
      </View>

      <View style={styles.avatarContainer}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.nama}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>No. HP</Text>
          <Text style={styles.value}>{user.noHp}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Ionicons name="pencil-outline" size={20} color="#fff" />
        <Text style={styles.editText}>Edit Profil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: { backgroundColor: '#d32f2f', paddingVertical: 20, alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  avatarContainer: { alignItems: 'center', marginTop: -40, marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#fff' },
  name: { fontSize: 22, fontWeight: 'bold', marginTop: 10, color: '#333' },
  infoContainer: { backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 12, padding: 15, elevation: 2 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  label: { fontSize: 14, color: '#888' },
  value: { fontSize: 16, fontWeight: '500', color: '#333' },
  editButton: { flexDirection: 'row', backgroundColor: '#d32f2f', marginHorizontal: 50, marginTop: 30, paddingVertical: 12, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  editText: { color: '#fff', fontWeight: 'bold', marginLeft: 8 },
  logoutButton: { flexDirection: 'row', backgroundColor: '#888', marginHorizontal: 50, marginTop: 15, paddingVertical: 12, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  logoutText: { color: '#fff', fontWeight: 'bold', marginLeft: 8 },
});
