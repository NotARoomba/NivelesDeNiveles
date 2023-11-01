import {useEffect, useRef, useState} from 'react';
import React, {Animated, PanResponder, View} from 'react-native';
import {DangerLevel, LocationData, PanelProps} from '../utils/Types';
import Report from './Report';
import Status from './Status';

export default function Panel({locationData, setLogged, cameraOpen, setCameraOpen}: PanelProps) {
  const pan = useRef(new Animated.ValueXY()).current;
  const [showing, setShowing] = useState(false);
  const [report, setReport] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (_evt, _gestureState) => !cameraOpen,
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
        }
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
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setReport(!report);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      });
    });
  };
  return (
    <Animated.View
      style={{
        transform: [{translateX: pan.x}, {translateY: pan.y}],
        opacity: fadeAnim,
      }}
      {...panResponder.panHandlers}
      className={
        'w-screen absolute left-0 rounded-t-3xl transition-all duration-200' +
        ' h-[500px] bottom-[-400px]' +
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
        <Report
          reportFunction={reportFunction}
          cameraOpen={cameraOpen}
          setCameraOpen={setCameraOpen}
          setLogged={setLogged}
        />
      ) : (
        <Status reportFunction={reportFunction} locationData={locationData} />
      )}
    </Animated.View>
  );
}
