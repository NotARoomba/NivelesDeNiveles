import React, {useEffect, useState} from 'react';
import {View, StatusBar, Alert} from 'react-native';
import {ScreenProp, User} from '../utils/Types';
import MapView, {PROVIDER_GOOGLE, Heatmap} from 'react-native-maps';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {callAPI, getData} from '../utils/Functions';
import Panel from '../components/Panel';

export default function Home({isDarkMode}: ScreenProp) {
  const [locationPerms, setLocationPerms] = useState(false);
  useEffect(() => {
    async function updateMap() {
      const locationStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (locationStatus === RESULTS.GRANTED) {
        setLocationPerms(true);
      } else if (locationStatus === RESULTS.DENIED) {
        const requestLocation = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );
        if (requestLocation === RESULTS.GRANTED) {
          setLocationPerms(true);
        } else {
          Alert.alert(
            'Activa Ubicacion',
            'Niveles de Niveles nessecita tu ubicacion para asegurar que no estas en riesgo!',
          );
        }
      }
      const {user} = await callAPI(
        '/users/' + (await getData('number')),
        'GET',
      );
      setUser(user);
    }
    updateMap();
  }, []);
  const [_u, setUser] = useState<User>({
    number: '',
    location: {
      coordinates: [0, 0],
      type: 'Point',
    },
  });
  return (
    <View className=" bg-light">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View className="flex justify-center align-middle text-center justify-items-center">
        {locationPerms ? (
          <MapView
            className="w-screen h-screen aspect-square bg-neutral-200 justify-center m-auto"
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            showsMyLocationButton
            loadingEnabled
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Heatmap
              points={[{latitude: 37.7882, longitude: -122.4324}]}
              radius={300}
              gradient={{
                colorMapSize: 1000,
                startPoints: [0.1, 0.5, 1],
                colors: ['#008000', '#FFA500', '#FF0000'],
              }}
            />
          </MapView>
        ) : (
          <></>
        )}
      </View>
      <Panel />
    </View>
  );
}
