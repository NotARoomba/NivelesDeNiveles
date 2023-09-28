import { Alert, Button, Linking, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useCameraDevice, Camera, useCameraPermission } from "react-native-vision-camera"
import { EvidenceProps } from "../utils/Types"
import { useCallback, useEffect, useRef, useState } from "react"
import GetLocation from "react-native-get-location"
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions"
import { callAPI } from "../utils/Functions"
import RNFS from 'react-native-fs'


export default function Evidence({evidence, onChangeEvidence}: EvidenceProps) {
    const device = useCameraDevice('back')
    const [cameraPerms, setCameraPerms] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const camera = useRef<Camera>(null)
    const { hasPermission, requestPermission } = useCameraPermission()
    useEffect(() => {
        async function updatePerms() {
            if (hasPermission || await requestPermission()) {
                setCameraPerms(true)
            } else {
                Alert.alert(
                    'Activa Camera',
                    'Niveles de Niveles nessecita tu nessecita tu camara para tomar foto del incidente!',
                    [
                        {
                          text: 'Cancel',
                          onPress: () => setIsActive(false),
                        },
                        {
                          text: 'Grant',
                          onPress: () => Linking.openSettings(),
                        },
                      ],
                );
            }
        }
        updatePerms()
    }, [])
    camera.current?.takePhoto({
        enableAutoStabilization: true,
        qualityPrioritization: 'quality'
    }).then(photo => {
        console.log(photo.path)
        RNFS.readFile(photo.path, 'base64').then(res =>{
            onChangeEvidence(res);
            setIsActive(false)
        });
    })
    const onInitialized = useCallback(() => {
        console.log('Camera initialized!')
        setIsInitialized(true)
      }, [])
    return  <View className="justify-around">
        {!cameraPerms ? <TextInput
        onChangeText={onChangeEvidence}
        value={evidence}
        keyboardType="default"
        placeholderTextColor={'#ffffff'}
        multiline
        className="flex justify-center align-middle my-auto h-10 pl-3 py-0 text-lg border mt-3 w-12/12 rounded-full bg-main text-light font-bold"
        /> : cameraPerms ? <View className="flex justify-center flex-row mt-5">
            <TouchableOpacity className=" px-3 rounded-full bg-dark w-4/12 m-auto" onPress={(e) => {e.preventDefault(); if (isInitialized) {setIsActive(!isActive)}}}>
                <Text className="text-light text-lg font-semibold text-center">Toma Foto</Text>
            </TouchableOpacity>
            {evidence.length !== 0 ? <Text className="text-dark/80 text-lg">Photo: {evidence.length} bytes</Text>: <></>}
            {device != null ? <Camera device={device} onInitialized={onInitialized} ref={camera} isActive={isActive} photo /> : <></>}
        </View>: <></>}
    </View>
}