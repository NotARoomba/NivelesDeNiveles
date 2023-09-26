import React, {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {DangerLevel, DangerType, ReportProps} from '../utils/Types';
import DangerTypeButton from './DangerTypeButton';
import {useState} from 'react';
import DangerLevelButton from './DangerLevelButton';
import { callAPI, getData } from '../utils/Functions';
import User from '../../backend/models/user';

export default function Report({reportFunction}: ReportProps) {
  const [dangerSelected, setDangerSelected] = useState<DangerType>(
    DangerType.FLOOD,
  );
  const [levelSelected, setLevelSelected] = useState<DangerLevel>(
    DangerLevel.SAFE,
  );
  const [evidence, onChangeEvidence] = useState('');
  const submitReport = async () => {
    if (evidence === '') {
      return Alert.alert('Falta Informacion', 'Por favor llena la evidencia');
    }
    const reporter: User = (await callAPI('/users/' + (await getData('number')), 'GET')).user
    await callAPI('/report/', 'POST', {reporter: reporter.number, location: reporter.location, type: dangerSelected, level: levelSelected})
  };
  return (
    <View className="bg-accent p-3 pt-0">
      <View className="flex flex-row my-auto mt-2.5">
        <View className="w-2/5 align-middle">
          <TouchableOpacity
            onPress={reportFunction}
            className="-mt-0.5 max-w-[40px]">
            <Icon name="arrow-left" color="#180155" size={40} />
          </TouchableOpacity>
        </View>
        <Text className="text-2xl w-1/2 -ml-2 font-bold">Reporta</Text>
      </View>
      <View className="justify-center p-1">
        <Text className="text-2xl text-center mt-4">Tipo</Text>
        <View className="flex flex-row justify-around mt-4">
          {[DangerType.FLOOD, DangerType.FIRE, DangerType.AVALANCHE].map(
            (v, i) => (
              <DangerTypeButton
                key={i}
                type={v}
                onPress={setDangerSelected}
                icon={
                  v === DangerType.FLOOD
                    ? 'house-flood-water'
                    : v === DangerType.FIRE
                    ? 'fire'
                    : 'hill-avalanche'
                }
                isSelected={dangerSelected === v}
              />
            ),
          )}
        </View>
      </View>
      <View className="justify-center p-1">
        <Text className="text-2xl text-center mt-4">Nivel de Peligro</Text>
        <View className="flex flex-row justify-around mt-4">
          {[DangerLevel.SAFE, DangerLevel.RISK, DangerLevel.DANGER].map(
            (v, i) => (
              <DangerLevelButton
                key={i}
                level={v}
                onPress={setLevelSelected}
                isSelected={levelSelected === v}
                color={
                  v === DangerLevel.SAFE
                    ? 'bg-green-500'
                    : v === DangerLevel.RISK
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }
              />
            ),
          )}
        </View>
      </View>
      <View className="justify-center p-1">
        <Text className="text-2xl text-center mt-4">Evidencia</Text>
        <TextInput
          onChangeText={onChangeEvidence}
          value={evidence}
          keyboardType="default"
          placeholderTextColor={'#ffffff'}
          multiline
          className="flex justify-center align-middle my-auto h-10 pl-3 py-0 text-lg border mt-3 w-12/12 rounded-full bg-main text-light font-bold"
        />
      </View>
      <View className="justify-center p-1 mt-2">
        <TouchableOpacity
          className="p-3 bg-main w-3/5 m-auto rounded-full"
          onPress={submitReport}>
          <Text className="text-2xl text-accent text-center">Reporta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
