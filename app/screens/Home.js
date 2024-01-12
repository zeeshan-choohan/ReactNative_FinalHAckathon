import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View ,Text} from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from './Slider';
import UserProfile  from './UserProfile';
import Videos from './Videos';
import Settings from './Settings';
import DonnationForm from './DonnationForm';

const HomeComponent = () => {
  return(

    <View>
  <View>
<Slider/>

  </View>
  <View style={{marginTop:180}}>
  <Videos/>
  </View>
  </View>
  
  )
};

const VideoSection = () => {
  return(
  <View>
    <Videos/>
      </View>
  )    
};

const DonnationReg = () => {
  return (
    <View style={{ flex: 1 }}>
      <DonnationForm />
    </View>
  );
};


const SettingsScreen = () => {
  return(
  <View>
    <Settings/>
      </View>
  )  
};

export default function MainHome() {
  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';

    switch (routeName) {
      case 'Home':
        icon = 'home';
        break;

      case 'Videos':
        icon = 'videocam';
        break;

      case 'DonnationForm':
        icon = 'add-circle';
        break;

      case 'Profile':
        icon = 'person';
        break;

      case 'Settings':
        icon = 'settings';
        break;
    }

    return (
      <Ionicons
        name={icon}
        size={25}
        color={routeName === selectedTab ? '#7DCEA0' : 'gray'}
      />
    );
  };

  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity onPress={() => navigate(routeName)} style={styles.tabbarItem}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBar.Navigator
      type="UP"
      style={styles.bottomBar}
      shadowStyle={styles.shadow}
      height={55}
      circleWidth={50}
      bgColor="white"
      initialRouteName="Home"
      borderTopLeftRight
      renderCircle={({ selectedTab, navigate }) => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigate('DonnationForm');
            }}
          >
            <Ionicons name={'add-circle'} color="#7DCEA0" size={60} />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}
    >
      <CurvedBottomBar.Screen
        name="Home"
        position="LEFT"
        component={() => <HomeComponent />}
      />
      <CurvedBottomBar.Screen
        name="Videos"
        component={() => <VideoSection />}
        position="LEFT"
      />
      <CurvedBottomBar.Screen
        name="DonnationForm"
        component={() => <DonnationReg />}
        position="CENTER"
      />
      <CurvedBottomBar.Screen
        name="Profile"
        component={() => <UserProfile />}
        position="RIGHT"
      />
      <CurvedBottomBar.Screen
        name="Settings"
        component={() => <SettingsScreen />}
        position="RIGHT"
      />
    </CurvedBottomBar.Navigator>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shadow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    bottom: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
