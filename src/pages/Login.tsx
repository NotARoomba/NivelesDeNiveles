import React, {useEffect, useState} from 'react';
import {CountryPicker} from 'react-native-country-codes-picker';
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
import {FunctionScreenProp, styles} from '../utils/Types';
import prompt from '@powerdesigninc/react-native-prompt';
import {callAPI, storeData} from '../utils/Functions';
import SplashScreen from 'react-native-splash-screen';

async function checkLogin(
  number: string,
  code: string,
  updateLogged: Function,
) {
  const check = await callAPI('/verify/check', 'POST', {number, code});
  if (!check.error) {
    await storeData('number', number);
    await callAPI('/users', 'POST', {
      number,
      location: {type: 'Point', coordinates: [0, 0]},
    });
    updateLogged(true);
  } else {
    return Alert.alert('Error', check.msg);
  }
}

async function parseLogin(number: string, updateLogged: Function) {
  const res = await callAPI('/verify/send', 'POST', {number});
  if (!res.error) {
    return prompt(
      'Enter Code',
      'Enter the verification code that was sent to ' + number,
      async input => await checkLogin(number, input, updateLogged),
      'plain-text',
      '',
      'number-pad',
    );
  } else {
    return Alert.alert('Error', res.msg);
  }
}

export default function Login({
  isDarkMode,
  updateFunction,
}: FunctionScreenProp) {
  const [number, onChangeNumber] = useState('');
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('🇨🇴+57');
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    SplashScreen.hide();
  }, [])
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
            <View className="flex flex-row justify-center m-auto align-middle">
              <TouchableOpacity
                onPress={() => setShow(!show)}
                className=" bg-accent text-center align-middle p-1 h-12 mt-3 w-3/12 rounded-l-full">
                <Text className="align-middle m-auto text-xl text-dark font-bold">
                  {countryCode}
                </Text>
              </TouchableOpacity>
              <TextInput
                onChangeText={onChangeNumber}
                value={number}
                keyboardType="phone-pad"
                placeholderTextColor={'#ffffff'}
                className="flex justify-center align-middle my-auto ml-0 h-12 p-1 pb-2.5 pl-3 text-xl border mt-3 w-8/12 rounded-full rounded-l-none bg-dark text-light font-bold"
              />
            </View>
          </View>
          <TouchableOpacity
            disabled={disable}
            onPress={() => {
              if (countryCode === '') {
                Alert.alert('Error', 'Selecciona tu código de país.');
              } else {
                setDisable(true);
                parseLogin(
                  countryCode.slice(4) + number,
                  updateFunction[0],
                ).then(() => {
                  setDisable(false);
                });
              }
            }}
            style={styles.shadow}
            className="flex justify-center align-middle p-2 bg-highlight text-dark rounded-full m-auto mt-6 shadow-2xl">
            <Text className="flex align-middle m-auto text-xl text-dark px-8">
              Entrar
            </Text>
          </TouchableOpacity>
          <CountryPicker
            show={show}
            // when picker button press you will get the country object with dial code
            pickerButtonOnPress={item => {
              setCountryCode(item.flag + item.dial_code);
              setShow(!show);
            }}
            onBackdropPress={() => setShow(!show)}
            lang={'es'}
            style={{modal: {height: 500}}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
