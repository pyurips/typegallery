import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { Text, TextInput, View, Keyboard, Animated, Image } from 'react-native';
import styles from './styles/authStyle';

export default function App() {
  const [authStates, setAuthStates] = useState({
    loginInput: '',
    passwordInput: '',
    loginInputStatus: true,
    passwordInputStatus: false,
    valueToTranslate: 0,
    valueToScale: 1,
  });
  const inputMarginBottom = useRef(new Animated.Value(0));
  const logoScale = useRef(new Animated.Value(0.5));

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setAuthStates((prev) => ({
        ...prev,
        valueToTranslate: -25,
        valueToScale: 1
      }));
    });

    Keyboard.addListener('keyboardDidHide', () => {
      setAuthStates((prev) => ({
        ...prev,
        valueToTranslate: 0,
        valueToScale: 0.5
      }));
    });
  }, []);

  useEffect(() => {
    Animated.timing(inputMarginBottom.current, {
      toValue: authStates.valueToTranslate,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [inputMarginBottom, authStates.valueToTranslate]);

  useEffect(() => {
    Animated.timing(logoScale.current, {
      toValue: authStates.valueToScale,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [logoScale, authStates.valueToScale]);

  function handleLoginChangeInput(value: string): void {
    setAuthStates((prev) => ({
      ...prev,
      loginInput: value
    }));
  }

  function handlePasswordChangeInput(value: string): void {
    setAuthStates((prev) => ({
      ...prev,
      passwordInput: value
    }));
  }

  return (
    <View style={styles.container}>
      <Animated.View style={{position: 'absolute', width: '100%', height: '100%', alignItems: 'center',
          justifyContent: 'center'}}>
        <Animated.Image
        source={require('./assets/auth/images/typeLogo.png')}
        style={{
          flex: 1,
          width: '30%',
          transform: [{ scale: logoScale.current }],
          marginBottom: 200
        }}
        resizeMode="contain"
        />
      </Animated.View>
      {
        authStates.loginInputStatus &&
        <Animated.View style={{ transform: [{ translateY: inputMarginBottom.current }] }}> 
          <TextInput
            style={styles.inputStyle}
            autoFocus={true}
            onChangeText={handleLoginChangeInput}
            value={authStates.loginInput}
            maxLength={40}
            placeholder='Nome do usuário'
            placeholderTextColor="rgba(255,255,255, 0.5)"
            onSubmitEditing = {(e) => {
              setAuthStates((prev) => ({
                ...prev,
                loginInputStatus: false,
                passwordInputStatus: true
              }));
            }}
          />
         </Animated.View>
      }

      {
        authStates.passwordInputStatus &&
        <Animated.View style={{ transform: [{ translateY: inputMarginBottom.current }] }}> 
          <TextInput
            style={styles.inputStyle}
            autoFocus={true}
            onChangeText={handlePasswordChangeInput}
            value={authStates.passwordInput}
            maxLength={40}
            placeholder='Senha'
            placeholderTextColor="rgba(255,255,255, 0.5)"
            secureTextEntry={true}
          />
        </Animated.View>
      }

      <StatusBar style="auto" />
    </View>
  );
}
