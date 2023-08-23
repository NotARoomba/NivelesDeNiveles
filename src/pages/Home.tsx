import React, {useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  ScrollView,
  Animated,
  RefreshControl,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {ScreenProp} from '../utils/DataTypes';
import MapView, {PROVIDER_GOOGLE, Heatmap} from 'react-native-maps';
import { check, PERMISSIONS } from 'react-native-permissions';

export default function Home({fadeAnim, scale, isDarkMode}: ScreenProp) {
  useEffect(() => {
    async function updateMap() {
      SplashScreen.hide();
    }
    updateMap();
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);

  // update map and danger warning
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    async function updateMap() {
      setRefreshing(false);
    }
    updateMap();
  }, []);
  return (
    <Animated.View style={{opacity: fadeAnim, transform: [{scale}]}}>
      <SafeAreaView className="bg-neutral-100 dark:bg-neutral-900">
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
            {check(PERMISSIONS.IOS.LOCATION_ALWAYS)}
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
                points={[
                  {latitude: 37.78825, longitude: -122.4324, weight: 10000},
                  {latitude: 37.78825, longitude: -122.44, weight: 10000},
                ]}
              />
            </MapView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}
