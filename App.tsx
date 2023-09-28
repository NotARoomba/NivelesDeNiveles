import React, {useEffect, useState} from 'react';

import Home from './src/pages/Home';
// import {callAPI, getData} from './src/utils/DataTypes';
import Login from './src/pages/Login';
import {callAPI, getData} from './src/utils/Functions';
import { Alert } from 'react-native';
export default function App() {
  const [logged, setlLogged] = useState(false);
  const [isDarkMode, _setDarkMode] = useState(
    // Appearance.getColorScheme() === 'dark',
    false,
  );
  // const updateDarkMode = (v: boolean) =>
  // Appearance.setColorScheme(v ? 'light' : 'dark');
  useEffect(() => {
    // checks if user is valid in database and if not then kicks out
    // storeData('number', '+573104250018');
    // AsyncStorage.removeItem('number');

    getData('number').then(number => {
      callAPI('/users/' + number, 'GET').then(res => {
        if (res == null) {
          setlLogged(false);
        }
        if (res.user && !res.error) {
          setlLogged(true);
        } else {
          setlLogged(false);
        }
        // SplashScreen.hide();
        // Appearance.addChangeListener(appearance => {
        //   setDarkMode(appearance.colorScheme === 'dark');
        // });
      }).catch(() => {
        Alert.alert('Error!', 'No podemos conectar a nuestro servidor! Revisa tu conexion al internet.')
      })
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
