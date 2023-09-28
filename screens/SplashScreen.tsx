import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image style={styles.image} source={require('../assets/little-lemon.png')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
  },
});
