import React, {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Localizations} from '../utils/Localizations';
import {DangerLevel, RiskMeterProps} from '../utils/Types';

export default function RiskMeter({status, reportFunction}: RiskMeterProps) {
  return (
    <View className="flex flex-row my-auto justify-center mb-2 max-h-fit">
      <Text
        className={
          'text-light text-lg font-bold max-w-[50%]' +
          (Localizations.getLanguage() == 'en' ? ' my-auto py-0 mt-0' : '')
        }>
        {Localizations.riskMeter.split('{')[0]}
        <Text className="font-bold">
          {status === DangerLevel.SAFE
            ? Localizations.safe
            : status === DangerLevel.RISK
            ? Localizations.risk
            : Localizations.danger}
        </Text>
        {Localizations.riskMeter.split('}')[1]}
      </Text>
      <View className="ml-24 -mt-1">
        <TouchableOpacity onPress={reportFunction}>
          <View
            className={
              'p-3 pt-2 rounded-full w-16 mx-auto ' +
              (status === DangerLevel.SAFE
                ? 'bg-green-500'
                : status === DangerLevel.RISK
                ? 'bg-yellow-500'
                : 'bg-red-500')
            }>
            <Icon color="#f1eeff" size={40} name="alert-triangle" />
          </View>
        </TouchableOpacity>
        <Text className="text-light mx-auto mt-2 text-lg font-bold">
          {Localizations.report}
        </Text>
      </View>
      <View />
    </View>
  );
}
