import React, {useEffect, useState} from 'react';
import {View, StatusBar, Alert} from 'react-native';
import {DangerLevel, DangerType, LocationData, ScreenProp} from '../utils/Types';
import MapView, {PROVIDER_GOOGLE, Heatmap} from 'react-native-maps';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {callAPI, getData} from '../utils/Functions';
import GetLocation from 'react-native-get-location';
import Config from 'react-native-config';
import {io} from 'socket.io-client';
import NivelesEvents from '../../backend/models/events';
import Panel from '../components/Panel';
import User from '../../backend/models/user';

export default function Home({isDarkMode}: ScreenProp) {
  const [locationPerms, setLocationPerms] = useState(false);
  const [u, setUser] = useState<User>({
    number: '',
    location: {
      coordinates: [0, 0],
      type: 'Point',
    },
  });
  const [locationData, setLocationData] = useState<LocationData>({
    status: DangerLevel.SAFE,
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
        location: {coordinates: [37.7882, -122.4524], type: 'Point'},
      },
    ],
  });
  useEffect(() => {
    async function updateMap() {
      setUser(
        (await callAPI('/users/' + (await getData('number')), 'GET')).user,
      );
      const locationStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (locationStatus === RESULTS.GRANTED) {
        setLocationPerms(true);
        const location = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        });
        callAPI('/users/', 'POST', {
          number: u.number,
          location: {
            coordinates: [location.longitude, location.latitude],
            type: 'Point',
          },
        });
      } else if (locationStatus === RESULTS.DENIED) {
        const requestLocation = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );
        if (requestLocation === RESULTS.GRANTED) {
          setLocationPerms(true);
          const location = await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
          });
          callAPI('/users/', 'POST', {
            number: u.number,
            location: {
              coordinates: [location.longitude, location.latitude],
              type: 'Point',
            },
          });
        } else {
          Alert.alert(
            'Activa Ubicacion',
            'Niveles de Niveles nessecita tu ubicacion para asegurar que no estas en riesgo!',
          );
        }
      }
      const user = (await callAPI('/users/' + (await getData('number')), 'GET')).user
      setUser(user);
      //get location and update database with location
      //then open a websocket connecton listening for updates around the location
      const socket = io(Config.API_URL);
      // socket.emit(NivelesEvents.CONNECT)
      socket.emit(NivelesEvents.REQUEST_LOCATION_DATA, { payload: user},
        (locationData: LocationData) => {
          setLocationData(locationData);
        });
      socket.on(NivelesEvents.SEND_LOCATION_DATA, (locationData: LocationData) => {
        setLocationData(locationData);
      })
    }
    updateMap();
  }, []);
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
              points={[
                ...locationData.sensors.map(v => ({
                  latitude: v.location.coordinates[0],
                  longitude: v.location.coordinates[1],
                })),
              ]}
              // points={[{latitude: 37.7882, longitude: -122.4324}, {latitude: 37.7882, longitude: -122.4524}]}
              radius={300}
              gradient={{
                colorMapSize: 1000,
                startPoints: [0.1, 0.6, 1],
                colors: ['#008000', '#FFA500', '#FF0000'],
              }}
            />
          </MapView>
        ) : (
          <></>
        )}
      </View>
      <Panel locationData={locationData} />
    </View>
  );
}
