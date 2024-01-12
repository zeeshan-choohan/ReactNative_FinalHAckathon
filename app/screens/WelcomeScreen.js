import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'

const Dots = ({ selected }) => {
    let backgroundColor
    backgroundColor = selected ? '#7DCEA0' : '#808080'
    return (
        <View
            style={{
                height: 5,
                width: 5,
                marginHorizontal: 3,
                backgroundColor,
            }}
        />
    )
}

const Done = ({ ...props }) => (
    <TouchableOpacity
        style={{
            marginRight: 12,
        }}
        {...props}
    >
        <Text style={{ color: '#ff2156' }}>Done</Text>
    </TouchableOpacity>
)

const WelComeScreen = ({ navigation }) => {
    return (
        <Onboarding
            onSkip={() => navigation.navigate('GetStarted')}
            onDone={() => navigation.navigate('GetStarted')}
            DotComponent={Dots}
            bottomBarColor="#ffffff"
            DoneButtonComponent={Done}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: (
                        <Image
                            source={require('../assets/images/onboarding_1.png')}
                        />
                    ),
                    title: 'Donate Saylani To Save Huminity',
                    subtitle:
                        'Every year, Saylani welfare is spending billions of rupees that is received as donations from individuals like yourself for the betterment of the Huminity',
                },
                {
                    backgroundColor: '#fff',
                    image: (
                        <Image
                            source={require('../assets/images/onboarding_2.png')}
                        />
                    ),
                    title: 'Donate Saylani To Save Huminity',
                    subtitle:
                        'Every year, Saylani welfare is spending billions of rupees that is received as donations from individuals like yourself for the betterment of the Huminity',
                },
            ]}
        />
    )
}

export default WelComeScreen
