import React, { useState, useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ServiceContext } from './ServiceContext'; 

export default function BookingServiceScreen({ navigation }) {
  const { addRiwayat } = useContext(ServiceContext); 
  const [tanggal, setTanggal] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [keluhan, setKeluhan] = useState('');

  const handleBooking = async () => {
    if (!keluhan) {
      alert("Please enter your motorcycle complaint first 🙏");
      return;
    }

    let userId = null;
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        userId = user.id;
      }
    } catch (e) {}

    if (!userId) {
      alert("User not found. Please login again.");
      return;
    }

    const bookingData = {
      userId,
      tanggal: tanggal.toLocaleDateString(),
      layanan: keluhan,
      status: 'pending',
    };

    try {
      const res = await axios.post('http://192.168.0.205:3001/booking', bookingData);
      if (res.data && res.data.responseCode === '00') {
        alert(res.data.message || 'Booking successful!');
        navigation.navigate("RiwayatService");
      } else {
        alert(res.data.message || 'Booking failed!');
      }
    } catch (err) {
      alert('Booking failed!');
      console.error(err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📅 Booking Service</Text>

      {/* Pilih Tanggal */}
      <TouchableOpacity style={styles.inputBox} onPress={() => setShowDate(true)}>
        <Text style={styles.inputText}>Tanggal: {tanggal.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDate && (
        <DateTimePicker
          value={tanggal}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDate(false);
            if (selectedDate) setTanggal(selectedDate);
          }}
        />
      )}

      {/* Keluhan */}
      <TextInput
        style={[styles.inputBox, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Tuliskan keluhan motor Anda..."
        multiline
        value={keluhan}
        onChangeText={setKeluhan}
      />

      {/* Tombol Booking */}
      <TouchableOpacity style={styles.btn} onPress={handleBooking}>
        <Text style={styles.btnText}>Konfirmasi Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  inputBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  inputText: { fontSize: 16 },
  btn: {
    backgroundColor: '#d32f2f',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
});
