import {useEffect} from 'react';
import {Alert, Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const usePermission = () => {
  useEffect(() => {
    const requestPermission = async (permission: any) => {
      const result = await request(permission);
      if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
        Alert.alert(
          '이 앱은 위치 권한 허용이 필요합니다.',
          '위치 권한을 허용해주세요.',
          [
            {
              text: '확인',
              onPress: () => requestPermission(permission),
            },
            {
              text: '취소',
              onPress: () => console.log('Permission denied'),
              style: 'cancel',
            },
          ],
        );
      }
    };

    if (Platform.OS === 'android') {
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then(result => {
          if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
            requestPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
          }
        })
        .catch(console.error);
    } else if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.LOCATION_ALWAYS)
        .then(result => {
          if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
            requestPermission(PERMISSIONS.IOS.LOCATION_ALWAYS);
          }
        })
        .catch(console.error);
    }
  }, []);
};

export default usePermission;
