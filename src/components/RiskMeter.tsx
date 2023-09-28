import React, {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {DangerLevel, RiskMeterProps} from '../utils/Types';

export default function RiskMeter({status, reportFunction}: RiskMeterProps) {
  return (
    <View className="flex flex-row my-auto justify-center mb-2">
      <Text className="text-light text-lg font-bold max-w-[50%]">
        Te encuentras en una zona:{' '}
        <Text className="font-bold">
          {status === DangerLevel.SAFE
            ? 'seguro'
            : status === DangerLevel.RISK
            ? 'riesgo'
            : 'peligro'}
        </Text>
      </Text>
      <View className="ml-24 -mt-1">
        <TouchableOpacity onPress={reportFunction}>
          <View
            className={
              'p-3 pt-2 rounded-full ' +
              (status === DangerLevel.SAFE
                ? 'bg-green-500'
                : status === DangerLevel.RISK
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
