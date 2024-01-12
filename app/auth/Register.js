import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextInput, Text, RadioButton } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';
import { COLORS, FONTS } from '../constants';
import Button from '../components/Button';
import PageContainer from '../components/PageContainer';
import { SafeAreaView } from 'react-native-safe-area-context';

// Function to handle login navigation after successful authentication
const handleLogin = (navigation) => {
    // Check if the user is authenticated
    const user = auth().currentUser;
    if (user) {
        // If authenticated, navigate to the 'Login' screen
        navigation.replace('Login');
    } else {
        // If not authenticated, show an error or handle accordingly
        console.error("User is not authenticated");
    }
};

const Register = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showpassword, setshowpassword] = useState(true);
    const [checked, setChecked] = useState('Male');

    let Login = () => {
        navigation.replace('Login')
    }

    const setFirestoredb = async (uid, userEmail) => {
        try {
            const userSnapshot = await firestore().collection('AllUsers').where('email', '==', userEmail).get();
            if (userSnapshot.empty) {
                const userDocRef = firestore().collection('AllUsers').doc(uid);
    
                await userDocRef.set({
                    name,
                    email: userEmail,
                    password,
                    checked,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                });
                console.log(name)
                console.log(email)
                console.log(password)
                console.log(checked)
    
                console.log("User Added Successfully");
    
                Snackbar.show({
                    text: 'User registered successfully!',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'green',
                    textColor: 'white',
                });
            } else {
                Snackbar.show({
                    text: 'User with this email already exists!',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'grey',
                    textColor: 'red',
                });
            }
        } catch (error) {
            console.error("Error When Adding Data to Firestore:", error);
            Snackbar.show({
                text: `${error}`,
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'grey',
                textColor: 'red',
            });
        }
    };


    const createEmailPassword = async () => {
        if (name === "" || email === "" || password === "") {
            Snackbar.show({
                text: 'Plz Enter All Fields',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: "white",
                textColor: "red",
            });
        } else if (/\S+@\S+\.\S+/.test(email) === false) {
            Snackbar.show({
                text: 'Plz Enter Valid Email',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: "grey",
                textColor: "red",
            });
        } else if (/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password) === false) {
            Snackbar.show({
                text: 'Plz enter a valid password',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: "grey",
                textColor: "red",
            });
        } else {
            try {
                // Handle Firebase authentication (email/password)
                const userCredential = await auth().createUserWithEmailAndPassword(email, password);
                // After successful authentication, proceed with Firestore data
                await setFirestoredb(userCredential.user.uid, userCredential.user.email);
            } catch (error) {
                console.error("Error during email/password registration:", error);
            }
        }
    };

    const SubmitForm = async () => {
        if (name === "" || email === "" || password === "") {
            createEmailPassword();
        } else {
            try {
                // Wait for Firestore and Firebase authentication to complete
                const userCredential = await auth().createUserWithEmailAndPassword(email, password);
                // After successful authentication, navigate to Login
                handleLogin(navigation);
            } catch (error) {
                console.error("Error during registration:", error);
            }
        }
    };



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View >
                    <View style={{ margin: 20 }}>
                        <TextInput
                            onChangeText={(e) => setName(e)}
                            value={name}
                            mode="outlined"
                            label="Name"
                            left={<TextInput.Icon icon="account" color={"#7DCEA0"} />}
                            activeUnderlineColor="green"
                        />
                        <TextInput

                            onChangeText={(e) => setEmail(e)}
                            value={email}
                            mode="outlined"
                            style={{ backgroundColor: "white", color: "blue" }}
                            label="Email"
                            left={<TextInput.Icon icon="email" color={"#7DCEA0"} />}
                            activeUnderlineColor="green"
                        />

                        <TextInput
                            value={password}
                            onChangeText={(e) => setPassword(e)}
                            mode="outlined"
                            style={{ backgroundColor: "white" }}
                            label="Password"
                            secureTextEntry={showpassword}
                            activeUnderlineColor="green"
                            left={<TextInput.Icon icon="form-textbox-password" color={"#7DCEA0"} />}
                            right={
                                showpassword ?
                                    <TextInput.Icon icon="eye" color={"#7DCEA0"} onPress={() => setshowpassword(false)} />
                                    :
                                    <TextInput.Icon icon="eye-off" color={"#7DCEA0"} onPress={() => setshowpassword(true)} />

                            } />

                    </View>


                    <Text style={{ marginTop: 30, marginHorizontal: 20, color: COLORS.primary }}>Select Gender</Text>
                    <RadioButton.Group onValueChange={value => setChecked(value)} value={checked}>
                        <RadioButton.Item label="Male" value="Male" />
                        <RadioButton.Item label="Female" value="Female" />
                    </RadioButton.Group>
                    <Button
                        title="REGISTER"
                        onPress={() => SubmitForm()}
                        filled
                        style={{
                            margin: 10,
                            marginHorizontal: 30,
                            width: '80%',
                        }} />

                    
                    <View style={{
                        margin: 10,
                        marginHorizontal: 30
                    }}>

                        <Text
                            style={{
                                ...FONTS.body3,
                                color: COLORS.primary,
                            }} >
                            Already have an account ?{' '}
                            <TouchableOpacity
                                onPress={() => Login()}>
                                <Text
                                    style={{
                                        ...FONTS.body3,
                                        color: COLORS.primary,
                                    }}
                                >
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </Text>
                    </View>

                </View>
            </PageContainer>
        </SafeAreaView>

    );
};

export default Register;
