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
      </View>
      <View>
        <Text className="text-xl text-accent font-semibold ml-5 mt-0">
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
          Nuestros sensores
        </Text>
        {locationData.sensors.length > 0 ? (
          <Sensors sensors={locationData.sensors} />
        ) : (
          <Text className="text-lg text-accent font-semibold mt-2">
            No hay sensores cerca de ti!
          </Text>
        )}
      </View>
    </View>
  );
}
