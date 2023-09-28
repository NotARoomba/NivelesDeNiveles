import {View, Text, ScrollView} from 'react-native';
import Sensor from '../../backend/models/sensor';
import {DangerLevel} from '../utils/Types';
import {PanResponder} from 'react-native';

export default function Sensors({sensors}: {sensors: Sensor[]}) {
  return (
    <View className="max-h-[200px]">
      <ScrollView className="flex justify-left mt-2.5 pr-4 max-h-[200px]">
        {sensors.map((s, i) => (
          <View
            key={i}
            className="flex flex-row justify-start border-t-4 rounded-sm border-accent py-2">
            <View className="text-center justify-center w-1/2 m-auto">
              <Text className="text-light text-lg text-center ">{s.name}</Text>
            </View>
            <View
              className={
                'w-1 rounded ' +
                (s.status === DangerLevel.SAFE
                  ? 'bg-green-500'
                  : s.status === DangerLevel.RISK
                  ? 'bg-yellow-500'
                  : 'bg-red-500')
              }
            />
            <View className="text-center justify-center w-1/2 m-auto">
              <Text className="text-light text-lg font-bold text-center">
                {s.status === DangerLevel.SAFE
                  ? 'Segura'
                  : s.status === DangerLevel.RISK
                  ? 'Riesgo'
                  : 'Peligro'}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
