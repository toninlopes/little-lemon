import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Text, FlatList, ScrollView } from 'react-native';
import { LLBanner, LLHeader, LLInput, LLTitle } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { LLToggle } from '../components';
import { useCurrentUser, useDBMenuItems, MenuItem } from '../hooks';

const Home: React.FC<{}> = () => {
  const { navigate, addListener } = useNavigation();
  const { menuItems, categories, updateMenuItems, filter } = useDBMenuItems();
  const { firstName, lastName, image } = useCurrentUser();

  const [query, setQuery] = useState<string>('');
  const [selectedCategories, updateSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const listener = addListener('focus', () => {
      
    });

    if (!menuItems.length) {
      fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
        .then(async res => {
          const data = await res.json()
          const menuItems: MenuItem[] = data.menu.map((item: any, index: number) => ({
            id: index + 1,
            ...item,
          }));
          return menuItems
        })
        .then(menuItems => {
          updateMenuItems(menuItems);
        });
    }

    return () => {
      listener();
    }
  }, []);

  useEffect(() => {
    filter(selectedCategories, query);
  }, [selectedCategories, query]);

  return (
    <SafeAreaView
      style={[styles.container]}
      mode='padding'
      edges={['top']}
    >
      <StatusBar style="auto" />
      <LLHeader
        showGoBack={false}
        image={image}
        initials={`${firstName[0]}${lastName[0] || ''}`}
        onTapAvatar={() => navigate('Profile')}
      />
      <LLBanner searchValue={query} onSearchChange={setQuery} />
      {/* <View style={styles.banner}>
        <LLTitle style={styles.bannerHeader}>Little Lemon</LLTitle>
        <View style={styles.bannerInnerView}>
          <View style={styles.bannerInnerTextView}>
            <LLTitle style={styles.bannerSubHeader} subtitle>Chicago</LLTitle>
            <Text style={styles.bannerText}>We are a family owned Mediterranean restaurant, focused on tradicional recipes served with modern twist.</Text>
          </View>
          <Image style={styles.image} source={require('../assets/restaurant.jpeg')}/>
        </View>
        <LLInput placeholder='Search by dish name' value={query} onChangeText={setQuery}/>
      </View> */}
      <FlatList
        style={styles.body}
        data={menuItems}
        ListHeaderComponent={
          <>
            <LLTitle style={styles.listHeader}>ORDER FOR DELIVERY!</LLTitle>
            <ScrollView horizontal>
              {categories.map(category => {
                const indexOf = selectedCategories.findIndex(c => c === category)
                return (
                <LLToggle
                  key={category}
                  style={styles.toogle}
                  title={category}
                  isToggle={indexOf > -1}
                  onPress={() => {
                    if (indexOf > -1) {
                      const newSelectedCategories = selectedCategories;
                      newSelectedCategories.splice(indexOf, 1);
                      updateSelectedCategories([...newSelectedCategories]);
                      return;
                    }
                    const newSelectedCategories = [...selectedCategories, category];
                    updateSelectedCategories(newSelectedCategories);
                  }}
                />)})}
            </ScrollView>
          </>
        }
        renderItem={({item}) => (
          <View style={styles.viewItem}>
            <LLTitle>{item.name}</LLTitle>
            <View style={styles.nestedViewItem}>
              <View style={styles.textItemView}>
                <LLTitle subtitle numberOfLines={3}>{item.description}</LLTitle>
                <LLTitle style={styles.priceItem} subtitle>{`$${item.price.toFixed(2)}`}</LLTitle>
              </View>
              <Image
                style={styles.imageItem}
                source={{uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`}}
              />
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  body: {
    marginHorizontal: 20,
  },
  listHeader: {
    fontWeight: '600',
    marginBottom: 0,
  },
  toogle: {
    marginRight: 6,
  },
  viewItem: {
  },
  nestedViewItem: {
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  textItemView: {
    flex: 2,
    marginRight: 8,
  },
  priceItem: {
    fontWeight: '600',
  },
  imageItem: {
    flex: 1,
    height: 80,
    width: 80,
    resizeMode: 'contain',
  },
  separator: {
    marginTop: 6,
    height: 1,
    borderBottomWidth: 1,
    borderColor: 'lightgray'
  },
});

export default Home;