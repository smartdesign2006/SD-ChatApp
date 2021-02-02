import React from 'react'
import styles from './index.module.css'
import Avatar from 'react-avatar'

const NewMessage = ({ message }) => {

    function getTime(timestamp) {
        return new Date(timestamp).toTimeString().split(':', 2).join(':')
    }
    
    return (
        <div className={styles['new-message']}>
            <div className={styles['info']}>
                <div className={styles['avatar']} >
                    <Avatar size={32} />
                </div>
            </div>
            <div className={styles['text-box']}>
                <div className={styles['name']}>
                    {message.user}
                </div>
                <div className={styles['time']}>
                    {getTime(message.timestamp)}
                </div>
                <div className={styles['message']}>
                    {message.msg}
                </div>
            </div>
        </div>

    )
}

export default NewMessage
