
import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useStore } from '../components/store';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ProfileScreenProps {
  navigation: {
    navigate: (arg0: string) => void;
  };
}

const Profile = ({ navigation }: ProfileScreenProps) => {
    const { loggedInUser } = useStore();
    const [avatarSource, setAvatarSource] = useState<string | null>(null);

    const handleChooseImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
          alert('Permission to access the camera roll is required!');
          return;
        }
    
        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (!pickerResult.canceled && pickerResult.assets.length > 0) {
          setAvatarSource(pickerResult.assets[0].uri);
        }
      };
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <View style={styles.headerContent}>
      <TouchableOpacity onPress={handleChooseImage} style={styles.avatarContainer}>
            {avatarSource ? (
              <Image style={styles.avatar} source={{ uri: avatarSource }} />
            ) : (
              <View style={styles.avatar}></View>
            )}
            <Text style={styles.buttonText}>Change Profile Picture</Text>
          </TouchableOpacity>
        {loggedInUser && (
          <View>
            <Text style={styles.name}>{loggedInUser.firstName} {loggedInUser.lastName} </Text>
            <Text style={styles.userInfo}>{loggedInUser.email}</Text>
            <Text style={styles.userInfo}>{loggedInUser.role} </Text>
          </View>
        )}
      </View>
    </View>


        <View style={styles.item}>
          <View style={styles.iconContent}>
            <Image
              style={styles.icon}
              source={{ uri: 'https://img.icons8.com/color/70/000000/filled-like.png' }}
            />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.info}>News</Text>
          </View>
        </View>
    </SafeAreaView>
  )
}
export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#DCDCDC',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: '#000000',
      fontWeight: '600',
      textAlign: 'center',
  },
  userInfo: {
    fontSize: 16,
    color: '#778899',
      fontWeight: '600',
    textAlign: 'center',
  },
  body: {
    backgroundColor: '#778899',
    height: 500,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
    },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: '#FFFFFF',
    },
    placeholderText: {
        fontSize: 18,
        color: '#778899',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 10,
    },
    avatarContainer: {
        alignItems: 'center',
      },
      buttonText: {
        fontSize: 16,
        color: 'blue',
        marginTop: 8,
      },
})