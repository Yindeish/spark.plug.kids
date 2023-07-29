import { useState } from "react";
import { Text, TextInput, Button, ToggleButton, Chip } from "react-native-paper";
import { View, StyleSheet, Image, StatusBar, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Colors } from "react-native/Libraries/NewAppScreen";
// import EventsView from "../../components/Events";
// SubScreens
import UpcomingClasses from "./UpcomingClasses";
import CreateClass from "./CreateClass";
import Inbox from "./Inboxes";
import PreviousClasses from "./PreviousClasses";

export enum TabsEnum {
    createClass = 'createClass',
    inbox = 'inbox',
    upcomingClass = 'upcomingClass',
    previousClasses = 'previousClasses'
}

export type Tabs = TabsEnum.createClass | TabsEnum.inbox | TabsEnum.upcomingClass | TabsEnum.previousClasses;
let id: number = 0;

const FirstRoute = () => (
  <UpcomingClasses />
);

const SecondRoute = () => (
  <CreateClass  />
);
const ThirdRoute = () => (
  <Inbox />
);

const FourthRoute = () => (
  <PreviousClasses />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute
});

const Teacher = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: '📝' },
        { key: 'second', title: '🧾' },
        { key: 'third', title: '💬' },
        { key: 'fourth', title: '📋' },
    ]);

    const renderTabBar = props => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: '#ffd700' }}
        style={{ backgroundColor: 'white' }}
    />
    );
   
    return (
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}/>
         )
        }
        
       

export default Teacher;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 16,
//     },
//     tabsContainer: {
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 7,
//         width: '100%',
//         height: 25,
//         backgroundColor: 'red'
//     },
//     tab: {

//     },
//   input: {
//     height: 50,
//     marginBottom: 16,
//   },
//   button: {
//     marginTop: 16,
//     // backgroundColor: Colors.light.tint,
//   },
// });
 