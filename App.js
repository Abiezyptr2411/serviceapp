import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ServiceProvider } from './ServiceContext';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import KatalogScreen from './KatalogScreen';
import VoucherScreen from './VoucherScreen';
import GamesScreen from './GamesScreen';
import BeritaScreen from './BeritaScreen';
import AktivitasScreen from './AktivitasScreen';
import ServiceScreen from './ServiceScreen';
import FormulasiScreen from './FormulasiScreen';
import ProfilScreen from './ProfilScreen';
import BookingServiceScreen from './BookingServiceScreen';
import RiwayatServiceScreen from './RiwayatServiceScreen';
import LokasiBengkelScreen from './LokasiBengkelScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ServiceProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/* Auth */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />

          {/* Main */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Katalog" component={KatalogScreen} />
          <Stack.Screen name="Voucher" component={VoucherScreen} />
          <Stack.Screen name="Games" component={GamesScreen} />
          <Stack.Screen name="Berita" component={BeritaScreen} />
          <Stack.Screen name="Aktivitas" component={AktivitasScreen} />
          <Stack.Screen name="Service" component={ServiceScreen} />
          <Stack.Screen name="Formulasi" component={FormulasiScreen} />
          <Stack.Screen name="Profil" component={ProfilScreen} />

          {/* 🔹 Service Sub Pages */}
          <Stack.Screen name="BookingService" component={BookingServiceScreen} />
          <Stack.Screen name="RiwayatService" component={RiwayatServiceScreen} />
          <Stack.Screen name="LokasiBengkel" component={LokasiBengkelScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ServiceProvider>
  );
}
