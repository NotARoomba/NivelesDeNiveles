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
import {Localizations} from '../utils/Localizations';
import {FunctionScreenProp, styles} from '../utils/Types';
import prompt from '@powerdesigninc/react-native-prompt';
import {callAPI, storeData} from '../utils/Functions';
import SplashScreen from 'react-native-splash-screen';
import STATUS_CODES from '../../backend/models/status';
import Spinner from 'react-native-loading-spinner-overlay';

async function checkLogin(
  number: string,
  code: string,
  updateLogged: Function,
) {
  const check = await callAPI('/verify/check', 'POST', {number, code});
  if (check.status == STATUS_CODES.SUCCESS) {
    await storeData('number', number);
    await callAPI('/users', 'POST', {
      number,
      location: {type: 'Point', coordinates: [0, 0]},
    });
    updateLogged(true);
  } else {
    return Alert.alert(
      Localizations.error,
      Localizations.getString(STATUS_CODES[check.status]),
    );
  }
}

async function parseLogin(
  number: string,
  updateLogged: Function,
  setIsLoading: Function,
) {
  const res = await callAPI('/verify/send', 'POST', {number});
  if (res.status == STATUS_CODES.SUCCESS) {
    setIsLoading(false);
    setTimeout(() => {
      return prompt(
        Localizations.enterCodeTitle,
        Localizations.enterCodeDesc + number,
        async input => await checkLogin(number, input, updateLogged),
        'plain-text',
        '',
        'number-pad',
      );
    }, 250);
  } else {
    setIsLoading(false);
    setTimeout(() => { return Alert.alert(
      Localizations.error,
      Localizations.getString(STATUS_CODES[res.status]),
    );
    }, 250);
  }
}

export default function Login({
  isDarkMode,
  updateFunction,
}: FunctionScreenProp) {
  const [number, onChangeNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('🇨🇴+57');
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <SafeAreaView className=" bg-light">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView className="pb-[1000px]">
        <Spinner
          visible={isLoading}
          overlayColor="#00000099"
          textContent={Localizations.sending}
          textStyle={{color: '#fff', marginTop: -50}}
          animation="fade"
        />
        <View className="flex justify-center align-left mt-0">
          <Image
            source={require('../../public/logo.png')}
            className="flex h-36 w-11/12 align-middle justify-center m-auto mt-16 bg-inherit"
            resizeMode={'contain'}
          />
          <View className="justify-center pt-12 mt-16">
            <Text className="text-center text-lg text-dark">
              {Localizations.phoneNumber}
            </Text>
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
                Alert.alert(
                  Localizations.error,
                  Localizations.selectCountryCode,
                );
              } else {
                setDisable(true);
                setIsLoading(true);
                parseLogin(
                  countryCode.slice(4) + number,
                  updateFunction,
                  setIsLoading,
                ).then(() => {
                  setDisable(false);
                });
              }
            }}
            style={styles.shadow}
            className="flex justify-center align-middle p-2 bg-highlight text-dark rounded-full m-auto mt-6 shadow-2xl">
            <Text className="flex align-middle m-auto text-xl text-dark px-8">
              {Localizations.loginButton}
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
            lang={Localizations.getLanguage()}
            style={{modal: {height: 500}}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
