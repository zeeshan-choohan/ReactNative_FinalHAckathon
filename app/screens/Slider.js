import * as React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import storage from '@react-native-firebase/storage';

function Slider() {
  const width = Dimensions.get('window').width;

  // Function to fetch image URLs from Firebase Storage
  const fetchImageUrls = async () => {
    try {
      const imageRefs = await storage().ref('images').listAll();
      const imageUrls = await Promise.all(
        imageRefs.items.map(async (item) => {
          const url = await item.getDownloadURL();
          console.log(url);
          return url;
        })
      );
      return imageUrls;
    } catch (error) {
      console.error('Error fetching image URLs', error);
      return [];
    }
  };

  // State to hold image URLs
  const [imageUrls, setImageUrls] = React.useState([]);

  // Fetch image URLs when the component mounts
  React.useEffect(() => {
    const fetchImages = async () => {
      const urls = await fetchImageUrls();
      setImageUrls(urls);
    };

    fetchImages();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={imageUrls} 
        scrollAnimationDuration={2000}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Image
              source={{ uri: item }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
        )}
      />
    </View>
  );
}

export default Slider;