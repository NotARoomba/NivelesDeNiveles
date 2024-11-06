import {ScrollView, Text, View} from 'react-native';
import Sensor from '../../backend/old/models/sensor';
import {Localizations} from '../utils/Localizations';
import {DangerLevel, DangerType} from '../utils/Types';

export default function Sensors({sensors}: {sensors: Sensor[]}) {
  return (
    <View className="max-h-[200px]">
      <ScrollView className="flex justify-left mt-2.5 pr-4 max-h-[200px]">
        {sensors.map((s, i) => (
          <View
            key={i}
            className="flex flex-row justify-start border-t-4 rounded-sm border-accent py-2">
            <View className="text-center justify-center w-1/3 m-auto">
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
            <View className="text-center justify-center w-1/3 mx-3">
              <Text className="text-light text-lg text-center">
                {Localizations.formatString(
                  Localizations.sensorType,
                  s.type === DangerType.FLOOD
                    ? Localizations.flood
                    : s.type === DangerType.FIRE
                    ? Localizations.fire
                    : Localizations.avalanche,
                )}
              </Text>
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
            <View className="text-center justify-center w-1/3 m-auto">
              <Text className="text-light text-lg font-bold text-center">
                {s.status === DangerLevel.SAFE
                  ? Localizations.safe
                  : s.status === DangerLevel.RISK
                  ? Localizations.risk_only
                  : Localizations.danger_only}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
