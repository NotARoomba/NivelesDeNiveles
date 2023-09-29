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
import {callAPI, getData} from '../utils/Functions';
import User from '../../backend/models/user';
import ReportType from '../../backend/models/report';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import Evidence from './Evidence';

export default function Report({reportFunction, cameraOpen, setCameraOpen}: ReportProps) {
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
    const reporter: User = (
      await callAPI('/users/' + (await getData('number')), 'GET')
    ).user;
    console.log(evidence)
    const res = await callAPI(
      '/report/',
      'POST',
      new ReportType(
        reporter.number,
        dangerSelected,
        levelSelected,
        Date.now(),
        evidence,
        reporter.location,
      ),
    );
    if (!res.error) return Alert.alert('Éxito!', res.msg);
    else return Alert.alert('Error!', res.msg);
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
        <Evidence evidence={evidence} onChangeEvidence={onChangeEvidence} cameraOpen={cameraOpen} setCameraOpen={setCameraOpen} />
      </View>
      <View className="justify-center p-1 mt-2 -z-10">
        <TouchableOpacity
          className="p-3 bg-main w-3/5 m-auto rounded-full"
          onPress={submitReport}>
          <Text className="text-2xl text-accent text-center">Reporta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
