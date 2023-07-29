import { useState } from 'react';
import { Text, Button, Chip } from 'react-native-paper';
import { View, ScrollView } from 'react-native';
// Tooltip
import ToolTip from '../../components/ToolTip';

let id: number = 0;
// Types
export interface Class {
    id: number,
    heading: string,
    desc: string,
    date: Date,
    endeDate: Date,
    reminder: boolean,
    accomplished: boolean,
    updatedAt: Date
}

const UpcomingClasses = () => {
     let classes: Class[] = [
        {
            id: id++,
            heading: 'Assesments',
            desc: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut ab dolorum qui non cumque odio beatae dolore voluptatem et molestiae.',
             date: new Date(),
            endeDate: new Date(),
            reminder: true,
            accomplished: true,
            updatedAt: new Date()
        },
        {
            id: id++,
            heading: 'Revisions',
            desc: 'Lorem ipsum dsjd sit amet.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores culpa cumque blanditiis reprehenderit accusantium fugiat.',
            date: new Date(),
            endeDate: new Date(),
            reminder: false,
            accomplished: false,
            updatedAt: new Date()
        },
        {
            id: id++,
            heading: 'Intro',
            desc: 'amet consectetur adipisicing Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae assumenda accusantium sequi.',
            date: new Date(),
            endeDate: new Date(),
            reminder: false,
            accomplished: false,
            updatedAt: new Date()
        },
        {
            id: id++,
            heading: 'Revisions',
            desc: 'Lorem ipsum dsjd sit amet.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores culpa cumque blanditiis reprehenderit accusantium fugiat.',
            date: new Date(),
            endeDate: new Date(),
            reminder: false,
            accomplished: false,
            updatedAt: new Date()
        },
        {
            id: id++,
            heading: 'Intro',
            desc: 'amet consectetur adipisicing Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae assumenda accusantium sequi.',
            date: new Date(),
            endeDate: new Date(),
            reminder: false,
            accomplished: false,
            updatedAt: new Date()
        },
        
    ];
    
    let [classesArr, setClassesArr] = useState<Class[]>(classes);
    // let [classesArr, setClassesArr] = useState([]);
    let [notificatonIsShown, setNotificatonIsShown] = useState<boolean>(false);
    let [type, setType] = useState('tooltip');
    let [duration, setDuration] = useState(2);
    let [message, setMessage] = useState<string>('');

    const markDone: Function = (classId: number) => {
        let arr = classesArr.map(cls => {
            if (cls.id == classId) cls.accomplished = !cls.accomplished;
            return cls;
        })
        let status = arr.find(cls => cls.id == classId).accomplished;
        setClassesArr(arr);
        let statusMsg = status == true ? 'accomplished' : 'are yet to accomplish';
        const message = `You ${statusMsg} class ${classId+1}`;
        notify(message);
        // Moving the class thereafter
        moveDoneClassToPrevious(classId);
    }

    const toggleReminder: Function = (classId: number) => {
        let arr = classesArr.map(cls => {
            if (cls.id == classId) {
                if (cls.accomplished) return;
                else cls.reminder = !cls.reminder;
            };
            return cls;
        })
        let status = arr.find(cls => cls.id == classId).reminder;
        setClassesArr(arr);
        let statusMsg = status == true ? 'set reminder on' : 'removed from reminder';
        const message = `You ${statusMsg} class ${classId+1}`;
        notify(message);
    }

    const timeOf: Function = (date: Date): string => {
        let hours = date.getHours();
        let minutes: string | number = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    function moveDoneClassToPrevious (classId: number) {
        const currentClass = classesArr.find(cls => cls.id == classId);
        const accomplishedDate = new Date();
        const accomplishedClass = {
            ...currentClass,
            accomplishedDate,
        }
        // push it to the server
    }
    
    function notify(id) {
        setNotificatonIsShown(true);
        setMessage(`${id}`)
    }

    return (
        <>
            {notificatonIsShown && <ToolTip duration={duration} message={message} type={type} />}
    <View style={{ width: '100%', height: 'auto' }}>
        <Text style={{ fontSize: 25, fontWeight: '900', paddingTop: 5, paddingBottom: 10, width: '90%', marginLeft: 'auto', marginRight: 'auto'}}>
        { classesArr.length <= 1 ? 'Upcoming Class' : 'Upcoming Classes' }</Text>
          
        {classesArr.length <= 0 ? (<View style={{
            width: '100%', height: 150, marginTop: 50, display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between'
        }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: 'red', paddingTop: 10, paddingBottom: 10, textAlign: 'center'}}>No Upcoming class. 😭</Text>
            <Button
                mode="contained"
            >
                Create a class
            </Button>
        </View>) :
            (<ScrollView style={{ width: '100%', height: '90%' }}>
                <View style={{width: '100%', display: 'flex', flexDirection: 'column', gap: 8, height: '100%', alignItems: 'center', paddingTop: 30}}>
                        {classesArr.map(cls => {
                            return (
                                <View key={cls.id} style={{ width: '90%', height: 'auto', backgroundColor: 'lightgrey', display: 'flex', flexDirection: 'column', gap: 10, padding: 8, borderColor: 'grey', borderWidth: 1, borderRadius: 8 }}>
                                    <Text style={{ fontSize: 23, fontWeight: '800' }}>{cls.heading}</Text>
                                    
                                    <Text style={{ fontSize: 18, fontWeight: '600' }}>{cls.desc.length > 50 ? `${cls.desc.substring(0, 50)}...` : cls.desc}</Text>
                                    
                                    <View style={{ paddingTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        
                                        <Chip icon={cls.accomplished ? 'check' : 'cancel'} selected={cls.accomplished} selectedColor={cls.accomplished ? 'green' : 'red'} onPress={() => markDone(cls.id)}>done</Chip>
                                        
                                        <Chip icon={cls.reminder ? 'bell-check' : 'bell-cancel-outline'} disabled={cls.accomplished} onPress={() => toggleReminder(cls.id)}>{ }</Chip>

                                    </View>
                                    <Text style={{fontSize: 13, fontWeight: '700'}}>{`📅 ${cls.date.toDateString()}`} | { timeOf(cls.date) } - { timeOf(cls.endeDate) }</Text>
                            </View>
                        )
                        })}
                        </View>
            </ScrollView>)
            }
    </View>
    </>
  )
}

export default UpcomingClasses