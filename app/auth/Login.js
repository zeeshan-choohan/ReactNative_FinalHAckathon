import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import { COLORS, FONTS } from '../constants'
import Button from '../components/Button'

const Login = ({ navigation }) => {
    const [showpassword, setshowpassword] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    let AppStack = () => {
        navigation.replace('AppStack')
    }


    let AdminStack = () => {
        navigation.replace('AdminStack')
    }

    let SignUp = () => {
        navigation.replace('Register')
    }

    const GoogleSubmitForm = async () => {
        try {
            const userInfo = await signInWithGoogle();
            if (userInfo.email === 'admin@admingmail.com' && password === 'admin123') {
                adminLogin(userInfo);
            } else {
                userLogin(userInfo);
            }
        } catch (error) {
            Snackbar.show({
                text: 'Error during Google sign-in. Please try again.',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'grey',
                textColor: 'red',
            });
            console.log(error);
        }
    };






    // Store user data in Firestore
    const storeUserData = async (userInfo) => {
        try {
            const userCollection = userInfo.isAdmin ? 'Admin' : 'AllUsers';
            // Check if the user already exists in Firestore
            const userSnapshot = await firestore().collection(userCollection).doc(userInfo.id).get();

            if (!userSnapshot.exists) {
                // User does not exist, proceed to add user
                await firestore().collection(userCollection).doc(userInfo.id).set({
                    name: userInfo.givenName + ' ' + userInfo.familyName,
                    email: userInfo.email,
                    id: userInfo.id,
                    photo: userInfo.photo,
                });

                console.log(`User data added to Firestore - ${userCollection}`);
            } else {
                console.log(`User data already exists in Firestore - ${userCollection}`);
            }
        } catch (error) {
            console.error(`Error when adding user data to Firestore: ${error}`);
        }
    };

    // Google SignIn   //

    async function signInWithGoogle() {
        try {
            const userInfo = await googleSigninFunc();

            // Store user data in Firestore
            if (userInfo) {
                await storeUserData(userInfo);
            }

            return userInfo;
        } catch (error) {
            console.log(error);
        }
    }



    // Regular User Login
    const userLogin = async (userInfo) => {
        try {
            // Check if the user exists in Firestore
            const userSnapshot = await firestore().collection('AllUsers').doc(userInfo.id).get();

            if (userSnapshot.exists) {
                // User exists, proceed to AppStack
                AppStack();
                Snackbar.show({
                    text: 'User logged in successfully!',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'green',
                    textColor: 'white',
                });
            } else {
                // User does not exist
                Snackbar.show({
                    text: 'User not found. Please register first.',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'grey',
                    textColor: 'red',
                });
            }
        } catch (error) {
            console.error('Error checking user in Firestore:', error);
        }
    };

    // Admin Login
    const adminLogin = (userInfo) => {
        // Admin login logic (navigate to AdminStack, show Snackbar)
        AdminStack();
        Snackbar.show({
            text: 'Admin logged in successfully!',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: 'green',
            textColor: 'white',
        });
    };


    // Google SignIn Configuration
    const googleSigninFunc = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            GoogleSignin.configure({
                webClientId: '916307492086-k0s6608r0of6dcsdkn194qi9qra03ppu.apps.googleusercontent.com',
                offlineAccess: true,
                hostedDomain: '',
                forceCodeForRefreshToken: true,
                accountName: '',
            });

            const { user, idToken } = await GoogleSignin.signIn();


            const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredentials);

            return { ...user, isAdmin: false }; // Assume all Google sign-ins are regular users
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    // Submi Form

    const SubmitForm = async () => {
        if (email === '' || password === '') {
            Snackbar.show({
                text: 'Please enter both email and password',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'grey',
                textColor: 'red',
            });
        } else {
            try {
                // Check if the user exists in Firestore
                const userSnapshot = await firestore().collection('AllUsers').doc(email).get();

                if (userSnapshot.exists) {
                    // User exists, check for admin credentials
                    if (email === 'admin@admingmail.com' && password === 'admin123') {
                        adminLogin({ email, password }); // Corrected line
                    } else {
                        userLogin({ email, password });
                    }
                } else {
                    // User does not exist
                    Snackbar.show({
                        text: 'User not found. Please register first.',
                        duration: Snackbar.LENGTH_SHORT,
                        backgroundColor: 'grey',
                        textColor: 'red',
                    });
                }
            } catch (error) {
                console.error('Authentication error:', error);
                Snackbar.show({
                    text: 'Authentication failed. Please try again.',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'grey',
                    textColor: 'red',
                });
            }
        }
    };

    //// Google GignOut Component/////

    // const googleSignout = async () => {
    //     try {
    //         await GoogleSignin.signOut();

    //     } catch (error) {
    //         console.error(error);
    //     } }

    return (
        <ScrollView>
            <View>
                <View style={{ margin: 20 }}>
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

                    <Button
                        title="LOGIN"
                        onPress={() => SubmitForm()}
                        filled
                        style={{
                            margin: 10,
                            marginHorizontal: 30,
                            width: '80%',
                        }} />

                </View>
                <GoogleSigninButton
                    style={{ width: 192, height: 48, marginHorizontal: 50 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => GoogleSubmitForm()} />

                <Text
                    style={{
                        margin: 10,
                        marginHorizontal: 30,
                        width: '80%',
                        marginHorizontal: 30,
                        ...FONTS.body3,
                        color: COLORS.primary,
                    }}
                >
                    Don't have an account ? {' '}
                    <TouchableOpacity
                        onPress={() => SignUp()}
                        style={{
                            margin: 30,
                            marginHorizontal: 50,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.body3,
                                color: COLORS.primary,
                            }}
                        >
                            Register
                        </Text>
                    </TouchableOpacity>

                </Text>
            </View>
        </ScrollView>

    );
};

export default Login;