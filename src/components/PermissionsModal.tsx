import { Modal, View, Image, Text, TouchableOpacity, Linking } from "react-native";
import { Localizations } from "../utils/Localizations";
import { PermissionsModalProps } from "../utils/Types";

export default function PermissionsModal({title, description, isActive, setActive, yesFunction}: PermissionsModalProps) {
    return <Modal
          animationType="fade"
          visible={isActive}
          style={{backgroundColor: '#000000'}}
          transparent
          onRequestClose={() => {
            setActive(!isActive);
          }}>
          <View className="flex justify-center bg-light/70 h-screen">
            <View className="flex jutify-center align-middle m-auto bg-light w-9/12 h-1/2 rounded-xl shadow-xl">
              <Image
                source={require('../../public/icon.png')}
                className="h-32 aspect-square mx-auto mt-4"
              />
              <View className="flex flex-col">
                <Text className="m-auto mt-2 text-2xl font-bold text-dark  ">
                  {title}
                </Text>
                <Text className="m-auto mt-2 text-black text-center text-lg my-2 mb-8 px-8">
                  {description}
                </Text>
              </View>
              <View className="flex flex-row justify-center gap-4">
                <TouchableOpacity
                  onPress={() => setActive(!isActive)}
                  className=" bg-dark  flex justify-center align-middle p-2 rounded w-28">
                  <Text className="text-xl text-light m-auto font-bold">
                    {Localizations.cancel}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {await yesFunction(); setActive(!isActive)}}
                  className="flex bg-highlight  justify-center align-middle p-2 rounded w-28">
                  <Text className="text-lg text-light m-auto font-bold">
                    {Localizations.grant}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
}