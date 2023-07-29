import { useState } from 'react';
import { Text, TextInput, Checkbox, Button } from 'react-native-paper';
import { View, } from 'react-native';
// Types
import { Class } from './UpcomingClasses'; 
// Validation
import * as Yup from 'yup';
import { useFormik } from 'formik';
// Notification
import Toast from 'react-native-root-toast';
// Date Picker
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'; '@react-native-community/datetimepicker';

let id: number = 0;
const user: Class = {
    id: id++,
    heading: '',
    desc: '',
    date: new Date(),
    endeDate: new Date(),
    accomplished: false,
    reminder: false,
    updatedAt: new Date()
}

interface ClassForm {
    heading: string,
    desc: string,
    reminder: boolean,
    teacherId: string
}
    
const CreateClass = () => {
    
    const [isChecked, setIsChecked] = useState(false);
    const [seePassword, setSeePassword] = useState(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<Partial<ClassForm>>({});
    const [hasError, setHasError] = useState<boolean>(false);
    const [date, setDate] = useState(new Date(1598051730000));

    const classSchema = Yup.object().shape({
        heading: Yup.string().required('First name is required'),
        desc: Yup.string(),
        reminder: Yup.boolean(),
        teacherId: Yup.string().required('Your id number is required'),
    });

    const initialValues: ClassForm = { heading: '', desc: '', reminder: false, teacherId: '' };

    const handleCheckboxChange = (): void => {
        let value = !isChecked;
        setIsChecked(value);
    }
    
    const submitHandler = (values: ClassForm) => {
        setLoading(true);
        const classDetails: Class = {
            id: id++,
            teacherId: id+=2,
            accomplished: false,
            date: new Date(),
            endeDate: new Date(),
            updatedAt: new Date(),
            ...values
        }

        try {

            // After sucessful creation
            setLoading(false);
            setHasError(false);
            Toast.show('Sign up successful.', {
                duration: Toast.durations.LONG,
            });
        } catch (err) {
            setLoading(false);
            setHasError(true);
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema: classSchema,
        onSubmit: submitHandler,
    });

     function onChange (event, selectedDate) {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  function showMode (currentMode) {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

    function showDatepicker () {
        showMode('date');
    };

    function showTimepicker () {
        showMode('time');
    };

    return (
        <View style={{ width: '100%', height: 'auto' }}>
            <Text style={{ fontSize: 25, fontWeight: '900', paddingTop: 5, paddingBottom: 10, width: '90%', marginLeft: 'auto', marginRight: 'auto'}}>
                Create a class</Text>
            
            <View style={{width: '90%', height: 'auto', marginLeft: 'auto', marginRight: 'auto', padding: 5, paddingTop: 10, paddingBottom: 10, backgroundColor: 'lightgrey', borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20}}>
                <TextInput
                label='Class Heading'
                onChangeText={formik.handleChange('heading')}
                onBlur={formik.handleBlur('heading')}
                value={formik.values.heading}
                mode='outlined'
                outlineColor='#ffd700'
                />
                {formik.touched.heading && errors.heading && <Text>{errors.heading}</Text>}
                <TextInput
                label='Class Description'
                onChangeText={formik.handleChange('desc')}
                onBlur={formik.handleBlur('desc')}
                value={formik.values.desc}
                mode='outlined'
                outlineColor='#ffd700'
                />
                {formik.touched.desc && errors.desc && <Text>{errors.desc}</Text>}

                <Button onPress={showDatepicker}  mode='contained' disabled={loading || hasError} loading={loading}>Show date picker!</Button>
                <Button onPress={showTimepicker} mode='contained' disabled={loading || hasError} loading={loading}>Show time picker!</Button>
                
                <Checkbox.Item
                    label='Set reminder 🔔'
                    status={isChecked ? 'checked' : 'unchecked'}
                    onPress={handleCheckboxChange}
                />
                <Button onPress={()=>formik.handleSubmit()} mode='contained' disabled={loading || hasError} loading={loading}>
                    Create
                </Button>
            </View>
            
        </View>
    )
}

export default CreateClass