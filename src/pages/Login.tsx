import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {
  FunctionScreenProp,
  callAPI,
  storeData,
  styles,
} from '../utils/DataTypes';
import prompt from '@powerdesigninc/react-native-prompt';

async function checkLogin(
  number: string,
  code: string,
  updateLogged: Function,
) {
  const check = await callAPI('/verify/check', 'POST', {number, code});
  console.log(check);
  if (!check.error) {
    await storeData(
      'number',
      number[0] === '+' ? number.slice(3, number.length) : number,
    );
    await callAPI('/users/', 'POST', {
      number,
      location: {type: 'Point', coordinates: [0, 0]},
    });
    updateLogged(true);
    Alert.alert('Success!');
  } else {
    return Alert.alert('Error', check.msg);
  }
}

async function parseLogin(number: string, updateLogged: Function) {
  console.log(
    '/users/' + (number[0] === '+' ? number.slice(3, number.length) : number),
  );
  const res = await callAPI('/verify/send', 'POST', {number});
  if (!res.error) {
    return prompt(
      'Enter Code',
      'Enter the verification code that was sent to ' + number,
      async input => await checkLogin(number, input, updateLogged),
      'plain-text',
      '',
      'phone-pad',
    );
  } else {
    return Alert.alert('Error', res.msg);
  }
}

export default function Login({
  isDarkMode,
  updateFunction,
}: FunctionScreenProp) {
  const [number, onChangeNumber] = React.useState('');
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaView className=" bg-light">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView className="pb-[1000px]">
        <View className="flex justify-center align-left mt-0">
          <Image
            source={require('../../public/logo.png')}
            className="flex h-36 w-11/12 align-middle justify-center m-auto mt-16 bg-inherit"
            resizeMode={'contain'}
          />
          <View className="justify-center pt-12 mt-16">
            <Text className="text-center text-lg text-dark">Celular</Text>
            <TextInput
              onChangeText={onChangeNumber}
              value={number}
              keyboardType="phone-pad"
              placeholderTextColor={'#ffffff'}
              className="flex justify-center align-middle m-auto h-auto p-1 pb-3 pl-3 text-xl border mt-3 w-9/12 text-center rounded-full bg-dark text-light font-bold"
            />
          </View>
          <TouchableOpacity
            onPress={() => parseLogin(number, updateFunction[0])}
            style={styles.shadow}
            className="flex justify-center align-middle p-2 bg-highlight text-dark rounded-full m-auto mt-6 shadow-2xl">
            <Text className="flex align-middle m-auto text-xl text-dark px-8">
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
