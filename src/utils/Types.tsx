import {StyleSheet} from 'react-native';
import Incident from '../../backend/models/incident';
import Sensor from '../../backend/models/sensor';

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

export interface PermissionsModalProps {
  title: string;
  description: string;
  isActive: boolean;
  setActive: (active: boolean) => void;
  yesFunction: () => void;
}

export interface CameraPanelProps {
  cameraOpen: boolean;
  onChangeEvidence: (nev: string) => void;
  setCameraOpen: (open: boolean) => void;
}

export interface EvidenceProps {
  evidence: string;
  onChangeEvidence: (nev: string) => void;
  cameraOpen: boolean;
  setCameraOpen: (open: boolean) => void;
  submitReport: () => void;
}

export interface PanelProps {
  locationData: LocationData;
  setLogged: Function;
  cameraOpen: boolean;
  setCameraOpen: (open: boolean) => void;
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
  cameraOpen: boolean;
  setCameraOpen: (open: boolean) => void;
  setLogged: Function;
}

export interface LocationData {
  status: DangerLevel;
  sensors: Sensor[];
  incidents: Incident[];
}
export interface FunctionScreenProp {
  isDarkMode: boolean;
  updateFunction: Function;
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
