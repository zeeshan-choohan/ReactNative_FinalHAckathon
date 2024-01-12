import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import { RadioButton, TextInput, Text, Button } from 'react-native-paper'
import { MultiSelect } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage'
import ProgressBar from 'react-native-progress/Bar';
import { COLORS } from '../constants';

const data = [
  { label: 'Food', value: 'Food' },
  { label: 'Medical', value: 'Medical' },
  { label: 'Cloths', value: 'Cloths' },
  { label: 'Education', value: 'Education' },
  { label: 'Others', value: 'Others' },
];


const ReceiveDonation = () => {
  const [recName, setRecName] = useState('');
  const [recPhone, setRecPhone] = useState('');
  const [recCnic, setRecCnic] = useState('');
  const [recDescription, setRecDescription] = useState('');
  const [recChecked, setRecChecked] = useState('Male');
  const [selected, setSelected] = useState([]);
  const [errorFields, setErrorFields] = useState([]);
  const [file, setfile] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showprogress, setshowprogress] = useState(false)
  const [imageUrl, setImageUrl] = useState('');

/// Upload Image To Firebase 


const imageUpload = async (imageUri) => {
  const reference = storage().ref(`ReceiveDonnation/${generateUID()}.jpg`);

  try {
    const uploadTask = reference.putFile(imageUri);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Error uploading image: ', error);
      },
      async () => {
        try {
          const downloadURL = await reference.getDownloadURL();
          setImageUrl(downloadURL);
          setshowprogress(false);
          console.log('File available at', downloadURL);
        } catch (error) {
          console.error('Error getting download URL: ', error);
        }
      }
    );
  } catch (error) {
    console.error('Error uploading image: ', error);
  }
};

 ////  Take  Image from Gallery

 const openGallery = () => {

  const options = {
      mediaType: 'photo',  // You can use 'photo' or 'video'
      quality: 0.8,       // Image quality (0 to 1)
  };


  launchImageLibrary(options, (response) => {
      if (response.didCancel) {
          console.log('User cancelled the camera.');
      }
      else if (response.error) {
          console.log('Camera Error: ', response.error);
      }
      else {
          // Use the image from the camera here
          console.log('Image URI: ', response.assets[0].uri);
          setfile(response.assets[0].uri)
          setshowprogress(true)
          imageUpload(response.assets[0].uri)

      }

  })

}



  const generateUID = () => {
    // Generate a unique ID using timestamp
    return new Date().getTime().toString();
  };

  const handleValidation = () => {
    const errors = [];

    if (!recName.trim()) {
      errors.push('Name');
    }

    if (!recPhone.trim()) {
      errors.push('Phone No');
    }

    if (!recCnic.trim()) {
      errors.push('CNIC No');
    }

    if (selected.length === 0) {
      errors.push('Category');
    }

    setErrorFields(errors);
    return errors.length === 0;
  };

  const handleReceiveDonation = async () => {
    if (handleValidation()) {
      try {
        const uid = generateUID();
        await firestore().collection('DonationReceiver').doc(uid).set({
          name: recName,
          phone: recPhone,
          cnic: recCnic,
          category: selected,
          gender: recChecked,
          description: recDescription,
          imageUrl: imageUrl, // Store the image URL in Firestore
        });

        console.log('Donation received successfully');
        console.log('UID:', uid);

        setRecName('');
        setRecPhone('');
        setRecCnic('');
        setRecDescription('');
        setRecChecked('Male');
        setSelected([]);
        setfile(null);
        setUploadProgress(0);
        setshowprogress(false);
        setImageUrl('');

      } catch (error) {
        console.error('Error storing donation:', error);
      }
    } else {
      console.log('Validation failed. Please check the highlighted fields.');
    }
  };



  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ margin: 20 }}>
          <TextInput
            onChangeText={(e) => setRecName(e)}
            value={recName}
            mode="outlined"
            label="Name *"
            activeUnderlineColor="green"
            left={<TextInput.Icon icon="account-plus" color={COLORS.primary} />}
            style={[
              styles.textInput,
              errorFields.includes('Name') && styles.errorInput,
            ]}
          />
          <TextInput
            onChangeText={(e) => setRecPhone(e)}
            value={recPhone}
            mode="outlined"
            keyboardType="phone-pad"
            maxLength={11}
            activeUnderlineColor="green"
            style={[
              styles.textInput,
              errorFields.includes('Phone No') && styles.errorInput,
            ]}
            label="Phone No *"
            left={<TextInput.Icon icon="email" color={COLORS.primary} />}
          />
          <TextInput
            onChangeText={(e) => setRecCnic(e)}
            value={recCnic}
            mode="outlined"
            keyboardType="phone-pad"
            activeUnderlineColor="green"
            maxLength={13}
            style={[
              styles.textInput,
              errorFields.includes('CNIC No') && styles.errorInput,
            ]}
            label="CNIC No *"
            left={<TextInput.Icon icon="account" color={COLORS.primary} />}
          />
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Select"
            searchPlaceholder="Search..."
            value={selected}
            onChange={(item) => {
              setSelected(item);
            }}
            renderLeftIcon={() => (
              <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            )}
            selectedStyle={styles.selectedStyle}
          />
        </View>
        <Text style={{ marginTop: 30, marginHorizontal: 20, color: COLORS.primary }}>
          Select Gender
        </Text>
        <View style={{ margin: 20, marginBottom: 80 }}>
          <RadioButton.Group
            onValueChange={(value) => setRecChecked(value)}
            value={recChecked}
          >
            <RadioButton.Item label="Male" value="Male" />
            <RadioButton.Item label="Female" value="Female" />
          </RadioButton.Group>
          <TextInput
            onChangeText={(e) => setRecDescription(e)}
            value={recDescription}
            multiline={true}
            mode="outlined"
            style={[
              styles.textInput,
              errorFields.includes('Description') && styles.errorInput,
            ]}
            label="Description"
            left={<TextInput.Icon color={COLORS.primary} />}
          />

{file && (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: file }}
        style={{
          width: 200,
          height: 200,
          borderWidth: 2, 
          borderColor: '#7DCEA0', 
        }}
      />
    </View>
  )}

                  {
                    showprogress ?
                        <ProgressBar
                            progress={uploadProgress / 100}
                            width={330}
                            height={10}
                            color={'#7DCEA0'}
                            style={{ margin: 10 }}
                        />

                        :
                        null
                }

                <Button icon="camera" mode="contained" onPress={() => openGallery()}
                    style={{backgroundColor: COLORS.primary,
                        borderRadius: 5,
                        marginTop:10,
                        width: 100 + '%',
                        height:40,
                        alignItems: 'center',}} >Upload File</Button>

          <TouchableOpacity
            onPress={handleReceiveDonation}
            style={{
              backgroundColor: COLORS.primary,
              padding: 10,
              borderRadius: 5,
              margin: 10,
              alignItems: 'center',
              width: 100 + '%'
            }}
          >
            <Text style={{ color: 'white' }}>Receive Donation</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  textInput: {
    backgroundColor: 'white',
  },
  imageContainer: {
    marginVertical: 10,
    alignItems: 'center',
    borderColor: '#7DCEA0',
    borderWidth: 2,
    borderRadius: 8,
    overflow: 'hidden', 
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
});

export default ReceiveDonation;
