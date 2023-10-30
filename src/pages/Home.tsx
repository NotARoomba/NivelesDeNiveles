import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  Alert,
  Platform,
  Text,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {
  DangerLevel,
  DangerType,
  FunctionScreenProp,
  LocationData,
} from '../utils/Types';
import MapView, {PROVIDER_GOOGLE, Heatmap, Marker} from 'react-native-maps';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {callAPI, getData} from '../utils/Functions';
import GetLocation from 'react-native-get-location';
import Config from 'react-native-config';
import {io} from 'socket.io-client';
import NivelesEvents from '../../backend/models/events';
import Panel from '../components/Panel';
import User from '../../backend/models/user';
import SplashScreen from 'react-native-splash-screen';
import { Localizations } from '../utils/Localizations';

export default function Home({isDarkMode, updateFunction}: FunctionScreenProp) {
  const [locationPerms, setLocationPerms] = useState(false);
  const [u, setUser] = useState<User | null>(null);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0922,
  });
  const [locationData, setLocationData] = useState<LocationData>({
    status: DangerLevel.SAFE,
    incidents: [],
    sensors: [
      {
        name: 'Sensor 1',
        status: DangerLevel.SAFE,
        type: DangerType.FLOOD,
        location: {coordinates: [37.7882, -122.4324], type: 'Point'},
      },
      {
        name: 'Sensor 2',
        status: DangerLevel.RISK,
        type: DangerType.FLOOD,
        location: {coordinates: [37.7882, -122.4524], type: 'Point'},
      },
      {
        name: 'Sensor 3',
        status: DangerLevel.DANGER,
        type: DangerType.FLOOD,
        location: {coordinates: [37.7882, -122.4624], type: 'Point'},
      },
    ],
  });
  useEffect(() => {
    async function updateMap() {
      let locationStatus = null;
      if (Platform.OS == 'ios')
        locationStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      else if (Platform.OS == 'android')
        locationStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (locationStatus === RESULTS.GRANTED) {
        setLocationPerms(true);
        const location = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        });
        if (location)
          callAPI('/users/', 'POST', {
            number: await getData('number'),
            location: {
              coordinates: [location.longitude, location.latitude],
              type: 'Point',
            },
          });
      } else if (locationStatus === RESULTS.DENIED) {
        let requestLocation = null;
        if (Platform.OS == 'ios')
          requestLocation = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        else if (Platform.OS == 'android')
          requestLocation = await request(
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          );
        if (requestLocation === RESULTS.GRANTED) {
          setLocationPerms(true);
          const location = await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
          });
          if (location)
            callAPI('/users/', 'POST', {
              number: await getData('number'),
              location: {
                coordinates: [location.longitude, location.latitude],
                type: 'Point',
              },
            });
        } else {
          Alert.alert(
            Localizations.activateLocationTitle,
            Localizations.activateLocationDesc,
            [
              {
                text: Localizations.cancel,
                onPress: () => 1,
                style: 'cancel'
              },
              {
                text: Localizations.grant,
                onPress: () => Linking.openSettings(),
              },
            ],
          );
        }
      }
      const user: User = (
        await callAPI('/users/' + (await getData('number')), 'GET')
      ).user;
      setUser(user);
      //get location and update database with location
      //then open a websocket connecton listening for updates around the location
      const socket = io(Config.API_URL);
      // socket.emit(NivelesEvents.CONNECT)
      // console.log(user)
      socket.on(NivelesEvents.UPDATE_LOCATION_DATA, () => {
        socket.emit(
          NivelesEvents.REQUEST_LOCATION_DATA,
          user,
          (locationData: LocationData) => {
            setLocationData(locationData);
            // console.log(locationData)
          },
        );
      });
      SplashScreen.hide();
    }
    updateMap();
  }, []);
  useEffect(() => {
    if (u)
      setRegion({
        latitude: u.location.coordinates[1],
        longitude: u.location.coordinates[0],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.1922,
      });
  }, [u]);
  return (
    <View className=" bg-light">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View className="flex justify-center align-middle text-center justify-items-center">
        {locationPerms ? (
          <View>
            <MapView
              className="w-screen h-screen bg-neutral-200 justify-center m-auto"
              provider={PROVIDER_GOOGLE}
              showsUserLocation
              showsMyLocationButton
              loadingEnabled
              initialRegion={region}
              region={region}>
              {locationData.incidents.length > 0 ? (
                <Heatmap
                  points={[
                    ...locationData.incidents.map(v => ({
                      latitude: v.location.coordinates[1],
                      longitude: v.location.coordinates[0],
                    })),
                  ]}
                  // points={[{latitude: 37.7882, longitude: -122.4324}, {latitude: 37.7882, longitude: -122.4524}]}
                  radius={50}
                  gradient={{
                    colorMapSize: 1000,
                    startPoints: [0.1, 0.6, 1],
                    colors:
                      locationData.status === DangerLevel.SAFE
                        ? ['#22c55e', '#22c55e', '#22c55e']
                        : locationData.status === DangerLevel.RISK
                        ? ['#f59e0b', '#f59e0b', '#f59e0b']
                        : ['#ef4444', '#ef4444', '#ef4444'],
                  }}
                />
              ) : (
                <></>
              )}
              {locationData.sensors.map((s, i) => (
                <Marker
                  key={i + s.status}
                  coordinate={{
                    latitude: s.location.coordinates[1],
                    longitude: s.location.coordinates[0],
                  }}
                  title={s.name}
                  description={`${Localizations.state}: ${
                    s.status === DangerLevel.SAFE
                      ? Localizations.safe
                      : s.status === DangerLevel.RISK
                      ? Localizations.risk
                      : Localizations.danger
                  }`}
                  pinColor={
                    s.status === DangerLevel.SAFE
                      ? '#22c55e'
                      : s.status === DangerLevel.RISK
                      ? '#f59e0b'
                      : '#ef4444'
                  }
                  style={{justifyContent: 'center', margin: 'auto'}}
                />
              ))}
            </MapView>
            <Panel locationData={locationData} setLogged={updateFunction} />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => Linking.openSettings()}
            className="justify-center h-full">
            <Text className="text-3xl text-center m-auto align-middle">
             {Localizations.homeNoLocation}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
