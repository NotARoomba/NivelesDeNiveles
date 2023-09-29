import { Animated, TouchableOpacity, View } from "react-native"
import { CameraPanelProps } from "../utils/Types";
import { useState, useRef, useCallback } from "react";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/Feather'

export default function CameraPanel({isOpen, onChangeEvidence, setIsOpen}: CameraPanelProps) {
    const [isInitialized, setIsInitialized] = useState(false);
    const camera = useRef<Camera>(null);
    const device = useCameraDevice('back');
    const onInitialized = useCallback(() => {
      console.log('Camera initialized!');
      setIsInitialized(true);
    }, []);
    camera.current
    ?.takePhoto({
      enableAutoStabilization: true,
      qualityPrioritization: 'quality',
    })
    .then(photo => {
      console.log(photo.path);
      RNFS.readFile(photo.path, 'base64').then(res => {
        onChangeEvidence(res);
        setIsOpen(false);
      });
    });
    return <Animated.View className='w-screen h-screen absolute -right-3 -bottom-20 rounded-t-3xl transition-all duration-200 bg-light'>
        <TouchableOpacity className="m-2 w-1/5" onPress={() => setIsOpen(false)}>
            <Icon name="x" size={40} />
        </TouchableOpacity>
        {device ? 
        (<View className="">
            <Camera device={device} isActive={true} className="w-screen h-full" />
            <TouchableOpacity className="z-10 absolute left-1/2 -translate-x-1/2">
                <Icon name="circle" size={72} />
            </TouchableOpacity>
        </View> ): (<></>)}
    </Animated.View>
}