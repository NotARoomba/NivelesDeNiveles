import React, {useEffect, useState} from 'react';
import {LogLevel, OneSignal} from 'react-native-onesignal';

import Home from './src/pages/Home';
// import {callAPI, getData} from './src/utils/DataTypes';
import Login from './src/pages/Login';
import {callAPI, getData, storeData} from './src/utils/Functions';
import {Alert} from 'react-native';
import STATUS_CODES from './backend/models/status';
import Config from 'react-native-config';
export default function App() {
  const [logged, setLog] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isDarkMode, _setDarkMode] = useState(
    // Appearance.getColorScheme() === 'dark',
    false,
  );
  const setLogged = async (l: boolean) => {
    const number = await getData('number');
    if (l) {
      OneSignal.User.pushSubscription.optIn();
    } else {
      OneSignal.User.pushSubscription.optOut();
      OneSignal.logout();
    }
    setLog(l);
  };
  // const updateDarkMode = (v: boolean) =>
  // Appearance.setColorScheme(v ? 'light' : 'dark');
  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    // OneSignal Initialization
    OneSignal.initialize(Config.ONESIGNAL_APP_ID);

    // requestPermission will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
    OneSignal.Notifications.requestPermission(true);
    // // Method for listening for notification clicks
    // OneSignal.Notifications.addEventListener('permissionChange', (event) => {
    //   Alert.alert('a')
    // });
    // checks if user is valid in database and if not then kicks out
    storeData('number', '+573104250018');
    // AsyncStorage.removeItem('number');
    async function checkIfLogin() {
      const number = await getData('number');
      if (!number) {
        setLoaded(true);
        return setLogged(false);
      }
      const data = await callAPI('/users/' + number, 'GET');
      if (data.status == STATUS_CODES.NO_CONNECTION) setLogged(true);
      else if (data.status !== STATUS_CODES.SUCCESS) setLogged(false);
      else setLogged(true);
      setLoaded(true);
    }
    checkIfLogin();
    // getData('number').then(number => {
    //   callAPI('/users/' + number, 'GET')
    //     .then(res => {
    //       if (res == null) {
    //         setlLogged(false);
    //       }
    //       if (res.user && !res.error) {
    //         setlLogged(true);
    //       } else {
    //         setlLogged(false);
    //       }
    //       // SplashScreen.hide();
    //       // Appearance.addChangeListener(appearance => {
    //       //   setDarkMode(appearance.colorScheme === 'dark');
    //       // });
    //     })
    //     .catch(() => {
    //       Alert.alert(
    //         'Error!',
    //         'No podemos conectar a nuestro servidor! Revisa tu conexion al internet.',
    //       );
    //     });
    // });
  }, []);
  // const updateDarkMode = (v: boolean) =>
  //   Appearance.setColorScheme(v ? 'light' : 'dark');
  // const onNavigationReady = () => {
  //   //SplashScreen.hide(); // just hide the splash screen after navigation ready
  // };
  return (
    <>
      {loaded ? (
        logged ? (
          <Home isDarkMode={isDarkMode} updateFunction={setLog} />
        ) : (
          <Login isDarkMode={isDarkMode} updateFunction={setLog} />
        )
      ) : (
        <></>
      )}
    </>
  );
}
