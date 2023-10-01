import {Animated, TouchableOpacity, View} from 'react-native';
import {CameraPanelProps} from '../utils/Types';
import {useState, useRef, useCallback} from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/Feather';

export default function CameraPanel({
  cameraOpen,
  onChangeEvidence,
  setCameraOpen,
}: CameraPanelProps) {
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');

  const format = useCameraFormat(device, [
    {photoResolution: {height: 1280, width: 720}},
  ]);

  const photo = () => {
    camera.current
      ?.takePhoto({
        enableAutoStabilization: true,
        qualityPrioritization: 'speed',
      })
      .then(photo => {
        RNFS.readFile(photo.path, 'base64').then(res => {
          onChangeEvidence(res);
          setCameraOpen(false);
        });
      });
  };
  return (
    <Animated.View className="w-screen h-screen absolute -right-3 -bottom-[92px] rounded-t-3xl transition-all duration-200 bg-light">
      <TouchableOpacity
        className="m-4 w-1/5 absolute z-10"
        onPress={() => setCameraOpen(false)}>
        <Icon name="x" size={40} color={'#ffffff'} />
      </TouchableOpacity>
      {device ? (
        <View className="">
          <Camera
            ref={camera}
            format={format}
            device={device}
            isActive={true}
            photo
            enableZoomGesture={true}
            className="w-full h-full"
          />
          <TouchableOpacity
            className="z-10 absolute left-1/2 -translate-x-8 bottom-16"
            onPress={() => photo()}>
            <Icon name="circle" size={72} color={'#ffffff'} />
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </Animated.View>
  );
}
