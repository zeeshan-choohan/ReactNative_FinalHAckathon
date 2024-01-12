import React, { useState, useCallback, useRef } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import Icon from 'react-native-vector-icons/Ionicons';

const VideoItem = ({ videoId, onTogglePlaying, playing, videoDimensions }) => {
  return (
    <View style={{ ...styles.videoContainer, ...videoDimensions }}>
      <YoutubePlayer
        height={videoDimensions.height}
        play={playing}
        videoId={videoId}
        onChangeState={() => {}} // You can add state change handling if needed
      />
      <TouchableOpacity onPress={onTogglePlaying} style={styles.playButton}>
        <View>
        <Icon name={playing ? "pause" : "play"} size = {30} color="#fff"/>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function VideoList(props) {
  const [playingIndex, setPlayingIndex] = useState(null);
  const { width: windowWidth } = useWindowDimensions();

  const onTogglePlaying = useCallback((index) => {
    setPlayingIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  const calculateVideoDimensions = () => {
    const videoWidth = windowWidth; // Adjusted to use the full width
    const videoHeight = (9 / 16) * videoWidth; // Assuming a 16:9 aspect ratio

    return { width: videoWidth, height: videoHeight };
  };

  const data = [
    { id: "1", videoId: "vdIDpx4f088" },
    { id: "2", videoId: "x49-6d1-3Mo" },
    { id: "3", videoId: "8cb75U-a4yQ" },
    { id: "4", videoId: "SAIaDjAj7nc" },
   
    // Add more video data as needed
  ];

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <VideoItem
          videoId={item.videoId}
          onTogglePlaying={() => onTogglePlaying(index)}
          playing={playingIndex === index}
          videoDimensions={calculateVideoDimensions()}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    marginTop: 5,
    backgroundColor: 'black',
  },
  playButton: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
