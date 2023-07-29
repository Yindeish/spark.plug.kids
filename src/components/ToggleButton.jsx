import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

const ToggleButton = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleButton = () => {
    setIsToggled(!isToggled);
  };

    return (
      <View style={styles.container}>
    <TouchableOpacity
      style={[styles.button, isToggled && styles.buttonToggled]}
      onPress={toggleButton}
    >
      <TouchableOpacity
        style={[
          styles.subButton,
          isToggled ? styles.subButtonToggled : null,
        ]}
        onPress={() => setIsToggled(true)}
      >
        <Text
          style={[
            styles.buttonText,
            isToggled ? styles.buttonTextToggled : null,
          ]}
        >
          Upcoming Classes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.subButton,
          !isToggled ? styles.subButtonToggled : null,
        ]}
        onPress={() => setIsToggled(false)}
      >
        <Text
          style={[
            styles.buttonText,
            !isToggled ? styles.buttonTextToggled : null,
          ]}
        >
          Previous Classes
        </Text>
      </TouchableOpacity>
            </TouchableOpacity>
            </View>
  );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
  button: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  subButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  subButtonToggled: {
    backgroundColor: '#efb810',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonTextToggled: {
    color: '#fff',
  },
});

export default ToggleButton;
