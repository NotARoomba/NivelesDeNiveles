import React, {TouchableOpacity, View} from 'react-native';
import {DangerLevelButtonProps} from '../utils/Types';

export default function DangerLevelButton({
  color,
  level,
  isSelected,
  onPress,
}: DangerLevelButtonProps) {
  return (
    <TouchableOpacity onPress={() => onPress(level)}>
      <View
        className={
          color +
          ' w-20 h-5 rounded-full justify-center align-middle border-2' +
          (isSelected ? ' border-main' : ' border-accent')
        }
      />
    </TouchableOpacity>
  );
}
