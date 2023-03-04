import 'package:flutter/material.dart';
import 'components/auth/auth.dart';

void main() => runApp(App());

class App extends StatelessWidget {
  @override
    Widget build(BuildContext context) {
    return MaterialApp(
          title: 'typeGallery',
          home: Auth(),
          debugShowCheckedModeBanner: false,
      );
    }
}