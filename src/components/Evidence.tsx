import { Alert, Button, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useCameraDevice, Camera, useCameraPermission } from "react-native-vision-camera"
import { EvidenceProps } from "../utils/Types"
import { useEffect, useRef, useState } from "react"
import GetLocation from "react-native-get-location"
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions"
import { callAPI } from "../utils/Functions"
import RNFS from 'react-native-fs'


export default function Evidence({evidence, onChangeEvidence}: EvidenceProps) {
    const device = useCameraDevice('back')
    const [cameraPerms, setCameraPerms] = useState(false);
    const [cameraActive, setCameraActive] = useState(false);
    const camera = useRef<Camera>(null)
    useEffect(() => {
        async function updatePerms() {
            const { hasPermission, requestPermission } = useCameraPermission()
            if (hasPermission || await requestPermission()) {
                setCameraPerms(true)
            } else {
                Alert.alert(
                    'Activa Camera',
                    'Niveles de Niveles nessecita tu nessecita tu camara para tomar foto del incidente!',
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
        });
    })
    return  <View>
        {(device == null) ? <TextInput
        onChangeText={onChangeEvidence}
        value={evidence}
        keyboardType="default"
        placeholderTextColor={'#ffffff'}
        multiline
        className="flex justify-center align-middle my-auto h-10 pl-3 py-0 text-lg border mt-3 w-12/12 rounded-full bg-main text-light font-bold"
        /> : cameraPerms ? <View>
            <TouchableOpacity className="w-fit px-3 rounded-full " onPress={() => setCameraActive(true)}>
                <Text className="text-light text-lg font-semibold">Toma Foto</Text>
            </TouchableOpacity>
            {evidence.length !== 0 ? <Text className="text-light/80 text-lg">Photo: {(new TextEncoder().encode(evidence)).length} bytes</Text>: <></>}
            <Camera device={device} ref={camera} isActive={cameraActive} photo /> 
        </View>: <></>}
    </View>
}