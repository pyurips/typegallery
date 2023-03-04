import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:ui';


class Auth extends StatefulWidget {
  @override
  State<Auth> createState() => _Auth();
}

class _Auth extends State<Auth> {
  late FocusNode emailFocus;
  late FocusNode passwordFocus;
  late FocusNode loginFocus;
  late FocusNode registerFocus;
  bool isEmailFocused = false;
  bool isPasswordFocused = false;
  late double marginBottomLogin;
  bool isEmailSelected = false;
  bool isPasswordSelected = false;
  final double devicePixelRatio = window.devicePixelRatio;
  String _keyPressed = '';

  void _handleKeyEvent(RawKeyEvent event) {
    if (event is RawKeyDownEvent) {
      final logicalKey = event.logicalKey;
      final keyLabel = logicalKey.keyLabel;
      debugPrint('Tecla apertada: $keyLabel');
      if (emailFocus.hasFocus) {
        if (keyLabel == 'Arrow Down') {
          emailFocus.unfocus();
          isEmailSelected = false;
          passwordFocus.requestFocus();
        } else if (keyLabel == 'Select') {
          setState(() {
            isEmailSelected = true;
          });
        }
      }

      if (passwordFocus.hasFocus) {
        if (keyLabel == 'Arrow Up') {
          passwordFocus.unfocus();
          isPasswordSelected = false;
          emailFocus.requestFocus();
        } else if (keyLabel == 'Select') {
          setState(() {
            isPasswordSelected = true;
          });
        } else if (keyLabel == 'Arrow Down') {
          loginFocus.requestFocus();
        }
      }
      setState(() {
        _keyPressed = keyLabel;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    emailFocus = FocusNode();
    passwordFocus = FocusNode();
    loginFocus = FocusNode();
    registerFocus = FocusNode();
    emailFocus.addListener(() {
      setState(() {
        isEmailFocused = emailFocus.hasFocus;
      });
    });
    passwordFocus.addListener(() {
      setState(() {
        isPasswordFocused = passwordFocus.hasFocus;
      });
    });
    RawKeyboard.instance.addListener(_handleKeyEvent);
  }

    @override
    void dispose() {
      emailFocus.dispose();
      RawKeyboard.instance.removeListener(_handleKeyEvent);
      super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
        Image.asset('lib/assets/auth/images/logo.png', width: 400,),
        SizedBox(
          width: 20,
        ),
        Container(
          width: 2,
          height: 400,
          decoration: BoxDecoration(
            color: Color.fromRGBO(255, 255, 255, 0.5)
          ),
        ),
        SizedBox(
          width: 20,
        ),
        Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Center(
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 500),
              curve: Curves.elasticOut,
              width: 250,
              transform: Matrix4.translationValues(0.0, isPasswordSelected ? -30 : 0, 0.0),
              child: TextFormField(
                focusNode: emailFocus,
                onEditingComplete: () {
                  setState(() {
                    isEmailSelected = false;
                  });
                },
                readOnly: !isEmailSelected,
                autofocus: true,
                keyboardType: TextInputType.text,
                cursorColor: Colors.white,
                style: const TextStyle(
                  color: Colors.white
                ),
                decoration: InputDecoration(
                  labelText: 'Digite seu e-mail $devicePixelRatio',
                  labelStyle: TextStyle(
                    color: Colors.white
                  ),
                  enabledBorder: UnderlineInputBorder(
                    borderSide: BorderSide(color: Colors.white, width: 2),
                  ),
                  focusedBorder: UnderlineInputBorder(
                    borderSide: BorderSide(color: emailFocus.hasFocus ? Color.fromRGBO(52, 164, 117, 1) : Colors.white, width: 2),
                  ),
                  counterStyle: TextStyle(
                    color: Colors.white
                  )
                ),
              ),
            ),
          ),
          SizedBox(
            height: 10,
          ),
          Center(
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 500),
              curve: Curves.elasticOut,
              width: 250,
              transform: Matrix4.translationValues(0.0, isPasswordSelected ? -30 : 0, 0.0),
              child: TextFormField(
                focusNode: passwordFocus,
                onEditingComplete: () {
                  setState(() {
                    isPasswordSelected = false;
                  });
                },
                readOnly: !isPasswordSelected,
                obscureText: true,
                keyboardType: TextInputType.text,
                cursorColor: Colors.white,
                style: const TextStyle(
                  color: Colors.white
                ),
                decoration: InputDecoration(
                  labelText: 'Digite sua senha',
                  labelStyle: TextStyle(
                    color: Colors.white
                  ),
                  enabledBorder: UnderlineInputBorder(
                    borderSide: BorderSide(color: Colors.white, width: 2),
                  ),
                  focusedBorder: UnderlineInputBorder(
                    borderSide: BorderSide(color: passwordFocus.hasFocus ? Color.fromRGBO(52, 164, 117, 1) : Colors.white, width: 2),
                  ),
                  counterStyle: TextStyle(
                    color: Colors.white
                  )
                ),
              ),
            ),
          ),
          SizedBox(
            height: 20,
          ),
          AnimatedContainer(
            duration: Duration(milliseconds: 500),
            width: 250,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                OutlinedButton(
                  onPressed: () {
                  },
                  focusNode: loginFocus,
                  style: OutlinedButton.styleFrom(
                    side: BorderSide(color: loginFocus.hasFocus ?Color.fromRGBO(0, 0, 0, 0.7) : Colors.white),
                    backgroundColor: (loginFocus.hasFocus ?Color.fromRGBO(167, 202, 187, 1) : Colors.transparent)
                  ),
                  child: Text(
                    'Entrar',
                    style: TextStyle(
                      color: (loginFocus.hasFocus ?Color.fromRGBO(0, 0, 0, 0.7) : Colors.white)
                    ),
                  )
                ),
                OutlinedButton(
                  onPressed: () {
                  },
                  focusNode: registerFocus,
                  style: OutlinedButton.styleFrom(
                    side: BorderSide(color: registerFocus.hasFocus ?Color.fromRGBO(0, 0, 0, 0.7) : Colors.white),
                    backgroundColor: (registerFocus.hasFocus ?Color.fromRGBO(167, 202, 187, 1) : Colors.transparent), 
                  ),
                  child: Text(
                    'Registre-se',
                    style: TextStyle(
                      color: (registerFocus.hasFocus ?Color.fromRGBO(0, 0, 0, 0.7) : Colors.white)
                    ),
                  )
                )
              ],
            ),
          )
        ],
      )
        ],
      ),
      backgroundColor: const Color.fromRGBO(67, 67, 67, 1),
    );
  }
}