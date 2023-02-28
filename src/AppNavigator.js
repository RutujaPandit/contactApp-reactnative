import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Contact from './screens/Contact';
import AddContact from './screens/AddContact';
import DeleteContact from './screens/DeleteContact';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
     <Stack.Screen name="Contact" component={Contact} options={{headerShown: false}}/>
      <Stack.Screen name="AddContact" component={AddContact} options={{headerShown: false}} />
      <Stack.Screen name="DeleteContact" component={DeleteContact} options={{headerShown: false}} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})