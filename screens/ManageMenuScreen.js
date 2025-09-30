import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet,Animated } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const courses = ['Starters', 'Mains', 'Dessert'];

export default function ManageMenuScreen({ menuItems, setMenuItems }) {
const [dishName, setDishName] = useState('');
const [description, setDescription] = useState('');
const [course, setCourse] = useState('');
const [price, setPrice] = useState('');
const [feedbackAnim] = useState(new Animated.Value(-50));
const [feedbackVisible, setFeedbackVisible] = useState(false);

  const addDish = () => {
  if (dishName && description && course && price) {
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
    setCourse('');
    setPrice('');

    // Show feedback animation
    setFeedbackVisible(true);
    Animated.timing(feedbackAnim, {
      toValue: 20, // Slide down into view
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(feedbackAnim, {
          toValue: -50, // Slide back up
          duration: 300,
          useNativeDriver: false,
        }).start(() => setFeedbackVisible(false));
      }, 2000); // Show for 2 seconds
    });
  }
};

  const removeDish = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Dish Name */}
      {feedbackVisible && (
  <Animated.View style={[styles.feedbackBox, { top: feedbackAnim }]}>
    <Text style={styles.feedbackText}>Dish added!</Text>
  </Animated.View>
)}
      <View style={styles.textbox}>
        <Text style={styles.label}>Dish Name</Text>
        <TextInput
          style={styles.textboxInput}
          value={dishName}
          onChangeText={setDishName}
          placeholder="Enter dish name"
        />
      </View>

      {/* Description */}
      <View style={styles.textarea}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textareaInput}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          multiline
        />
      </View>

      {/* Course Label */}
      <Text style={styles.courseLabel}>Course</Text>

      {/* Course Dropdown */}
      <View style={styles.dropdown}>
        <RNPickerSelect
          onValueChange={(value) => setCourse(value)}
          items={courses.map((c) => ({ label: c, value: c }))}
          value={course}
          style={{
            inputIOS: styles.dropdownInput,
            inputAndroid: styles.dropdownInput,
            placeholder: {
              color: '#171A1FFF',
              fontSize: 14,
              fontFamily: 'Open Sans',
            },
            viewContainer: {
              backgroundColor: '#DEE1E6FF',
              borderRadius: 6,
              borderWidth: 1,
              borderColor: '#DEE1E6FF',
              paddingLeft: 12,
              paddingRight: 34,
              height: 40,
              justifyContent: 'center',
            },
          }}
          useNativeAndroidPickerStyle={false}
          placeholder={{ label: 'Select course', value: null }}
        />
      </View>

      {/* Price Label */}
      <Text style={styles.priceLabel}>Price (Rands)</Text>

      {/* Price Input */}
      <View style={styles.priceBox}>
        <TextInput
          style={styles.priceInput}
          value={price}
          onChangeText={setPrice}
          placeholder="Enter price"
          keyboardType="numeric"
        />
      </View>

      {/* Add Dish Button */}
      <TouchableOpacity style={styles.addDishButton} onPress={addDish}>
        <Text style={styles.buttonText}>Add Dish</Text>
      </TouchableOpacity>

      {/* Existing Dishes */}
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
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 16 },
  label: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '500',
    marginBottom: 4,
    color: '#171A1FFF',
  },
  textbox: {
    position: 'absolute',
    top: 60,
    left: 16,
    opacity: 1,
  },
  textboxInput: {
    width: 310,
    height: 47,
    paddingLeft: 12,
    paddingRight: 12,
    fontFamily: 'Open Sans',
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '400',
    backgroundColor: '#DEE1E6FF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DEE1E6FF',
    color: '#565D6DFF',
  },
  textarea: {
    position: 'absolute',
    top: 142,
    left: 16,
    opacity: 1,
  },
  textareaInput: {
    width: 310,
    height: 74,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 12,
    paddingRight: 12,
    fontFamily: 'Open Sans',
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '400',
    color: '#565D6DFF',
    backgroundColor: '#DEE1E6FF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DEE1E6FF',
    textAlignVertical: 'top',
  },
  courseLabel: {
    position: 'absolute',
    top: 264,
    left: 16,
    fontFamily: 'Open Sans',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: '#171A1FFF',
  },
  dropdown: {
    position: 'absolute',
    top: 290,
    left: 16,
    opacity: 1,
  },
  dropdownInput: {
    fontFamily: 'Open Sans',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    color: '#171A1FFF',
  },
  priceLabel: {
    position: 'absolute',
    top: 346,
    left: 16,
    fontFamily: 'Open Sans',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: '#171A1FFF',
  },
  priceBox: {
    position: 'absolute',
    top: 372,
    left: 16,
    opacity: 1,
  },
  priceInput: {
    width: 310,
    height: 47
    
    ,
    paddingLeft: 12,
    paddingRight: 12,
    fontFamily: 'Open Sans',
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '400',
    backgroundColor: '#DEE1E6FF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DEE1E6FF',
    color: '#565D6DFF',
  },
  addDishButton: {
    position: 'absolute',
    top: 436,
    left: 16,
    width: 148,
    height: 40,
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
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
    color: '#FFFFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 500,
    marginBottom: 10,
    color: '#333333',
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
  removeButton: {
    color: '#B86B00FF',
    marginTop: 5,
    fontWeight: 'bold',
    fontFamily: 'Open Sans',
  },

 feedbackBox: {
    position: 'absolute',
    left: 16,
    right: 16,
    backgroundColor: '#B86B00FF',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    zIndex: 10,
  },
  feedbackText: {
    color: '#FFFFFF',
    fontFamily: 'Open Sans',
    fontSize: 14,
    fontWeight: '500',
  },
});

