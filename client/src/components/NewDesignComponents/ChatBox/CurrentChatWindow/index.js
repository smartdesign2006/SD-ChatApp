import React, { useEffect, useContext, useRef, useState } from 'react'
import styles from './index.module.css'
import ChatTitle from './ChatTitle/'
import UserNav from './UserNav/'
import NewMessage from './NewMessage/'
import DevLine from './DevLine/'
import SendMessageBox from './SendMessageBox'
import Profile from './Profile'

import { MessagesContext } from '../../../../context/MessagesContext'

const CurrentChatWindow = (props) => {

    const { userData } = useContext(MessagesContext)
    const messagesRef = useRef()

    useEffect(() => messagesRef.current.scrollTop = messagesRef.current.scrollHeight)

    if (!userData) return (
        <div className={styles['current-chat-window']}>
            <ChatTitle title={props.title} />
            <div ref={messagesRef} className={styles['message-box']}>
                Loading messages....
            </div>
        </div>
    )

    let messages, title, msgBox = true
    if (userData.activeChat) {
        messages = userData.chats[userData.activeChat].messages
        title = `@${userData.chats[userData.activeChat].username}`
    } else if (userData.activeSite) {
        let project = userData.sites[userData.activeSite].name
        let group = userData.sites[userData.activeSite].groups[userData.activeGroup].name
        messages = userData.sites[userData.activeSite].groups[userData.activeGroup].messages
        title = `#${group} (${project})`
    } else {
        messages = [{
            user: "SERVER",
            msg: [`Welcome to SmartChat Network ${userData.personal.name}.`,
            "If you don't have any membership yet, you can create your own projects or join an existing project.",
            "By the time, we suggest you complete your profile by adding some info about yourself.",
            "If skipped now, this can be done later from the settings button."
        ].join('\n'),
            timestamp: new Date().toUTCString(),
            own: false
        }]
        title = `Welcome ${userData.personal.name}`
        msgBox = false
    }

    return (
        <div className={styles['current-chat-window']}>
            <UserNav />
            <ChatTitle title={title}/>
            <div ref={messagesRef} className={styles['message-box']}>
                {messages.map(({ user, msg, timestamp, own }, i) => {
                    let thisDate = new Date(timestamp).toDateString()
                    let prevDate = i > 0 ? new Date(messages[i - 1].timestamp).toDateString() : undefined
                    return (
                        <div key={i} >
                            {thisDate !== prevDate && <DevLine date={thisDate} />}
                            <NewMessage message={{ user, msg, timestamp, own }} />
                        </div>
                    )
                })}
            </div>
            {/* {msgBox ? <SendMessageBox /> : <Profile />} */}
            {msgBox && <SendMessageBox />}
        </div>
    )
}

export default CurrentChatWindow
