import {StyleSheet} from 'react-native';

export interface User {
  number: string;
  location: {type: 'Point'; coordinates: Array<Number>};
}

export interface ScreenProp {
  isDarkMode: boolean;
}
export interface FunctionScreenProp {
  isDarkMode: boolean;
  updateFunction: Function[];
}

export const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 6,
  },
});
