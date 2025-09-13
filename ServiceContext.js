// ServiceContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [riwayat, setRiwayat] = useState([]);

  // 🔹 Load riwayat dari AsyncStorage saat app pertama kali jalan
  useEffect(() => {
    const loadRiwayat = async () => {
      try {
        const saved = await AsyncStorage.getItem("riwayatService");
        if (saved) {
          setRiwayat(JSON.parse(saved));
        }
      } catch (e) {
        console.log("Gagal load riwayat:", e);
      }
    };
    loadRiwayat();
  }, []);

  // 🔹 Tambah booking baru + simpan ke AsyncStorage
  const addRiwayat = async (data) => {
    try {
      const updated = [...riwayat, data];
      setRiwayat(updated);
      await AsyncStorage.setItem("riwayatService", JSON.stringify(updated));
    } catch (e) {
      console.log("Gagal simpan riwayat:", e);
    }
  };

  return (
    <ServiceContext.Provider value={{ riwayat, addRiwayat }}>
      {children}
    </ServiceContext.Provider>
  );
};
