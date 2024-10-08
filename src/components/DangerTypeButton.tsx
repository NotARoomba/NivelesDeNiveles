import React, {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {DangerTypeButtonProps} from '../utils/Types';

export default function DangerTypeButton({
  icon,
  type,
  isSelected,
  onPress,
}: DangerTypeButtonProps) {
  return (
    <TouchableOpacity onPress={() => onPress(type)}>
      <View
        className={
          'w-16 rounded-full aspect-square justify-center align-middle mx-auto' +
          (isSelected ? ' bg-highlight' : ' bg-main')
        }>
        <Icon
          name={icon}
          color="#f1eeff"
          size={32}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            margin: 'auto',
            textAlign: 'center',
            alignSelf: 'center',
          }}
        />
      </View>
    </TouchableOpacity>
  );
}
