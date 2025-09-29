import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const courses = ['Starters', 'Mains', 'Dessert'];

export default function ManageMenuScreen({ menuItems, setMenuItems }) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(courses[0]);
  const [price, setPrice] = useState('');

  const addDish = () => {
    if (dishName && description && price) {
      const newDish = {
        id: Date.now().toString(),
        name: dishName,
        description,
        course,
        price: parseFloat(price),
      };
      setMenuItems([...menuItems, newDish]);
      setDishName('');
      setDescription('');
      setPrice('');
    }
  };

  const removeDish = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Dish</Text>

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <RNPickerSelect
        onValueChange={(value) => setCourse(value)}
        items={courses.map((c) => ({ label: c, value: c }))}
        value={course}
        style={pickerSelectStyles}
      />
      <TextInput
        style={styles.input}
        placeholder="Price (Rands)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Button title="Add Dish" onPress={addDish} />

      <Text style={styles.sectionTitle}>Current Menu Items</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dishName}>{item.name} - R{item.price.toFixed(2)}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.course}>{item.course}</Text>
            <TouchableOpacity onPress={() => removeDish(item.id)}>
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 20, backgroundColor: '#F5F5F5', flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#333333' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5, backgroundColor: '#fff', color: '#333333' },
  sectionTitle: { fontSize: 18, marginTop: 20, fontWeight: 'bold', color: '#333333' },
  menuItem: { marginTop: 10, padding: 10, backgroundColor: '#fff', borderRadius: 5 },
  dishName: { fontWeight: 'bold', fontSize: 16, color: '#333333' },
  course: { fontStyle: 'italic', color: '#666666' },
  removeButton: { color: '#D68B4A', marginTop: 5, fontWeight: 'bold' },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#333333',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#333333',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
};