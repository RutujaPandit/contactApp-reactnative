import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput,PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import contacts from 'react-native-contacts'

const AddContact = ({ navigation }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')


  const getPermission = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(res => {
      if (res == 'granted') {
        let newPerson = {

          familyName: name,
          givenName: name,

          emailAddresses: [
            {
              label: 'work',
              email: email,
            },
          ],
          
           phoneNumbers: [
            {
              label: 'mobile',
              number: number,
            },
          ],
        };

        contacts.addContact(newPerson);
        navigation.goBack()
      }
    });
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View
        style={{
          width: '100%',
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../images/back.png')}
            style={{ width: 30, height: 24, tintColor: '#000' }}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={require('../images/user.png')}
        style={{ width: 60, height: 60, marginTop: 50, alignSelf: 'center' }}
      />
      <TextInput
        placeholder="Enter Name"
        placeholderTextColor={'#000'}
        value={name}
        onChangeText={txt => setName(txt)}
        style={{
          width: '90%',
          height: 50,
          borderWidth: 3,
          borderRadius: 10,
          borderColor: 'skyblue',
          paddingLeft: 15,
          alignSelf: 'center',
          marginTop: 50,
          color: '#000'
        }}
      />
      <TextInput
        placeholder="Enter Email"
        placeholderTextColor={'#000'}
        value={email}
        onChangeText={txt => setEmail(txt)}
        style={{
          width: '90%',
          height: 50,
          borderWidth: 3,
          borderRadius: 10,
          borderColor: 'skyblue',
          paddingLeft: 15,
          alignSelf: 'center',
          marginTop: 30,
          color: '#000'
        }}
      />
      <TextInput
        placeholder="Enter Mobile"
        placeholderTextColor={'#000'}
        maxLength={10}
        keyboardType="number-pad"
        value={number}
        onChangeText={txt => setNumber(txt)}
        style={{
          width: '90%',
          height: 50,
          borderWidth: 3,
          borderRadius: 10,
          borderColor: 'skyblue',
          paddingLeft: 15,
          alignSelf: 'center',
          marginTop: 30,
          color: '#000'
        }}
      />

      <TouchableOpacity
        style={{
          backgroundColor: 'skyblue',
          borderRadius: 10,
          height: 50,
          width: '90%',
          marginTop: 50,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      onPress={() => {
        getPermission()
      }}
      >
        <Text style={{ color: '#000' }}>Save Contact</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddContact

const styles = StyleSheet.create({})