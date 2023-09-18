import {useRef, useState} from 'react';
import React, {Animated, PanResponder, Text, View} from 'react-native';
import {DangerLevel, LocationData} from '../utils/Types';
import RiskMeter from './RiskMeter';
import Report from './Report';

export default function Panel() {
  const pan = useRef(new Animated.ValueXY()).current;
  const [showing, setShowing] = useState(false);
  const [report, setReport] = useState(false);
  const [locationData, _setLocationData] = useState<LocationData>({
    status: DangerLevel.RISK,
    sensors: [],
  });
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (_evt, _gestureState) => true,
    onPanResponderRelease: (_evt, gestureState) => {
      pan.flattenOffset();
      if (gestureState.dy === 0) {
        animateTo(showing);
      } else if (gestureState.dy < -100 || gestureState.vy < -0.5) {
        if (!showing) {
          animateTo(true);
          setShowing(true);
        }
      } else if (gestureState.dy > 100 || gestureState.vy > 0.5) {
        if (showing) {
          animateTo(false);
          setShowing(false);
        } else {
          animateTo(showing);
        }
      } else {
        animateTo(showing);
      }
    },
  });
  const animateTo = (state: boolean) => {
    Animated.spring(pan, {
      toValue: {x: 0, y: !state ? 0 : -400},
      tension: 80,
      friction: 25,
      useNativeDriver: true,
      restDisplacementThreshold: 10,
      restSpeedThreshold: 10,
    }).start();
  };
  const reportFunction = () => {
    setReport(!report);
  };
  return (
    <Animated.View
      style={{
        transform: [{translateX: pan.x}, {translateY: pan.y}],
      }}
      {...panResponder.panHandlers}
      className={
        'w-screen absolute left-0 rounded-t-3xl transition-all duration-200' +
        (showing ? ' h-[500px]  bottom-[-400px]' : ' h-[500px] bottom-[-400]') +
        (report ? ' bg-accent' : ' bg-dark')
      }>
      <View className="justify-center">
        <View
          className={
            'w-3/12 justify-center h-1.5 m-3 mx-auto rounded-full' +
            (report ? ' bg-dark' : ' bg-light')
          }
        />
      </View>
      {report ? (
        <Report reportFunction={reportFunction} />
      ) : !showing ? (
        <View>
          <RiskMeter
            status={locationData.status}
            reportFunction={reportFunction}
          />
        </View>
      ) : (
        <View className="justify-end">
          <RiskMeter
            status={locationData.status}
            reportFunction={reportFunction}
          />
          <Text className="text-light mx-auto mr-5 justify-start text-lg font-bold">
            Reportar
          </Text>
        </View>
      )}
    </Animated.View>
  );
}
