import {StyleSheet} from 'react-native';
import Sensor from '../../backend/models/sensor';

export interface User {
  number: string;
  location: {type: 'Point'; coordinates: Array<Number>};
}

export enum DangerLevel {
  SAFE,
  RISK,
  DANGER,
}

export enum DangerType {
  FLOOD,
  FIRE,
  AVALANCHE,
}

export interface PanelProps {
  locationData: LocationData;
}

export interface AdviceProps {
  status: DangerLevel;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export interface DangerTypeButtonProps {
  icon: string;
  type: DangerType;
  isSelected: boolean;
  onPress: (type: DangerType) => void;
}
export interface DangerLevelButtonProps {
  color: string;
  level: DangerLevel;
  isSelected: boolean;
  onPress: (level: DangerLevel) => void;
}

export interface RiskMeterProps {
  status: DangerLevel;
  reportFunction: () => void;
}

export interface StatusProps {
  locationData: LocationData;
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
