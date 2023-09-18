import React, {View, Text} from 'react-native';
import {RiskMeterProps} from '../utils/Types';
import RiskMeter from './RiskMeter';
import Advice from './Advice';
import {useState} from 'react';

export default function Status({reportFunction, status}: RiskMeterProps) {
  const [isOpen, setOpen] = useState(false);
  return (
    <View className="p-3 pt-0">
      <View>
        <RiskMeter status={status} reportFunction={reportFunction} />
        <Text className="text-light mx-auto mr-4 justify-start text-lg font-bold">
          Reportar
        </Text>
      </View>
      <View>
        <Text className="text-xl text-accent font-semibold ml-5">
          ¿Qué puedes hacer?
        </Text>
        <Advice status={status} isOpen={isOpen} setOpen={setOpen} />
      </View>
    </View>
  );
}
