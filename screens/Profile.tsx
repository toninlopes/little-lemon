import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LLAvatar, LLButton, LLHeader, LLInput, LLSwitcher, LLTitle } from '../components'
import { useCurrentUser } from '../hooks';
import * as ImagePicker from 'expo-image-picker';

const REGEX_FOR_PHONE = /^(\d{3})(\d{3})(\d{4})$/;

const AVATAR_SIZE = 80;

const Profile: React.FC<{
  onLogout: () => void,
}> = ({
  onLogout,
}) => {
  const insets = useSafeAreaInsets();
  const {
    forceUpdate,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    image,
    setImage,
    phone,
    setPhone,
    orderNotification,
    toggleOrderNotification,
    passwordNotification,
    togglePasswordNotification,
    offersNotification,
    toggleOffersNotification,
    newsNotification,
    toggleNewsNotification,
    saveUser,
    deleteUser,
  } = useCurrentUser();
  
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const formatPhone = (phoneNumberString: string) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    
    var match = cleaned.match(REGEX_FOR_PHONE);
    if (match) {
      return '(' + match[1] + ')' + match[2] + '-' + match[3];
    }
    return phoneNumberString;
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
      behavior={Platform.select({ios: 'padding'})}
      >
      <StatusBar style="auto" />
      <LLHeader image={image} initials={`${firstName[0]}${lastName[0] || ''}`} />
      <ScrollView style={styles.body}>
        <LLTitle>Personal Information</LLTitle>
        <LLTitle subtitle>Avatar</LLTitle>
        <View style={styles.personalInfo}>
          <LLAvatar image={image} initials={`${firstName[0]}${lastName[0] || ''}`}/>
          <LLButton title='Change' onPress={pickImage} />
          <LLButton secondary title='Remove' onPress={() => setImage('')} />
        </View>
        <LLInput
          placeholder='First Name'
          keyboardType='default'
          value={firstName}
          onChangeText={setFirstName}
        />
        <LLInput
          placeholder='Last Name'
          keyboardType='default'
          value={lastName}
          onChangeText={setLastName}
        />
        <LLInput
          placeholder='Email'
          autoCapitalize='none'
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail}
        />
        <LLInput
          placeholder='Phone Number'
          autoCapitalize='none'
          keyboardType='phone-pad'
          value={phone}
          onChangeText={(text) => setPhone(formatPhone(text))}
        />

        <LLTitle>Email Notification</LLTitle>
        {[
          {
            label: 'Order statues',
            val: orderNotification,
            toggle: toggleOrderNotification
          },
          {
            label: 'Password changes',
            val: passwordNotification,
            toggle: togglePasswordNotification,
          },
          {
            label: 'Special offers',
            val: offersNotification,
            toggle: toggleOffersNotification,
          },
          {
            label: 'Newsletter',
            val: newsNotification,
            toggle: toggleNewsNotification,
          }
        ].map( (switcher, index) => (
          <LLSwitcher
            key={index}
            title={switcher.label}
            value={switcher.val}
            onValueChange={switcher.toggle}
          />
        ))}

        <LLButton
          warning
          title='Log out'
          onPress={async () => {
            await deleteUser();
            onLogout();
          }}
        />

        <View style={styles.bottomButtons}>
          <LLButton secondary title='Discard Changes' onPress={forceUpdate} />
          <LLButton
            title='Save Changes'
            onPress={async () => {
              await saveUser({
                image,
                firstName,
                lastName,
                email,
                phone,
                orderNotification,
                passwordNotification,
                offersNotification,
                newsNotification,
              });
            }}
          />
        </View>
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    padding: 20, 
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    borderRadius: (AVATAR_SIZE / 2) / 2,
    backgroundColor: 'lightgray',
    width: AVATAR_SIZE / 2,
    height: AVATAR_SIZE / 2,
  },
  image: {
    width: 140,
    height: 40,
    resizeMode: 'contain',
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 20,
  },
  personalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: 'lightgray',
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
  smallAvatar: {
    borderRadius: (AVATAR_SIZE * 0.65) / 2,
    backgroundColor: 'lightgray',
    width: (AVATAR_SIZE * 0.65),
    height: (AVATAR_SIZE * 0.65),
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
});

export default Profile;