/*
    // Messages from server or system
    // Server: (joins, leaves, quits, chats)
    // If chat than Server will send actual sender if chat message, the message and the group where message is sent
    // msg {
        sender: user
        msg: 'actual message from user'
        group: 'actual group where user sent the message'
    }
    // If join server will send join-message to group
    // msg {
        sender: "SERVER"
        group: group
        msg: "User joined group"
    }
    
    // System (on disconnect, reconnecting and reconnect)
    // Not saved in DB 
    msg {
        sender: "SYSTEM"
        group: "status"
        msg: "based on event"
    }
    
    //Messages State for UX
    
    messages {
        status: [
            {msg}, {msg} ...
        ]
        group-name1: [
            {msg}, {msg}, ...
        ],
        group-name2: [
            {msg}, {msg}, ...
        ],
        chat-name1: [
            {msg}, {msg}, ...
        ],
        chat-name2: [
            {msg}, {msg}, ...
        ],
    }
*/
import React, { useState } from 'react'

export const MessagesContext = React.createContext()

export default function MessagesContextProvider(props) {

    const dummyUsersState = {
        "Cyperaceae": {
            online: ['user1', 'user2'],
            offline: ['user3']
        },
        "Jamia": {
            online: ['user4'],
            offline: ['user6']
        }
    }

    const [users, setUsers] = useState(dummyUsersState)
    const [groups, setGroups] = useState(["STATUS"])
    const [chats, setChats] = useState([])
    const [messages, setMessages] = useState({ "STATUS": [] })
    const [activeWindow, setActiveWindow] = useState("STATUS")
    const [windowIsGroup, setwindowIsGroup] = useState(false)

    function updateGroups(groups) {
        setGroups(prevGroups => ([...prevGroups, ...groups]))
    }

    function updateMessages({ user, msg, group }) {
        setMessages(prevMessages => ({
            ...prevMessages,
            [group]: [
                ...prevMessages[group] || [],
                { user, msg, time: new Date().toLocaleTimeString() }
            ]
        }))
    }

    function changeWindow(selectedWindow, isGroup) {
        setActiveWindow(selectedWindow)
        setwindowIsGroup(isGroup)
    }

    return (
        <MessagesContext.Provider value={{
            groups, setGroups, updateGroups,
            users, setUsers,
            chats, setChats,
            messages, updateMessages,
            activeWindow, changeWindow,
            windowIsGroup
        }}>
            {props.children}
        </MessagesContext.Provider>
    )
}