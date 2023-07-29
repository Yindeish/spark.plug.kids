import React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

interface MyComponentProps {
  title: string;
  subtitle: string;
  cardTitle: string;
  cardContent: string;
  onCancel: () => void;
  onOk: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({
  title,
  subtitle,
  cardTitle,
  cardContent,
  onCancel,
  onOk,
}) => (
  <Card>
    <Card.Title title={title} subtitle={subtitle} left={LeftContent} />
    <Card.Content>
      <Text variant="titleLarge">{cardTitle}</Text>
      <Text variant="bodyMedium">{cardContent}</Text>
    </Card.Content>
    <Card.Cover source={require('../../assets/upcoming.jpeg')} />
    <Card.Actions>
      <Button onPress={onCancel}>Cancel</Button>
      <Button onPress={onOk}>Ok</Button>
    </Card.Actions>
  </Card>
);

export default MyComponent;
