import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const UserProfile = ({ navigation, route }) => {
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        const userDoc = await firestore().collection('Users').doc(user.uid).get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          setUserData(userData);
        } else {
          console.log('User document not found in Firestore');
        }
      } else {
        console.log('No user is currently logged in');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          style={styles.userImg}
          source={{ uri: userData ? userData.userImg : 'https://cdn-icons-png.flaticon.com/512/219/219969.png' }}
        />
        <Text style={styles.userName}>
          {userData ? `${userData.fname} ${userData.lname}` : 'Dummy User'}
        </Text>
        <Text style={styles.email}>
          {userData ? userData.email : 'dummyuser@example.com'}
        </Text>
        <Text style={styles.aboutUser}>{userData ? userData.about : 'No details added.'}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
});
