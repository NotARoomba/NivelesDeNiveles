import React, {View, Text} from 'react-native';
import {RiskMeterProps} from '../utils/Types';
import RiskMeter from './RiskMeter';

export default function Status({reportFunction, status}: RiskMeterProps) {
  return (
    <View>
      <RiskMeter status={status} reportFunction={reportFunction} />
      <Text className="text-light mx-auto mr-5 justify-start text-lg font-bold">
        Reportar
      </Text>
    </View>
  );
}
