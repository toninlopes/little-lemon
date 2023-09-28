import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './screens/Home';
import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';
import SplashScreen from './screens/SplashScreen';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "Looks like you're passing an inline function for 'component' prop for the screen",
  "Key \"cancelled\" in the image picker result is deprecated and will be removed in SDK 48, use \"canceled\" instead",
]);

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [isOnboardingCompleted, setOnboardingStatus] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('USER')
      .then(json => setOnboardingStatus(json !== null))
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) {
    return <SplashScreen />
  }

  return (
    // <Onboarding />
    <NavigationContainer>
      <Stack.Navigator>
        {isOnboardingCompleted ? (
          <>
            <Stack.Screen
              name='Home'
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='Profile'
              options={{
                headerShown: false,
              }}
            >
              {props => <Profile {...props} onLogout={() => setOnboardingStatus(false)} />}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen
            name='Onboarding'
            options={{
              headerShown: false,
            }}
          >
            {props => <Onboarding {...props} onLogin={() => setOnboardingStatus(true)} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
