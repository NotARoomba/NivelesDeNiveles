import {
  Alert,
  Button,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useCameraDevice,
  Camera,
  useCameraPermission,
} from 'react-native-vision-camera';
import {EvidenceProps} from '../utils/Types';
import {useEffect, useState} from 'react';
import CameraPanel from './CameraPanel';

export default function Evidence({evidence, onChangeEvidence, setCameraOpen, cameraOpen, submitReport}: EvidenceProps) {
  const [cameraPerms, setCameraPerms] = useState(false);

  const {hasPermission, requestPermission} = useCameraPermission();
  useEffect(() => {
    async function updatePerms() {
      if (hasPermission || (await requestPermission())) {
        setCameraPerms(true);
      } else {
        Alert.alert(
          'Activa Camera',
          'Niveles de Niveles nessecita tu nessecita tu camara para tomar foto del incidente!',
          [
            {
              text: 'Cancel',
              onPress: () => 1,
            },
            {
              text: 'Grant',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
      }
    }
    updatePerms();
  }, []);
  
  return (
    <View className="justify-around">
      {!cameraPerms ? (
        <TextInput
          onChangeText={onChangeEvidence}
          value={evidence}
          keyboardType="default"
          placeholderTextColor={'#ffffff'}
          multiline
          className="flex justify-center align-middle my-auto h-10 pl-3 py-0 text-lg border mt-3 w-12/12 rounded-full bg-main text-light font-bold"
        />
      ) : (
        <View className="flex justify-around flex-row mt-2">
          <TouchableOpacity
            className=" px-3 rounded-full bg-dark w-4/12 m-auto"
            onPress={e => {
              e.preventDefault();
                setCameraOpen(!cameraOpen);
            }}>
            <Text className="text-light  text-lg font-semibold text-center">
              Toma Foto
            </Text>
          </TouchableOpacity>
          {evidence.length !== 0 ? (
            <Text className="text-dark/80 text-lg m-auto">
              Photo: {(evidence.length/1000).toFixed(2)} KB
            </Text>
          ) : (
            <></>
          )}
         {cameraOpen ? <CameraPanel cameraOpen={cameraOpen} onChangeEvidence={onChangeEvidence} setCameraOpen={setCameraOpen} /> : <></>}
        </View>
      )}

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
