// import React from 'react';
// import { View, TextInput, Button, Text } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { useForm, Controller } from 'react-hook-form';
// import { db } from './firebase';

// const CommonForm = ({ onSubmit, userType }) => {
//   const { control, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: {
//       name: '',
//       contact: '',
//       cnic: '',
//       gender: '',
//       city: '',
//       donationType: '', // <-- Unique name for the first Picker
//     },
//   });

//   const donationTypes = ['Food', 'Money', 'Medicine', 'Others'];
//   const AddFormData = async (data) => {
//     try {
//       const collectionName = userType === 'donor' ? 'donors' : 'acceptors';
      
//       await db.collection(collectionName).add({
//         ...data,
//         userType,
//         timestamp: new Date(),
//       });

//       onSubmit();
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   return (
//     <View>
//       {/* Donation Type Picker */}
//       <Controller
//         control={control}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <Picker
//             selectedValue={value}
//             onValueChange={(itemValue) => onChange(itemValue)}
//           >
//             <Picker.Item label="Select Donation Type" value="" />
//             {donationTypes.map((type) => (
//               <Picker.Item key={type} label={type} value={type} />
//             ))}
//           </Picker>
//         )}
//         name="donationType" // <-- Unique name for the first Picker
//       />
//       {errors.donationType && <Text>This field is required.</Text>}

//       {/* Other Fields (contact, cnic, gender, city) */}
//       {/* ... */}
      
//       {/* Another Donation Type Picker */}
//       <Controller
//         control={control}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <Picker
//             selectedValue={value}
//             onValueChange={(itemValue) => onChange(itemValue)}
//           >
//             <Picker.Item label="Select Donation Type" value="" />
//             {donationTypes.map((type) => (
//               <Picker.Item key={type} label={type} value={type} />
//             ))}
//           </Picker>
//         )}
//         name="anotherDonationType" // <-- Unique name for the second Picker
//       />
//       {errors.anotherDonationType && <Text>This field is required.</Text>}

//       <Button title="Submit" onPress={handleSubmit(AddFormData)} />
//     </View>
//   );
// };

// export default CommonForm;





import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import SendDonation from './SendDonation';
import ReceiveDonation from './ReceiveDonation';

const DonnationSender = () => (
  <SendDonation />
);

const DonnationReceiver = () => (
  <ReceiveDonation />
);

const DonnationForm = () => {
  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'first', title: 'Send Donation' },
    { key: 'second', title: 'Receive Donation' },
  ];

  const renderScene = SceneMap({
    first: DonnationSender,
    second: DonnationReceiver,
  });

  const renderTabBar = (props) => (
    <View style={styles.tabBar}>
      {routes.map((route, i) => (
        <TouchableOpacity
          key={route.key}
          style={[
            styles.tabItem,
            {
              backgroundColor: index === i ? '#7DCEA0' : '#FFFFFF',
            },
          ]}
          onPress={() => setIndex(i)}
        >
          <Text style={{ color: index === i ? '#FFFFFF' : '#7DCEA0' }}>{route.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={styles.container}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
  tabBar: {
    flexDirection: 'row',
    height: 48,
    backgroundColor: '#7DCEA0',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DonnationForm;
