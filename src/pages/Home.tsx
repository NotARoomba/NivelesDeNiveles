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
          <View className="flex justify-center align-middle">
            <Text>Hello</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}
