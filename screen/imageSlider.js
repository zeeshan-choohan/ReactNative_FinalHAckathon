import React, { Component } from 'react'
import { Text, View, Image, Dimensions } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')

  const images = [
        "https://steemitimages.com/1280x0/https://cdn.steemitimages.com/DQmZ5JaU8HXwkbADGe5id75KnsRhxZFmNvJW3MjsAmS47ZZ/Saylani-Cover.png",
        "https://saylani-website-assignment-3.web.app/auto-slider-wllpapers/slider1.png",
        "https://saylaniweb-home.web.app/images/sliderimage2_rotibank.jpg"
]


export default class extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={tw`text-lg bg-red-500 font-bold text-blue-800`}>Hello, Tailwind!</Text>
                <Swiper
                    // height={40}
                    dot={
                        <View
                            style={{
                                backgroundColor: 'grey',
                                width: 12,
                                height: 12,
                                borderRadius: 8,
                                margin: 3

                            }}
                        />
                    }
                    activeDot={
                        <View
                            style={{
                                backgroundColor: 'red',
                                width: 12,
                                height: 12,
                                borderRadius: 8,
                                margin: 3
                            }}
                        />
                    }
                    autoplay={true}
                    autoplayTimeout={5}
                >
                    {
                        images.map((v, i) => {
                            return <Image
                                resizeMode="contain"
                                style={styles.image}
                                source={{ uri: v }}
                                key={i}
                            />
                        })
                    }


                </Swiper>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        width,
        flex: 1
    }
}