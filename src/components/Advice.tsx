import React, {View, Text, TouchableOpacity, Animated, Image, Modal} from 'react-native';
import {AdviceProps, DangerLevel} from '../utils/Types';
import Icon from 'react-native-vector-icons/Feather';
import {useEffect, useRef, useState} from 'react';
import {Localizations} from '../utils/Localizations';

export default function Advice({status, isOpen, setOpen}: AdviceProps) {
  const flipValue = useRef(new Animated.Value(0)).current;
  const flip = flipValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const growValue = useRef(new Animated.Value(0)).current;
  //   const grow = growValue.interpolate({
  //     inputRange: [0, 1],
  //     outputRange: ['0%', '100%'],
  //   });
  const changeOpen = () => {
    setOpen(!isOpen);
    Animated.timing(flipValue, {
      toValue: isOpen ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
    Animated.timing(growValue, {
      // todo hae to set values for each text sadly
      // LOOK HERE FROM THE WARNING BELOW
      toValue: isOpen
        ? 0
        : status === DangerLevel.SAFE
        ? 64
        : status === DangerLevel.RISK
        ? 64
        : 64,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };
  const title = useState('');
  const description = useState('');
  useEffect(() => {

  }, [status])
  return (
    <TouchableOpacity className="mt-3" onPress={changeOpen}>
      <View className="bg-highlight p-2 py-3 rounded-xl w-11/12 m-auto justify-center">
        <View className="flex flex-row justify-center">
          <Text
            className={
              'text-dark text-lg' + (isOpen ? ' font-bold' : ' font-medium')
            }>
            {Localizations.formatString(
              Localizations.recommendationsForZoneTitle,
              status === DangerLevel.SAFE
                ? Localizations.safe
                : status === DangerLevel.RISK
                ? Localizations.risk
                : Localizations.danger,
            )}
          </Text>
          <Animated.View style={{transform: [{rotate: flip}]}}>
            <Icon name="chevron-down" size={30} />
          </Animated.View>
        </View>
        <Modal
      animationType="fade"
      visible={isOpen}
      style={{backgroundColor: '#000000'}}
      transparent
      onRequestClose={() => {
        setOpen(!isOpen);
      }}>
      <View className="flex justify-center bg-light/70 h-screen">
        <View className="flex jutify-center align-middle m-auto bg-light w-9/12 rounded-xl shadow-xl">
          <Image
            source={require('../../public/icon.png')}
            className="h-32 aspect-square mx-auto mt-4"
          />
          <View className="flex flex-col">
            <Text className="m-auto mt-2 text-2xl font-bold text-dark  ">
              {title}
            </Text>
            <Text className="m-auto mt-2 text-black text-center text-lg my-2 mb-8 px-8">
              {description}
            </Text>
          </View>
          <View className="flex flex-row justify-center gap-4 mb-8">
            <TouchableOpacity
              onPress={() => setOpen(!isOpen)}
              className=" bg-dark  flex justify-center align-middle p-2 rounded w-32">
              <Text className="text-xl text-light m-auto font-bold">
                {Localizations.done}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
        {/* <Animated.View
          style={{height: growValue}}
          className="justify-center px-1">
          <Text className="text-dark text-left text-lg">
            {status === DangerLevel.SAFE
              ? Localizations.recommendationsForSafe
              : status === DangerLevel.RISK
              ? Localizations.recommendationsForRisk
              : Localizations.recommendationsForDanger}
          </Text>
        </Animated.View> */}
      </View>
    </TouchableOpacity>
  );
}
