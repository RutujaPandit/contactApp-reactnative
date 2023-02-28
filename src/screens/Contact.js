import React, { useEffect, useState } from 'react'
import { View, Text, PermissionsAndroid, FlatList, Image, TouchableOpacity ,Linking} from 'react-native'
import contacts from 'react-native-contacts'
import {useIsFocused} from '@react-navigation/native';

const Contact = ({navigation}) => {

  const [data, setData] = useState([])
  const isFocused = useIsFocused();

  useEffect(() => {
    getPermission()
  }, [isFocused])


  const getPermission = async () => {

    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts',
        'message': 'This app would like to view your contacts.',
        'buttonPositive': 'Please accept bare mortal'
      }
    )
      .then(res => {
        if (res === 'granted') {
          console.log('Permission is ', res)
          contacts.getAll()
            .then((contacts) => {
              
              // work with contacts
              // console.log("contacts data ", contacts)
              setData(contacts)
            })
            .catch((e) => {
              console.log('Error is :' + e)
            })
        }
      })
  }

  // alert(data.length)


  return (
    <View style={{ backgroundColor: '#fff' }}>
      <Text style={{ color: 'pink', fontSize: 25, alignSelf:'center' ,fontWeight:'bold'}}>Contact App in React native</Text>
      <TouchableOpacity
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#858585',
        position: 'absolute',
        right: 20,
        bottom:-250 ,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress = { () => {
        navigation.navigate('AddContact');
      }}
      >
         <Image
          source={require('../images/plus.png')}
          style={{width: 24, height: 24}}
        />
      </TouchableOpacity>

      <FlatList data={data.slice(0,5)} renderItem={({ item }) => {

        return (
            
            <TouchableOpacity style={{
            flex: 1,
            alignItems: 'flex-start',
            width: '90%',
            marginTop:25,
            padding: 15,
            borderColor: '#000',
            borderWidth: 2,
            borderRadius: 10,
            alignSelf: 'center'
          }} 
          onPress = { () => {
            navigation.navigate('DeleteContact'
            , {
              data: item,
            });
           }}
          >

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../images/user.png')}
                style={{ width: 40, height: 40, marginLeft: 5 }}
              />
            </View>
            <View style={{ marginHorizontal: 55, marginVertical: -40 }}>
              <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>{item.givenName}</Text>
              <Text style={{ color: '#000', marginTop: 4 }}>
                {item.phoneNumbers[0]?.number}
              </Text>
            </View>
            <View style={{ flexDirection: 'row',justifyContent:'flex-end' ,alignSelf:'flex-end' }}>
              <TouchableOpacity
              
               onPress={() => {
                Linking.openURL(`tel:${item.phoneNumbers[0]?.number}`);
              }}
              >
                <Image
                  source={require('../images/call.png')}
                  style={{ width: 30, height: 30, tintColor: '#000', paddingTop: 0 }}
                />
              </TouchableOpacity>
            </View>
           
          </TouchableOpacity>

        )
      }}
      />

    </View>
  )
}

export default Contact;



