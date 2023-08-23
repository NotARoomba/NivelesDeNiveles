import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';

import Home from './src/pages/Home';
import {Animated} from 'react-native';
import {Appearance} from 'react-native';
// import {callAPI, getData} from './src/utils/DataTypes';
import SplashScreen from 'react-native-splash-screen';
function getIcons(route: any, focused: any, color: any, size: any) {
  let iconName: string = 'home';

  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home';
  } else if (route.name === 'Schedule') {
    iconName = focused ? 'list' : 'list';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'user' : 'user';
  }
  return (
    <Feather
      name={iconName}
      size={size}
      color={color}
      className="align-center"
    />
  );
}
export default function App() {
  const Tab = createBottomTabNavigator();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.98)).current;

  const fadeIn = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scale]);

  const fadeOut = useCallback(
    (navigate: () => void) => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.98,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(({finished}) => {
        if (finished) {
          navigate();
        }
      });
    },
    [fadeAnim, scale],
  );

  const listeners = ({navigation, route}: {navigation: any; route: any}) => ({
    tabPress: (e: {preventDefault: () => void}) => {
      e.preventDefault();
      if (
        navigation.getState().history[navigation.getState().history.length - 1]
          .key !== route.key
      ) {
        fadeOut(() => navigation.navigate(route.name));
      }
    },
    focus: (_e: any) => {
      fadeIn();
    },
  });
  const [isDarkMode, setDarkMode] = useState(
    Appearance.getColorScheme() === 'dark',
  );
  // const updateDarkMode = (v: boolean) =>
  //   Appearance.setColorScheme(v ? 'light' : 'dark');
  useEffect(() => {
    // get map data from current location
    //AsyncStorage.removeItem('number');
    SplashScreen.hide();
    Appearance.addChangeListener(appearance => {
      setDarkMode(appearance.colorScheme === 'dark');
    });
  }, []);
  // const onNavigationReady = () => {
  //   //SplashScreen.hide(); // just hide the splash screen after navigation ready
  // };
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarStyle: {
            backgroundColor: isDarkMode ? '#000000' : '#e7e7e7',
            position: 'absolute',
            bottom: 10,
            borderRadius: 10,
            width: 350,
            left: '50%',
            marginLeft: -175,
            height: 60,
            paddingBottom: 0,
            alignItems: 'center',
            shadowColor: '#000000',
            elevation: 0,
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            borderTopWidth: 0,
          },
          headerTransparent: true,
          headerShown: false,
          tabBarIcon: ({focused, color, size}) =>
            getIcons(route, focused, color, size),
          tabBarActiveTintColor: isDarkMode ? '#16BA65' : '#026D36',
          tabBarInactiveTintColor: isDarkMode ? 'gray' : '#171717',
        })}
        initialRouteName="Home"
        // eslint-disable-next-line react-native/no-inline-styles
        sceneContainerStyle={{
          zIndex: -900,
          backgroundColor: 'rgba(52, 52, 52, 0.1)',
        }}>
        <Tab.Group>
          <Tab.Screen
            name="Home"
            listeners={listeners}
            options={{
              tabBarLabelStyle: {
                fontFamily: 'Inter',
                fontSize: 14,
                fontWeight: 'bold',
                paddingBottom: 5,
              },
            }}>
            {props => (
              <Home {...props} fadeAnim={fadeAnim} scale={scale} isDarkMode />
            )}
          </Tab.Screen>
        </Tab.Group>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
