import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

const CategoryList = ({ setSelectedCategory }) => {
  const categoryList = [
    {
      id: 1,
      name: 'Gas Station',
      value: 'gas_station',
      icon: require('./../../../assets/gas.png')
    },
    {
      id: 2,
      name: 'Restaurants',
      value: 'restaurant',
      icon: require('./../../../assets/food.png')
    },
    {
      id: 3,
      name: 'Cafe',
      value: 'cafe',
      icon: require('./../../../assets/cafe.png')
    },
    {
      id: 4,
      name: 'Market',
      value: 'supermarket',
      icon: require('./../../../assets/market.png')
    },
    {
      id: 5,
      name: 'Shopping Mall',
      value: 'shopping_mall',
      icon: require('./../../../assets/shopping.png')
    }
  ];

  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ fontSize: 20 }}>Kategori Seçin</Text>

      <FlatList
        data={categoryList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 5 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedCategory(item.value)}>
            <CategoryItem category={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const CategoryItem = ({ category }) => (
  <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
    <Image source={category.icon} style={{ width: 50, height: 50 }} />
    <Text style={{ textAlign: 'center', marginTop: 5 }}>{category.name}</Text>
  </View>
);

export default CategoryList;
