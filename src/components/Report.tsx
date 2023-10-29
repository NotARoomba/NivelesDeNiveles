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
import { Localizations } from '../utils/Localizations';
import STATUS_CODES from '../../backend/models/status';

export default function Report({
  reportFunction,
  cameraOpen,
  setCameraOpen,
}: ReportProps) {
  const [dangerSelected, setDangerSelected] = useState<DangerType>(
    DangerType.FLOOD,
  );
  const [levelSelected, setLevelSelected] = useState<DangerLevel>(
    DangerLevel.SAFE,
  );
  const [evidence, onChangeEvidence] = useState('');
  const submitReport = async () => {
    if (evidence === '') {
      return Alert.alert(Localizations.missingInformationTitle, Localizations.missingInformationDesc);
    }
    const user = (await callAPI('/users/' + (await getData('number')), 'GET'))
      .user;
    const res = await callAPI(
      '/report/',
      'POST',
      new ReportType(
        user.number,
        dangerSelected,
        levelSelected,
        Date.now(),
        evidence,
        false,
        user.location,
      ),
    );
    if (res.status == STATUS_CODES.SUCCESS) return Alert.alert(Localizations.success);
    else if(res.status== STATUS_CODES.MISMATCHED_IMAGE) return Alert.alert(Localizations.error, Localizations.formatString(Localizations.getString(STATUS_CODES[res.status]), (dangerSelected === DangerType.FLOOD
      ? Localizations.flood.toLocaleLowerCase()
      : dangerSelected === DangerType.FIRE
      ? Localizations.fire.toLocaleLowerCase()
      : Localizations.avalanche.toLocaleLowerCase())) as string);
    else return Alert.alert(Localizations.error, Localizations.getString(STATUS_CODES[res.status]));
  };

  return (
    <View className="bg-accent pt-0">
      <View className="flex flex-row my-auto mt-2.5">
        <View className="w-2/5 align-middle">
          <TouchableOpacity
            onPress={reportFunction}
            className="-mt-0.5 pl-3 max-w-[47px]">
            <Icon name="arrow-left" color="#180155" size={40} />
          </TouchableOpacity>
        </View>
        <Text className="text-2xl w-1/2 font-bold text-dark">{Localizations.report}</Text>
      </View>
      <View className="justify-center p-1 pl-0 w-screen">
        <Text className="text-2xl text-center mt-4 justify-around flex flex-row text-dark">{Localizations.type}</Text>
        <View className="flex flex-row justify-around mt-4">
          {[DangerType.FLOOD, DangerType.FIRE, DangerType.AVALANCHE].map(
            (v, i) => (
              <View className='justify-center' key={i}>
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
              <Text className='text-dark mx-auto mt-1'>{v === DangerType.FLOOD
                    ? Localizations.flood
                    : v === DangerType.FIRE
                    ? Localizations.fire
                    : Localizations.avalanche}</Text>

</View>
            ),
          )}
        </View>
      </View>
      {/* <View className="justify-center p-1">
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
      </View> */}
      <View className="justify-center p-1 pl-0 mt-4">
        <Text className="text-2xl text-center mt-4 text-dark">{Localizations.evidence}</Text>
        <Evidence
          evidence={evidence}
          onChangeEvidence={onChangeEvidence}
          cameraOpen={cameraOpen}
          setCameraOpen={setCameraOpen}
          submitReport={submitReport}
        />
      </View>
    </View>
  );
}
