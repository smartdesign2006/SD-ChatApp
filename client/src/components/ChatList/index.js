import React, { useContext } from 'react'
import "./index.css"
import { MessagesContext } from '../../context/MessagesContext'

import CloseButton from '../Buttons/CloseButton'

const ChatList = () => {
    const context = useContext(MessagesContext)

    function handleClick(item, isGroup) {
        context.changeWindow(item, isGroup)
        // if group fetch userlist and messages from server and set state for first request complete
        // if chat fetch chat messages from server and set state for first request complete
    }
    return (
        <aside className="chat-sidebar">
            <div>
                <h2>GROUPS</h2>
                <ul>
                    {context.groups.map((item, i) => {
                        return (
                            <li key={`group${i}`}
                                className={`
                                        ${item === context.activeWindow ? "selected" : ""} 
                                        ${(context.newMessages[item] && item !== context.activeWindow) ? 'new-messages' : ''}
                                        `}
                                onClick={() => handleClick(item, item !== "STATUS")}>
                                <span>{item}</span>
                                <CloseButton name="X" type="group" item={item}/>
                            </li>
                        )
                    })}
                </ul>
                <h2>CHATS</h2>
                <ul>
                    {context.chats.map((item, i) => {
                        return (
                            <li key={`chat${i}`}
                                className={`
                                    ${item === context.activeWindow ? "selected" : ""}
                                    ${context.newMessages[item] && item !== context.activeWindow ? 'new-messages' : ''}
                                    `}
                                onClick={() => handleClick(item, false)}>
                                <span>{item}</span>
                                <CloseButton name="X" type="chat" item={item}/>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </aside>
    )
}

export default ChatList
