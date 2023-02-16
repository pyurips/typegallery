import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, Keyboard, Animated, useWindowDimensions} from 'react-native';

export default function App() {
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginInputStatus, setLoginInputStatus] = useState(true);
  const [passwordInputStatus, setPasswordInputStatus] = useState(false);
  const inputMarginBottom = useRef(new Animated.Value(0));
  const [valueToTranslate, setValueToTranslate] = useState(0)

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setValueToTranslate(-50);
    });

    Keyboard.addListener('keyboardDidHide', () => {
      setValueToTranslate(0);
    });
  }, []);

  useEffect(() => {
    Animated.timing(inputMarginBottom.current, {
      toValue: valueToTranslate,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [inputMarginBottom, valueToTranslate]);

  return (
    <Animated.View style={styles.container}>
      {
        loginInputStatus &&
        <Animated.View style={{ transform: [{ translateY: inputMarginBottom.current }] }}> 
          <TextInput
            style={styles.inputStyle}
            autoFocus={true}
            onChangeText={setLoginInput}
            value={loginInput}
            maxLength={40}
            onSubmitEditing = {(e) => {
              console.log('Testing submit');
            }}
          />
         </Animated.View>
      }

      {
        passwordInputStatus &&
        <TextInput
          style={styles.inputStyle}
          autoFocus={true}
          onChangeText={setPasswordInput}
          value={passwordInput}
          maxLength={40}
        />
      }

      <StatusBar style="auto" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
      width: 300,
      padding: 5,
      borderBottomColor: '#DCDCDC',
      borderBottomWidth: 2,
      color: 'white',
      transitionProperty: "all",
      transitionDuration: "2000ms"
  }
});
