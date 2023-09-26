import React, {View, Text} from 'react-native';
import {RiskMeterProps, StatusProps} from '../utils/Types';
import RiskMeter from './RiskMeter';
import Advice from './Advice';
import {useState} from 'react';
import Sensors from './Sensors';

export default function Status({reportFunction, locationData}: StatusProps) {
  const [isOpen, setOpen] = useState(false);
  return (
    <View className="p-3 pt-0">
      <View>
        <RiskMeter
          status={locationData.status}
          reportFunction={reportFunction}
        />
        <Text className="text-light mx-auto mr-4 justify-start text-lg font-bold">
          Reportar
        </Text>
      </View>
      <View>
        <Text className="text-xl text-accent font-semibold ml-5">
          ¿Qué puedes hacer?
        </Text>
        <Advice
          status={locationData.status}
          isOpen={isOpen}
          setOpen={setOpen}
        />
      </View>
      <View className="mt-5 ml-5">
        <Text className="text-xl text-accent font-semibold">
          Nuestros Sensores
        </Text>
        <Sensors sensors={locationData.sensors} />
      </View>
    </View>
  );
}
