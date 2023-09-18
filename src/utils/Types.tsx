import {StyleSheet} from 'react-native';
import Sensor from '../../backend/models/sensor';

export interface User {
  number: string;
  location: {type: 'Point'; coordinates: Array<Number>};
}

export enum DangerLevel {
  SAFE = 0,
  RISK = 1,
  DANGER = 2,
}

export interface AdviceProps {
  status: DangerLevel;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export interface RiskMeterProps {
  status: DangerLevel;
  reportFunction: () => void;
}

export interface ReportProps {
  reportFunction: () => void;
}

export interface LocationData {
  status: DangerLevel;
  sensors: Sensor[];
}

export interface ScreenProp {
  isDarkMode: boolean;
}
export interface FunctionScreenProp {
  isDarkMode: boolean;
  updateFunction: Function[];
}

export enum PanelState {
  CLOSED = 0,
  OPEN = 1,
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
