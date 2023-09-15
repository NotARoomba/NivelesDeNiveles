import React, {useEffect, useState} from 'react';

import Home from './src/pages/Home';
import {Appearance} from 'react-native';
// import {callAPI, getData} from './src/utils/DataTypes';
import SplashScreen from 'react-native-splash-screen';
import {getData, callAPI} from './src/utils/DataTypes';
import Login from './src/pages/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App() {
  const [logged, setlLogged] = useState(false);
  const [isDarkMode, setDarkMode] = useState(
    // Appearance.getColorScheme() === 'dark',
    false,
  );
  // const updateDarkMode = (v: boolean) =>
  // Appearance.setColorScheme(v ? 'light' : 'dark');
  useEffect(() => {
    // checks if user is valid in database and if not then kicks out
    // AsyncStorage.removeItem('number');
    getData('number').then(res => {
      if (res !== null) {
        callAPI('/users/' + res, 'GET').then(userData => {
          if (userData.user && !userData.error) {
            setlLogged(true);
          } else {
            setlLogged(false);
          }
        });
      } else {
        setlLogged(false);
      }
      // AsyncStorage.removeItem('number');
      Appearance.addChangeListener(appearance => {
        setDarkMode(appearance.colorScheme === 'dark');
      });
      SplashScreen.hide();
    });
  }, []);
  // const updateDarkMode = (v: boolean) =>
  //   Appearance.setColorScheme(v ? 'light' : 'dark');
  // const onNavigationReady = () => {
  //   //SplashScreen.hide(); // just hide the splash screen after navigation ready
  // };
  return (
    <>
      {logged ? (
        <Home isDarkMode={isDarkMode} />
      ) : (
        <Login isDarkMode={isDarkMode} updateFunction={[setlLogged]} />
      )}
    </>
  );
}
