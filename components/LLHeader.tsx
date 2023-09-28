import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons'
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import LLAvatar from '../components/LLAvatar'
import { useNavigation } from '@react-navigation/native';

const AVATAR_SIZE = 80;

const LLHeader: React.FC<{
  image?: string;
  initials?: string;
  onTapAvatar?: () => void;
  hideProfile?: boolean
  showGoBack?: boolean;
}> = ({
  image,
  initials,
  onTapAvatar,
  hideProfile = false,
  showGoBack = true,
}) => {
  const { canGoBack, goBack } = useNavigation();
  return (
    <View style={[styles.header, hideProfile && { justifyContent: 'center' }]}>
      {showGoBack && canGoBack() ?
        <TouchableHighlight style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back-outline" size={28} color="#495E57" />
        </TouchableHighlight>
        :
        <View/>
      }
      <Image style={styles.image} source={require('../assets/little-lemon.png')}/>
      {!hideProfile && (
        <LLAvatar small image={image} initials={initials} onPress={onTapAvatar}/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 140,
    height: 40,
    resizeMode: 'contain',
  },
});

export default LLHeader;