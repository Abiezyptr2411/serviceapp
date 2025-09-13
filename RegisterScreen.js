import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

const { height } = Dimensions.get("window");

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!username || !email || !password) {
      Alert.alert("Validasi", "Username & Password wajib diisi");
      return;
    }

  setLoading(true);
    try {
      const res = await axios.post("http://192.168.0.205:3001/register", {
        username,
        email,
        password,
        role,
      });
      if (res.data.status) {
        Alert.alert("Success", res.data.message);
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("USER");
        // Navigate to Login after success
        setTimeout(() => {
          navigation.replace('Login');
        }, 1000);
      } else {
        Alert.alert("Failed", res.data.message);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        Alert.alert("Error", err.response.data.message);
      } else {
        Alert.alert("Error", "Cannot connect to server");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#e53935", "#ff1744"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerText}>Registrasi User</Text>
        <Text style={styles.subHeader}>
          Buat akun Anda untuk login & booking service
        </Text>
      </LinearGradient>

      {/* Card Form */}
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="👤 Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="📧 Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="🔑 Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="⚡ Role (default USER)"
          value={role}
          onChangeText={setRole}
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Loading..." : "Register"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: height * 0.3,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    elevation: 6,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subHeader: {
    color: "#fce4ec",
    fontSize: 14,
    textAlign: "center",
  },
  card: {
    marginTop: -40,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 15,
    color: "#333",
  },
  button: {
    backgroundColor: "#e53935",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
