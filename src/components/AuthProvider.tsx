import {useCallback} from 'react';
import firestore from '@react-native-firebase/firestore';

const addFcmToken = useCallback((token: string) => {
  if (user != null) {
    firestore().collection(Collections.Users).doc(user.userId).update({
        addFcmToken: firestore.FieldValue.arrayUnion(token);
    })
  }
},[user]);
