import React, {View, Text, TouchableOpacity, Animated, Easing} from 'react-native';
import {AdviceProps} from '../utils/Types';
import Icon from 'react-native-vector-icons/Feather';
import {useRef} from 'react';

export default function Advice({status, isOpen, setOpen}: AdviceProps) {
  const flipValue = useRef(new Animated.Value(0)).current;
  const flip = flipValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const growValue = useRef(new Animated.Value(0)).current;
  const grow = growValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  const changeOpen = () => {
    setOpen(!isOpen);
    Animated.timing(flipValue, {
      toValue: isOpen ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
    Animated.timing(growValue, {
      // todo hae to set values for each text sadly
      toValue: isOpen ? 0 : 1,
      duration: 300,
      easing: Easing.circle,
      useNativeDriver: false,
    }).start();
    console.log(growValue);
  };
  return (
    <TouchableOpacity className="mt-3" onPress={changeOpen}>
      <View className="bg-highlight p-2 py-3 rounded-xl w-11/12 m-auto justify-center">
        <View className="flex flex-row justify-center">
          <Text
            className={
              'text-dark text-lg' + (isOpen ? ' font-bold' : ' font-medium')
            }>
            Recomendaciones Zona{' '}
            {status === 0 ? 'Segura' : status === 1 ? 'Riesgo' : 'Peligro'}
          </Text>
          <Animated.View style={{transform: [{rotate: flip}]}}>
            <Icon name="chevron-down" size={30} />
          </Animated.View>
        </View>
        <Animated.View
          style={{maxHeight: grow}}
          className="justify-center px-1">
          <Text className="text-dark text-left text-lg">
            Estas en una zona segura, no hay nada a preocuparte!
          </Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}
