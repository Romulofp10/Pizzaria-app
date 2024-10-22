import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SingIn from './src/pages/SignIn';
import Routes from './src/routes';
import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
      <StatusBar backgroundColor='#1d1d2e'  translucent={false} />
      <Routes/>
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
