import React, {useEffect, useState} from 'react';

import Home from './src/pages/Home';
import {Appearance} from 'react-native';
// import {callAPI, getData} from './src/utils/DataTypes';
import SplashScreen from 'react-native-splash-screen';
import Login from './src/pages/Login';
import {callAPI, getData} from './src/utils/Functions';
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
    const updateUser = async () => {
      const res = await callAPI('/users/' + (await getData('number')), 'GET');
      console.log(res, await getData('number'));
      if (res == null) {
        return setlLogged(false);
      }
      if (res.user && !res.error) {
        setlLogged(true);
      } else {
        setlLogged(false);
      }
      Appearance.addChangeListener(appearance => {
        setDarkMode(appearance.colorScheme === 'dark');
      });
      SplashScreen.hide();
    };
    updateUser();
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
