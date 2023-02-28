import { View, Text, TouchableOpacity, Image, PermissionsAndroid, Linking} from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import contacts from 'react-native-contacts'

const DeleteContact = ({ navigation }) => {

    const route = useRoute();


    const getPermission = () => {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      }).then(res => {
        if (res == 'granted') {
          contacts.deleteContact({recordID: route.params.data.recordID}).then(recordId => {
            navigation.goBack()
          })
        
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
            <Text style={{ color: '#000', alignSelf: 'center', marginTop: 20 ,fontSize:20}}>
                {route.params.data.displayName}
            </Text>
            <View
        style={{
          flex:1,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          height: 60,
          marginTop: 10,
        }}>
        <Text
          style={{
            color: '#000',
            alignSelf: 'center',
            marginBottom: 400,
            marginLeft: 10,
            fontSize:25,
            borderColor:'#000',
            borderWidth:2,
            padding:20,
            borderRadius:15
          }}>
          {route.params.data.phoneNumbers[0]?.number}

          <TouchableOpacity 
          onPress={() => {
            Linking.openURL(`tel:${route.params.data.phoneNumbers[0]?.number}`);
          }}
          >
            <Image
              source={require('../images/call.png')}
              style={{width: 30, height: 30, tintColor: '#000',marginHorizontal:25}}
            />
          </TouchableOpacity>
        </Text>
        
        <TouchableOpacity
        style={{
          backgroundColor: 'skyblue',
          borderRadius: 10,
          height: 50,
          width: '90%',
          
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress = { () => {
          getPermission();
        }}
        >
        <Text style={{color: '#000'}}>Delete</Text>
      </TouchableOpacity>
            </View>
        </View>
    )
}

export default DeleteContact