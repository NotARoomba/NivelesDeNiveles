import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {ScreenProp, User, callAPI, getData} from '../utils/DataTypes';
import MapView, {PROVIDER_GOOGLE, Heatmap} from 'react-native-maps';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export default function Home({isDarkMode}: ScreenProp) {
  const [locationPerms, setLocationPerms] = useState(false);
  useEffect(() => {
    SplashScreen.show();
    async function updateMap() {
      const locationStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log(locationStatus);
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
      SplashScreen.hide();
    }
    updateMap();
  }, []);
  const [u, setUser] = useState<User>({
    number: '',
    location: {
      coordinates: [0, 0],
      type: 'Point',
    },
  });
  useEffect(() => {
    async function updateUser() {
      const {user} = await callAPI(
        '/users/' + (await getData('number')),
        'GET',
      );
      setUser(user);
    }
    updateUser();
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);

  // update map and danger warning
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    async function updateMap() {
      setLocationPerms(
        (await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)) === RESULTS.GRANTED,
      );
      const {user} = await callAPI(
        '/users/' + (await getData('number')),
        'GET',
      );
      setUser(user);
      setRefreshing(false);
    }
    updateMap();
  }, []);
  return (
    <SafeAreaView className=" bg-light">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        className="pb-[1000px]"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View className="flex justify-center align-middle text-center justify-items-center">
          <Text className="text-neutral-200 bg-neutral-800 text-center text-4xl py-5">
            Insert Logo here
          </Text>
          {locationPerms ? (
            <MapView
              className="w-screen aspect-square bg-neutral-200 justify-center m-auto"
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
      </ScrollView>
    </SafeAreaView>
  );
}
