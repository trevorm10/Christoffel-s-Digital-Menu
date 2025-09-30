import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation, menuItems }) {
  // Calculate average price per course
  const coursePrices = { Starters: [], Mains: [], Dessert: [] };
  menuItems.forEach(item => {
    if (coursePrices[item.course]) {
      coursePrices[item.course].push(item.price);
    }
  });

  const average = (arr) => arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2) : '0.00';

  return (
    <View style={styles.container}>
      {/* Menu Overview Section */}
      <View style={styles.menuOverviewBox}>
        <Text style={styles.menuOverviewTitle}>Menu Overview</Text>
        <Text style={styles.totalDishes}>Total Dishes: {menuItems.length}</Text>

        <View style={styles.courseStats}>
          <Text style={styles.courseHeader}>Average Price by Course</Text>
          <Text style={styles.courseItem}>Starters: <Text style={styles.price}>R{average(coursePrices.Starters)}</Text></Text>
          <Text style={styles.courseItem}>Mains: <Text style={styles.price}>R{average(coursePrices.Mains)}</Text></Text>
          <Text style={styles.courseItem}>Desserts: <Text style={styles.price}>R{average(coursePrices.Dessert)}</Text></Text>
        </View>
      </View>

      {/* Add Menu Items Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Manage Menu')}>
        <Text style={styles.buttonText}>Add Menu Items</Text>
      </TouchableOpacity>

      {/* Full Menu */}
      <Text style={styles.sectionTitle}>Chefs Prepared Menu</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dishName}>{item.name} - <Text style={styles.price}>R{item.price.toFixed(2)}</Text></Text>
            <Text>{item.description}</Text>
            <Text style={styles.course}>{item.course}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#F5F5F5', flex: 1 },
  menuOverviewBox: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 358,
    height: 237,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#171a1f',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 24,
  },
  menuOverviewTitle: {
    position: 'absolute',
    top: 10,
    left: 24,
    fontFamily: 'Open Sans',
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '600',
    color: '#171A1FFF',
  },
  totalDishes: {
    position: 'absolute',
    top: 62,
    left: 24,
    fontFamily: 'Open Sans',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: '#565D6DFF',
  },
  courseStats: {
    position: 'absolute',
    top: 100,
    left: 24,
  },
  courseHeader: {
    fontFamily: 'Open Sans',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#565D6DFF',
    marginBottom: 10,
  },
  courseItem: {
    fontFamily: 'Open Sans',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: '#171A1FFF',
    marginBottom: 8,
  },
  price: {
    color: '#B86B00FF',
    fontWeight: '600',
  },
  addButton: {
    position: 'absolute',
    top: 269,
    left: 16,
    width: 358,
    height: 48,
    paddingHorizontal: 12,
    backgroundColor: '#B86B00FF',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#171a1f',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '500',
    color: '#FFFFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 340,
    marginBottom: 10,
    color: '#171A1FFF',
    fontFamily: 'Open Sans',
  },
  menuItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  dishName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333333',
    fontFamily: 'Open Sans',
  },
  course: {
    fontStyle: 'italic',
    color: '#666666',
    fontFamily: 'Open Sans',
  },
});
