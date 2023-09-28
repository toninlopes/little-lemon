import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';
import LLTitle from './LLTitle';
import LLInput from './LLInput';

const LLBanner: React.FC<{
  hideSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (text: string) => void;
}> = ({
  hideSearch = false,
  searchValue,
  onSearchChange,
}) => {
  return (
    <View style={styles.banner}>
        <LLTitle style={styles.bannerHeader}>Little Lemon</LLTitle>
        <View style={styles.bannerInnerView}>
          <View style={styles.bannerInnerTextView}>
            <LLTitle style={styles.bannerSubHeader} subtitle>Chicago</LLTitle>
            <Text style={styles.bannerText}>We are a family owned Mediterranean restaurant, focused on tradicional recipes served with modern twist.</Text>
          </View>
          <Image style={styles.image} source={require('../assets/restaurant.jpeg')}/>
        </View>
        {!hideSearch && <LLInput placeholder='Search by dish name' value={searchValue} onChangeText={onSearchChange}/>}
      </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#495E57',
    paddingHorizontal: 20,
    // paddingBottom: 20,
  },
  bannerHeader: {
    color: '#F4CE15',
    fontSize: 32,
  },
  bannerInnerTextView: {
    flex: 2,
  },
  bannerSubHeader: {
    color: '#fff',
    fontSize: 22,
  },
  bannerText: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 12,
  },
  bannerInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 20,
  },
});

export default LLBanner;