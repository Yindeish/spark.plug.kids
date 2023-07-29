import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
// import useStore from '../components/store';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// import Colors from '../../../constants/Colors';
// import { ResetPassword } from '../../../services/auth';
import { ResetPassword } from '../../components/ResetPassword';

interface ResetPasswordProps {
    navigation: {
        navigate: (arg0: string) => void;
    };
}

const ResetPasswordScreen = ({ navigation }: ResetPasswordProps) => {
    
    
      const [email, setEmail] = useState('');

    const handleResetPassword = async () => {
            
        try {
            await ResetPassword(email); // Call the ResetPassword function passing the email
            // Show a success message or navigate to a success screen
            console.log('Password reset successful');
          } catch (error) {
            console.log(error);
            // Show an error message or handle the error appropriately
          }
        };
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/SparkplugLogo.png')} style={{ marginLeft: 'auto', marginRight: 'auto'}} />
            <TextInput
                label="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                mode='outlined'
                outlineColor='#000'
                activeOutlineColor={Colors.light.tint}
            />
       
            <Button mode="contained" onPress={() => handleResetPassword()} style={styles.button}>
                Reset Password
            </Button>
            <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')} style={styles.button}>
                Login
                </Button>
        </View>
    );

}

export default ResetPasswordScreen;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            padding: 16,
        },
        input: {
            height: 50,
            marginBottom: 16,
        },
        button: {
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            // backgroundColor: Colors.light.tint,
        }
    });