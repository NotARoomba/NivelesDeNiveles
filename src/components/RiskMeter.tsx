import React, {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {RiskMeterProps} from '../utils/Types';

export default function RiskMeter({status, reportFunction}: RiskMeterProps) {
  return (
    <View className="flex flex-row my-auto justify-center mb-2">
      <Text className="text-light text-lg font-medium max-w-[50%]">
        Tu encuentras en una zona{' '}
        <Text className="font-bold">
          {status === 0 ? 'seguro' : status === 1 ? 'riesgo' : 'peligro'}
        </Text>
      </Text>
      <View className="ml-20">
        <TouchableOpacity onPress={reportFunction}>
          <View
            className={
              'p-2 pt-1 rounded-full ' +
              (status === 0
                ? 'bg-green-500'
                : status === 1
                ? 'bg-yellow-500'
                : 'bg-red-500')
            }>
            <Icon color="#f1eeff" size={40} name="alert-triangle" />
          </View>
        </TouchableOpacity>
      </View>
      <View />
    </View>
  );
}
