import React, {View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {ReportProps} from '../utils/Types';

export default function Report({reportFunction}: ReportProps) {
  return (
    <View className="bg-accent">
      <View className="flex flex-row my-auto mt-2.5">
        <View className="w-2/5 align-middle">
          <TouchableOpacity
            onPress={reportFunction}
            className="ml-4 -mt-0.5 max-w-[40px]">
            <Icon name="arrow-left" color="#180155" size={40} />
          </TouchableOpacity>
        </View>
        <Text className="text-2xl w-1/2 -ml-2  font-bold">Reporta</Text>
      </View>
    </View>
  );
}
