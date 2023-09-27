import { TextInput, View } from "react-native"
import { useCameraDevice, Camera } from "react-native-vision-camera"
import { EvidenceProps } from "../utils/Types"


export default function Evidence({evidence, onChangeEvidence}: EvidenceProps) {
    const device = useCameraDevice('back')
    return  <View>
        {device == null ? <TextInput
        onChangeText={onChangeEvidence}
        value={evidence}
        keyboardType="default"
        placeholderTextColor={'#ffffff'}
        multiline
        className="flex justify-center align-middle my-auto h-10 pl-3 py-0 text-lg border mt-3 w-12/12 rounded-full bg-main text-light font-bold"
        /> : <Camera device={device} isActive={false}></Camera>}
    </View>
}