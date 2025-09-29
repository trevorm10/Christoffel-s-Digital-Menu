import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation, menuItems }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Christoffel's Digital Menu</Text>
      <Text style={styles.subtitle}>Menu Overview</Text>
      <Text style={styles.total}>Total Dishes: {menuItems.length}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Add Menu Items" onPress={() => navigation.navigate('Manage Menu')} />
      </View>

      <Text style={styles.sectionTitle}>Prepared Menu</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dishName}>{item.name} - R{item.price.toFixed(2)}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.course}>{item.course}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 20, backgroundColor: '#F5F5F5', flex: 1 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#333333' },
  subtitle: { fontSize: 18, marginBottom: 5, textAlign: 'center', color: '#333333' },
  total: { fontSize: 16, marginBottom: 20, textAlign: 'center', color: '#333333' },
  buttonContainer: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333333' },
  menuItem: { marginBottom: 15, padding: 10, backgroundColor: '#fff', borderRadius: 5 },
  dishName: { fontWeight: 'bold', fontSize: 16, color: '#333333' },
  course: { fontStyle: 'italic', color: '#666666' },
});
