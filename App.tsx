import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Keyboard, Animated} from 'react-native';

export default function App() {
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginInputStatus, setLoginInputStatus] = useState(true);
  const [passwordInputStatus, setPasswordInputStatus] = useState(false);
  const [inputMarginBottom, setInputMarginBottom] = useState(new Animated.Value(0));

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      //setInputMarginBottom(50);
    });

    Keyboard.addListener('keyboardDidHide', () => {
      //setInputMarginBottom(0);
    });
  }, []);

  useEffect(() => {
    Animated.timing(inputMarginBottom, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [inputMarginBottom]);

  return (
    <Animated.View style={styles.container}>
      {
        loginInputStatus &&
        <TextInput
          style={[styles.inputStyle, {marginBottom: inputMarginBottom}]}
          autoFocus={true}
          onChangeText={setLoginInput}
          value={loginInput}
          maxLength={40}
          onSubmitEditing = {(e) => {
            console.log('Testing submit');
          }}
        />
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
