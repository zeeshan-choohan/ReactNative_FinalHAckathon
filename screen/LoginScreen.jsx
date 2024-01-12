import React, { useState } from 'react';
import { Alert, View, Image, ScrollView } from 'react-native';
import { TextInput, Text, RadioButton, Button } from 'react-native-paper';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'
import Snackbar from 'react-native-snackbar';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage'
import ProgressBar from 'react-native-progress/Bar';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
const LoginScreen = () => {

    const [uploadProgress, setUploadProgress] = useState(0);
    const [showprogress, setshowprogress] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const [showpassword, setshowpassword] = useState(true)
    const [checked, setChecked] = useState('User');
    const [file, setfile] = useState();


    // Take  Image With Camera

    const openCamera = () => {
        const options = {
            mediaType: 'photo',  // You can use 'photo' or 'video'
            quality: 0.8,       // Image quality (0 to 1)
        };


        launchCamera(options, (response) => {
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
                imageupload(response.assets[0].uri)

            }

        })
    }


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
                imageupload(response.assets[0].uri)

            }

        })

    }



    //// FireStore Db /////////////////

       const setFirestoredb = async () => {

        console.log(email)
        console.log(password)
        console.log(checked)

        let key = firestore().collection(checked).doc().id;

        let obj = {
            email,
            password,
            key
        }

        // await database()
        //     .ref(`/users/${key}`)
        //     .set({
        //         name: 'Ada Lovelace',
        //         age: 31,
        //     })
        //     .then(() => console.log('Data set.'));

    await firestore().collection(checked).doc(key).set(obj)
    .then((data)=>{
        console.log("user add")
    })
    .catch((err)=>{
        console.log(err)
    })

}

let key =  firestore().collection('Users').doc().id;

    // var hyd_staff="1234"
    // var it_staff="hr_staff"
    // var it_id="herors"

    // var hr_staff="hr_staff"
    // var hr_id="herors"



    // console.log("test")
    // firestore()
    //     .collection('smit').doc(hyd_staff)
    //     .collection(it_staff).doc(it_id)
    //     .collection("web instructor").doc(key)
    //     .set({
    //         name: 'Ali',
    //         age: 30,
    //         key
    //     })
    //     .then(() => {
    //         console.log('User added!');
    //     });

    // firestore()
    // .collection('smit').doc(hyd_staff)
    // .collection(it_staff).doc(it_id)
    // .collection("cco").doc(key)
    // .set({
    //     name: 'Ali',
    //     age: 30,
    //     key
    // })
    // .then(() => {
    //     console.log('User added!');
    // });

    // var  

    // firestore().collection("Users")



    // firestore()
    // .collection('smit').doc(key)
    // .collection("test").doc("id")
    // .collection("cco")



    /// Upload Image To Firebase 


    const imageupload = (imageurl) => {
        const reference = storage().ref('images/' + new Date().getTime() + '.jpg');
        try {
            const uploadTask = reference.putFile(imageurl);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress)


                },
                (error) => {
                    console.error('Error uploading image: ', error);
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        const img_url = downloadURL;
                        setshowprogress(false)

                        console.log('File available at', downloadURL);

                    });
                }
            );
        } catch (error) {
            console.error('Error uploading image: ', error);
        }
    }




    // Email And Password Auth //
    const createEmailPassword = async () => {
        if (email == "") {
            Snackbar.show({
                text: 'Plz Enter Email Address',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: "grey",
                textColor: "red"
            });
        }
        else if (password == "") {
            Snackbar.show({
                text: 'Plz Enter Password',
                duration: Snackbar.LENGTH_SHORT,
                margin: 20,
                backgroundColor: "grey",
                textColor: "white"
            });
        }
        else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) {
            Snackbar.show({
                text: 'Plz Enter Valid Email',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: "grey",
                textColor: "red"
            });

        }
        else if (/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password) == false) {
            Snackbar.show({
                text: 'Plz valid password',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: "grey",
                textColor: "red"
            });
        }

        //  After Verify login User with Firebase/Email Service  

        else {
            console.log(email)
            await auth().createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    console.log(res.user.uid)
                })
                .catch((err) => {
                    if (err.code == "auth/email-already-in-use") {
                        Alert.alert("Email ALready regsiter",
                        )
                    }
                })
        }

    }

    // Email Auth With Firebase Complete

    ///////////////// Google SignIn   ///////////////////

    async function signInWithGoogle() {
        googleSigninFunc().then(data => {
            console.log('user data=>', data["user"]["photo"]);
            // setfile(data["user"]["photo"])
        });
    }



    const googleSigninFunc = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            GoogleSignin.configure({

                webClientId: "916307492086-k0s6608r0of6dcsdkn194qi9qra03ppu.apps.googleusercontent.com",
                offlineAccess: true,
                hostedDomain: '',
                forceCodeForRefreshToken: true,
                accountName: '',

            })
            const userInfo = await GoogleSignin.signIn();
            const { idToken } = await GoogleSignin.signIn();

            const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredentials);
            return userInfo;


        }
        catch (e) {
            console.log(e)
        }



    }

    //// Google GignIn Component End ///// 


    //// Google GignOut Component/////

    const googleSignout = async () => {
        try {
            await GoogleSignin.signOut();

        } catch (error) {
            console.error(error);
        }

    }

    return (
        <ScrollView>
            <View>
                <TextInput

                    onChangeText={(e) => setEmail(e)}
                    value={email}
                    mode="outlined"
                    style={{ backgroundColor: "white", color: "blue", margin: 20 }}
                    label="Email"
                    left={<TextInput.Icon icon="email" color={"red"} />}
                />

                <TextInput
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                    mode="outlined"
                    style={{ backgroundColor: "white", color: "blue", marginVertical: 2, marginHorizontal: 20 }}
                    label="Password"
                    secureTextEntry={showpassword}
                    left={<TextInput.Icon icon="lock" color={"red"} />}
                    right={
                        showpassword ?
                            <TextInput.Icon icon="eye" color={"red"} onPress={() => setshowpassword(false)} />
                            :
                            <TextInput.Icon icon="eye-off" color={"red"} onPress={() => setshowpassword(true)} />

                    } />
                        <Text style={{ marginTop: 30 }}>Select Gender</Text>
                <RadioButton.Group onValueChange={value => setChecked(value)} value={checked}>
                    <RadioButton.Item label="Admin" value="Admin" />
                    <RadioButton.Item label="subAdmin" value="subAdmin" />
                    <RadioButton.Item label="User" value="User" />

                </RadioButton.Group>

                <Button icon="home" mode="contained" onPress={() => createEmailPassword()}>
                    Login
                </Button>
                <Button icon="google" mode="contained" onPress={() => setFirestoredb()}
                    style={{ marginTop: 20, marginBottom: 20 }}>
                    set firestore
                </Button>

                {/* {
                    file != "" ?
                        <Image source={{ uri: file }} style={{
                            width: 200,
                            height: 200
                        }} /> :
                        null

                } */}


                {
                    showprogress ?
                        <ProgressBar
                            progress={uploadProgress / 100}
                            width={330}
                            height={20}
                            color={'#007AFF'}
                            style={{ margin: 20 }}
                        />

                        :
                        null
                }

                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => signInWithGoogle()} />

                <Button icon="google" mode="contained" onPress={() => googleSignout()}
                    style={{ marginTop: 20 }} >Log Out</Button>

                <Button icon="camera" mode="contained" onPress={() => openCamera()}
                    style={{ marginTop: 20 }} >Open Camera</Button>

                <Button icon="camera" mode="contained" onPress={() => openGallery()}
                    style={{ marginTop: 20 }} >Open Gallery</Button>

                



            </View>
        </ScrollView>

    );
};

// export default LoginScreen;