import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';

interface WelcomePageProps {
    navigation: {
        navigate: (arg0: string) => void;
    }
}

const WelcomePage= ({ navigation }: WelcomePageProps) => {
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const goToSignup = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <View style={{display: 'flex', gap: 20}}>
        <Image source={require('../../assets/SparkplugLogo.png')} style={{ marginLeft: 'auto', marginRight: 'auto', width: 180}} />
        <Text style={styles.title}>Nuture Young Minds, Unleash their potential!</Text>
      </View>
      <View style={{width: '100%'}}>
        <Button
        mode='contained'
        onPress={goToLogin}
        style={styles.button}
      >
        Login
          </Button>
          <Button
        mode='contained'
        onPress={goToSignup}
        style={styles.button}
      >
        Sign Up
      </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    height: '55%',
    marginTop: '55%',
  },
  title: {
    fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
      color: '#000000',
  },
    button: {
      marginBottom: 10,
      width: '100%'
    }

});

export default WelcomePage;
