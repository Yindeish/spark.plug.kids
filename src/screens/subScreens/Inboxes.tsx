import { useState } from 'react';
import { Text, Avatar } from 'react-native-paper';
import { View, ScrollView } from 'react-native';

let id: number = 0;
// Types
interface Inbox {
    id: number,
    heading: string,
    desc: string,
    userAvatar: string,
    date: Date,
    senderId: number,
}

const Inbox = () => {
    
    let inboxes: Inbox[] = [
        {
            id: id++,
            heading: 'I need to see you in person',
            desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit, molestias.',
            userAvatar: 'parent.gif',
            date: new Date(),
            senderId: id+=2
        }
    ];

    let [inboxesArr, setInboxesArr] = useState(inboxes);

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

    const displayDate = (date: Date):string => {
        return '5:50 PM';
    }

    const getSenderName = (Id: number): string => {
        return 'Maria'
    }

    return (
    <View>
        
        <Text style={{ fontSize: 25, fontWeight: '900', paddingTop: 5, paddingBottom: 10, width: '90%', marginLeft: 'auto', marginRight: 'auto'}}>
            { inboxesArr.length == 1 ? 'Inbox' : 'Inboxes' }</Text>

        {inboxesArr.length <= 0 ?
        (<View style={{
        width: '100%', height: 150, marginTop: 50, display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between'
        }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: 'red', paddingTop: 10, paddingBottom: 10, textAlign: 'center' }}>No Inboxes 🔕</Text>
            
        </View>)
            :
        (<ScrollView style={{ width: '100%', height: '100%' }}>
            <View style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8, height: '100%', alignItems: 'center', paddingTop: 30 }}>
                {inboxesArr.map(inbox => {
                    return (
                        <View key={inbox.id} style={{ width: '90%', height: 'auto', backgroundColor: 'lightgrey', display: 'flex', flexDirection: 'row', padding: 8, borderColor: 'grey', borderWidth: 1, borderRadius: 8, justifyContent: 'space-between' }}>

                            <View>
                                <Avatar.Image size={40} source={require('../../../assets/avatar.jpg')} />
                            </View>

                            <View style={{display: 'flex', flexDirection: 'column', gap: 8,}}>
                                <Text style={{ fontSize: 20, fontWeight: '800' }}>{getSenderName(inbox.senderId)}</Text>

                                <Text style={{ fontSize: 18, fontWeight: '800' }}>{inbox.heading}</Text>
                                    
                                <Text style={{ fontSize: 13, fontWeight: '600' }}>{inbox.desc.length > 50 ? `${inbox.desc.substring(0, 50)}...` : inbox.desc}</Text>
                            </View>

                            <Text style={{fontSize: 8, fontWeight: '700'}}>{ displayDate(inbox.date) }</Text>
                        </View>
                    )
                }) }
        </View>
        </ScrollView>)}
    </View>
  )
}

export default Inbox