import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Switch } from 'react-native-paper';

interface UpcomingclassProps {
  date: string;
  time: string;
  topic: string;
  duration: string;
  students: string[];
}

const UpcomingClass: React.FC<UpcomingclassProps> = ({
  date,
  time,
  topic,
  duration,
  students,
}) => {
  const [isPresent, setIsPresent] = useState(false);

  const togglePresence = () => {
    setIsPresent(!isPresent);
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.dateAndTime}>
          <Text style={styles.infoText}>Date: {date}</Text>
          <Text style={styles.infoText}>Start Time: {time}</Text>
        </View>
        <Text style={styles.infoText}>Topic: {topic}</Text>
        <Text style={styles.infoText}>Duration: {duration}</Text>
      </View>
      <View style={styles.studentsContainer}>
        <Text style={styles.studentsTitle}>Students:</Text>
        {students.map((student, index) => (
          <Text style={styles.studentName} key={index}>
            {student}
          </Text>
        ))}
      </View>
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>Present:</Text>
        <Switch value={isPresent} onValueChange={togglePresence} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginBottom: 16,
    borderRadius: 10,
    elevation: 2,
  },
  infoContainer: {
    marginBottom: 8,
  },
  dateAndTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  studentsContainer: {
    marginBottom: 8,
  },
  studentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  studentName: {
    fontSize: 16,
    marginLeft: 8,
    marginBottom: 2,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  toggleText: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default UpcomingClass;
