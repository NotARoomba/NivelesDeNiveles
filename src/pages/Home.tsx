import React, {createRef, useEffect, useRef, useState} from 'react';
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
import MapView, {
  PROVIDER_GOOGLE,
  Heatmap,
  Marker,
  Circle,
} from 'react-native-maps';
import NetInfo, {NetInfoSubscription} from '@react-native-community/netinfo';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {callAPI, getData} from '../utils/Functions';
import GetLocation from 'react-native-get-location';
import Config from 'react-native-config';
import {io} from 'socket.io-client';
import NivelesEvents from '../../backend/models/events';
import Panel from '../components/Panel';
import User from '../../backend/models/user';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/Feather';
import {Localizations} from '../utils/Localizations';
import STATUS_CODES from '../../backend/models/status';
import Incident from '../../backend/models/incident';

export default function Home({isDarkMode, updateFunction}: FunctionScreenProp) {
  const [locationPerms, setLocationPerms] = useState(false);
  const [u, setUser] = useState<User | null>(null);
  const mapRef = useRef<MapView>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 50,
    longitudeDelta: 50,
  });
  const [locationData, setLocationData] = useState<LocationData>({
    status: DangerLevel.SAFE,
    incidents: [],
    sensors: [],
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
        try {
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
        } catch {}
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
          try {
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
          } catch {}
        } else {
          Alert.alert(
            Localizations.activateLocationTitle,
            Localizations.activateLocationDesc,
            [
              {
                text: Localizations.cancel,
                onPress: () => 1,
                style: 'cancel',
              },
              {
                text: Localizations.grant,
                onPress: () => Linking.openSettings(),
              },
            ],
          );
        }
      }
      const userNumber = (await getData('number')) as string;
      const res = await callAPI('/users/' + userNumber, 'GET');
      if (res.status !== STATUS_CODES.SUCCESS) {
        if (res.status === STATUS_CODES.NO_CONNECTION)
          Alert.alert(Localizations.error, Localizations.NO_CONNECTION);
        else Alert.alert(Localizations.error, Localizations.GENERIC_ERROR);
      } else {
        setUser(res.user);
        //get location and update database with location
        //then open a websocket connecton listening for updates around the location
        const socket = io(Config.API_URL);
        // socket.emit(NivelesEvents.CONNECT)
        // console.log(user)
        socket.on(NivelesEvents.UPDATE_LOCATION_DATA, () => {
          socket.emit(
            NivelesEvents.REQUEST_LOCATION_DATA,
            res.user.number,
            (locationData: LocationData, user: User) => {
              setLocationData(locationData);
              setUser(user);
              // console.log(locationData)
            },
          );
        });
      }
      SplashScreen.hide();
    }
    updateMap();

    const unsubscribe = NetInfo.addEventListener(async state => {
      if (state.isInternetReachable) {
        updateMap();
      } else {
      }
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (u) {
      setRegion({
        latitude: u.location.coordinates[1],
        longitude: u.location.coordinates[0],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.1922,
      });
    }
  }, [u]);
  return (
    <View className=" bg-light">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View className="flex justify-center align-middle text-center justify-items-center">
        {locationPerms ? (
          <View>
            <TouchableOpacity
              className={
                'top-16 absolute bg-dark-500 right-0 p-1 rounded-full -mt-0.5 pr-3 pt-3 mr-5 ' +
                (!cameraOpen ? 'z-10' : '')
              }
              onPress={async e => {
                e.preventDefault();
                try {
                  if (mapRef.current) {
                    const location = await GetLocation.getCurrentPosition({
                      enableHighAccuracy: true,
                      timeout: 60000,
                    });
                    mapRef.current.animateToRegion({
                      latitude: location.latitude,
                      longitude: location.longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    });
                  }
                } catch {}
              }}>
              <Icon name="navigation" size={40} color="#f1eeff" />
            </TouchableOpacity>
            <MapView
              className="w-screen h-screen bg-neutral-200 justify-center m-auto"
              provider={PROVIDER_GOOGLE}
              showsUserLocation
              showsMyLocationButton={false}
              loadingEnabled
              ref={mapRef}
              initialRegion={region}
              region={region}>
              {/* {locationData.incidents.length > 0 ? ( 
                <Heatmap
                //   points={[
                //     ...locationData.incidents.map(v => ({
                //       latitude: v.location.coordinates[1],
                //       longitude: v.location.coordinates[0],
                //       weight: (v.level * 5000)
                //     })),
                //   ]}
                //   // points={[{latitude: 37.7882, longitude: -122.4324}, {latitude: 37.7882, longitude: -122.4524}]}
                //   radius={50}
                //   gradient={{
                //     colorMapSize: 2,
                //     startPoints: [0.1, 0.6, 1],
                //     colors: ['#22c55e', '#f59e0b', '#ef4444']
                //       // locationData.status === DangerLevel.SAFE
                //       //   ? ['#22c55e', '#22c55e', '#22c55e']
                //       //   : locationData.status === DangerLevel.RISK
                //       //   ? ['#f59e0b', '#f59e0b', '#f59e0b']
                //       //   : ['#ef4444', '#ef4444', '#ef4444'],
                //   }}
                // />*/}
              {locationData.incidents.map((v: Incident, i) => (
                <Circle
                  key={i}
                  center={{
                    latitude: v.location.coordinates[1],
                    longitude: v.location.coordinates[0],
                  }}
                  strokeColor={
                    v.level === DangerLevel.SAFE
                      ? '#22c55e88'
                      : v.level === DangerLevel.RISK
                      ? '#f59e0b88'
                      : '#ef444488'
                  }
                  radius={v.range}
                  fillColor={
                    v.level === DangerLevel.SAFE
                      ? '#22c55e88'
                      : v.level === DangerLevel.RISK
                      ? '#f59e0b88'
                      : '#ef444488'
                  }
                />
              ))}
              {/* // ) : (
              //   <></>
              // )} */}
              {locationData.incidents.map((v: Incident, i) => (
                <Marker
                  key={i}
                  coordinate={{
                    latitude: v.location.coordinates[1],
                    longitude: v.location.coordinates[0],
                  }}
                  title={
                    v.type === DangerType.FLOOD
                      ? Localizations.flood
                      : v.type === DangerType.FIRE
                      ? Localizations.fire
                      : Localizations.avalanche
                  }
                  description={`${Localizations.radius}: ${v.range}m`}
                  pinColor={
                    v.level === DangerLevel.SAFE
                      ? '#22c55e'
                      : v.level === DangerLevel.RISK
                      ? '#f59e0b'
                      : '#ef4444'
                  }
                  style={{justifyContent: 'center', margin: 'auto'}}
                />
              ))}
              {locationData.sensors.map((s, i) => (
                <Marker
                  key={i + s.status}
                  coordinate={{
                    latitude: s.location.coordinates[1],
                    longitude: s.location.coordinates[0],
                  }}
                  title={s.name}
                  description={`${Localizations.formatString(
                    Localizations.sensorType,
                    s.type === DangerType.FLOOD
                      ? Localizations.flood
                      : s.type === DangerType.FIRE
                      ? Localizations.fire
                      : Localizations.avalanche,
                  )}\n${Localizations.state}: ${
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
            <Panel
              locationData={locationData}
              setLogged={updateFunction}
              cameraOpen={cameraOpen}
              setCameraOpen={setCameraOpen}
            />
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
