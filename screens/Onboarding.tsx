import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LLTitle, LLInput, LLButton, LLHeader, LLBanner } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';

const REGEX_FOR_TEXT = /^[a-zA-Z]*$/;
const REGEX_FOR_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Onboarding: React.FC<{
  onLogin: () => void,
}> = ({
  onLogin
}) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    setCanProceed(REGEX_FOR_TEXT.test(firstName) && REGEX_FOR_EMAIL.test(email));
  }, [firstName, email]);

  return (
    <SafeAreaView
      style={styles.container}
      mode='padding'
      edges={['top']}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ios: 'padding'})}>
        <StatusBar style="auto" />
        <LLHeader
          showGoBack={false}
          hideProfile
        />
        <LLBanner hideSearch/>
        <View style={styles.body}>
          <LLTitle style={styles.text}>Let us get to know you</LLTitle>
          <LLInput
            placeholder='First Name'
            keyboardType='default'
            value={firstName}
            onChangeText={setFirstName}
          />
          <LLInput
            placeholder='Email'
            autoCapitalize='none'
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.bottom}>
          <LLButton
            style={[!canProceed && { opacity: 0.5 }]}
            onPress={async () => {
              await AsyncStorage.setItem('USER', JSON.stringify({
                firstName,
                email,
              }));
              onLogin();
            }}
            disabled={!canProceed}
            title='Next'
          />
        </View>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  body: {
    flex: 3,
    // backgroundColor: 'gray',
    padding: 20,
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
  },
  text: {
    flex: 1,
    paddingTop: 32,
  },
});

export default Onboarding;