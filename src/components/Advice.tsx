import React, {View, Text, TouchableOpacity, Animated, Image, Modal, Linking} from 'react-native';
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
      useNativeDriver: false,
    }).start();
    Animated.timing(growValue, {
      // todo hae to set values for each text sadly
      // LOOK HERE FROM THE WARNING BELOW
      toValue: isOpen
        ? 0
        : status === DangerLevel.SAFE
        ? 108
        : status === DangerLevel.RISK
        ? 108
        : 108,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };
  const [modalOpen, setModalOpen] = useState(false);
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
        <Animated.View
          style={{height: growValue}}
          className="justify-center px-1">
          <Text className="text-dark text-center text-lg">
            {status === DangerLevel.SAFE
              ? Localizations.recommendationsForSafe
              : status === DangerLevel.RISK
              ? Localizations.recommendationsForRisk
              : Localizations.recommendationsForDanger}
          </Text>
          <TouchableOpacity className={'mx-auto rounded-xl mt-2 ' +  (status === DangerLevel.SAFE
                ? 'bg-green-500'
                : status === DangerLevel.RISK
                ? 'bg-yellow-500'
                : 'bg-red-500')} onPress={() => setModalOpen(!modalOpen)}>
            <Text className='text-lg py-1 px-5  font-semibold text-light'>
            {Localizations.moreInformation}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <Modal
      animationType="fade"
      visible={modalOpen}
      style={{backgroundColor: '#000000'}}
      transparent
      onRequestClose={() => {
        setModalOpen(!modalOpen);
      }}>
      <View className="flex justify-center bg-light/70 h-screen">
        <View className="flex jutify-center align-middle m-auto bg-light w-10/12 rounded-xl shadow-xl p-3">
          {/* <Image
            source={require('../../public/icon.png')}
            className="h-32 aspect-square mx-auto mt-4"
          /> */}
          <View className='justify-center mx-auto'>
          <Icon color={status === DangerLevel.SAFE
                ? '#22c55e'
                : status === DangerLevel.RISK
                ? '#eab308'
                : '#ef4444'} size={100} name="info" />
          </View>
          <View className="flex flex-col">
            <Text className="m-auto mt-2 text-3xl text-center font-bold text-dark  ">
            {Localizations.formatString(
              Localizations.recommendationsForZoneTitle,
              status === DangerLevel.SAFE
                ? Localizations.safe
                : status === DangerLevel.RISK
                ? Localizations.risk
                : Localizations.danger,
            )}
            </Text>
            <Text className="m-auto mt-2 text-black text-center text-lg my-2 mb-8 px-8">
            {status === DangerLevel.SAFE
              ? Localizations.moreInformationSafe
              : status === DangerLevel.RISK
              ? Localizations.moreInformationRisk
              : Localizations.moreInformationDanger}{" "}<Text className='underline'
      onPress={() => Linking.openURL('https://nivelesdeniveles.org/advice')}>
  {Localizations.moreInformation}
  </Text>
            </Text>
           
          </View>
          <View className="flex flex-row justify-center gap-4 mb-8">
            <TouchableOpacity
              onPress={() => setModalOpen(!modalOpen)}
              className=" bg-dark  flex justify-center align-middle p-2 rounded w-32">
              <Text className="text-xl text-light m-auto font-bold">
                {Localizations.close}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    </TouchableOpacity>
  );
}
