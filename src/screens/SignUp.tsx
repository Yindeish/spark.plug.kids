import { Text, TextInput, Button, Checkbox, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useStore, Event, Comment, FormValues, Student, User } from '../components/store';
import Toast from 'react-native-root-toast';


const userSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Email is not valid').required('Email is required'),
  password: Yup.string().min(7, 'Password is too short').required('Password is required'),
});

const UserSignup = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [seePassword, setSeePassword] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<FormValues>>({});

  const [signUpIsSuccessful, setSignUpIsSuccessful] = useState<boolean | string>('');
  const initialValues: FormValues = { firstName: '', lastName: '', email: '', password: '' };
  const { signUp } = useStore();
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  

  // const handleSubmit = async (values: FormValues) => {
  const handleSubmit = async (values: Omit<User, "id">) => {
    
    setLoading(true);
    try {
      await userSchema.validate(values, { abortEarly: false });

      const newUser = await signUp(values);
      console.log(newUser);
      formik.resetForm(); // Reset form values
      setLoading(false);
      Toast.show('Sign up successful.', {
        duration: Toast.durations.LONG,
      });
      // Handle successful registration
      // navigation.navigate('Login');
      setSignUpIsSuccessful(true);

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: Partial<FormValues> = {};

        error.inner.forEach((err) => {
          validationErrors[err.path as keyof FormValues] = err.message;
        });

        setErrors(validationErrors);
        setLoading(false);
      } else {
        console.error(error);
        setLoading(false); // Handle registration error
      }
    }
  };

  const progressToLogin = (): void => {
    if (signUpIsSuccessful) navigation.navigate('Login');
  }

  const formik = useFormik({
    initialValues,
    validationSchema: userSchema,
    onSubmit: handleSubmit,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
          <Image
        source={require("../../assets/SparkplugLogo.png")}
        style={{ marginLeft: "auto", marginRight: "auto" }}
      />
        <Text>Sign Up</Text>
        <TextInput
          label='First Name'
          onChangeText={formik.handleChange('firstName')}
          onBlur={formik.handleBlur('firstName')}
          value={formik.values.firstName}
          mode='outlined'
          outlineColor='#ffd700'
        />
        {formik.touched.firstName && errors.firstName && <Text>{errors.firstName}</Text>}
        <TextInput
          label='Last Name'
          onChangeText={formik.handleChange('lastName')}
          onBlur={formik.handleBlur('lastName')}
          value={formik.values.lastName}
          mode='outlined'
          outlineColor='#ffd700'
        />
        {formik.touched.lastName && errors.lastName && <Text>{errors.lastName}</Text>}
        <TextInput
          label='Email'
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
          mode='outlined'
          outlineColor='#ffd700'
        />
        {formik.touched.email && errors.email && <Text>{errors.email}</Text>}
        <View style={styles.passwordContainer}>
          <TextInput
            label='Password'
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            value={formik.values.password}
            mode='outlined'
            outlineColor='#ffd700'
            secureTextEntry={seePassword}
            style={styles.passwordInput}
          />
          <IconButton
            style={styles.eyeIcon}
            icon={seePassword ? 'eye' : 'eye-off'}
            onPress={() => setSeePassword(!seePassword)}
          />
        </View>
        {formik.touched.password && errors.password && <Text>{errors.password}</Text>}

        <Checkbox.Item
          label='I accept the terms and conditions'
          status={isChecked ? 'checked' : 'unchecked'}
          onPress={handleCheckboxChange}
        />

        <Button onPress={()=>formik.handleSubmit()} mode='contained' disabled={!isChecked} loading={loading}>
          Submit
        </Button>
        {signUpIsSuccessful && <Button onPress={()=>progressToLogin()} mode='contained' >
          Progress to login
        </Button>}
      </View>
    </SafeAreaView>
  );
};

export default UserSignup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 30,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#efb810',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 48, // Adjust the right padding to accommodate the eye icon
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    top: 6, // Adjust the top position to align the eye icon vertically
  },
});
