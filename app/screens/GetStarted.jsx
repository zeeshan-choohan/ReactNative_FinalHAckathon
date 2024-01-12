import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { images, COLORS, FONTS} from '../constants'
import Button from '../components/Button'

const GetStarted = ({ navigation }) => {

    let AuthStack = () =>{
        navigation.replace('AuthStack')
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View
                    style={{
                        flex: 1,
                        marginHorizontal: 22,
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={images.logo}
                        style={{
                            tintColor: COLORS.primary,
                            marginVertical: 80,
                            width:200,
                            height:200
                        }}
                    />

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ ...FONTS.h2, color: COLORS.primary }}>
                            Donate Saylani
                        </Text>
                        <Text
                            style={{
                                ...FONTS.h2,
                                color: COLORS.black,
                                marginHorizontal: 8,
                            }}
                        >
                            To
                        </Text>
                        <Text style={{ ...FONTS.h2, color: COLORS.primary }}>
                            Save Huminity
                        </Text>
                    </View>

                    <View style={{ marginVertical: 40 }}>
                        <Text
                            style={{
                                ...FONTS.body3,
                                textAlign: 'center',
                                color: COLORS.primary
                            }}
                        >
                            Your Donation Save's Someone Life
                        </Text>
                    </View>
                    <Button
                        title="REGISTER"
                        onPress={() => AuthStack()}
                        filled
                        style={{
                            width: '100%',
                        }}
                    />
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default GetStarted
