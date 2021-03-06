import styles from './index.module.css'
import { useContext } from 'react'
import { MessagesContext } from '../../../context/MessagesContext'
import { SocketContext } from '../../../context/SocketContext'
import MenuButton from '../../Buttons/MenuButton'


const PendingProjects = () => {
    const { userData, dispatchUserData } = useContext(MessagesContext)
    const { socket } = useContext(SocketContext)

    function acceptInvitation(sid) {
        socket.emit('accept-invitation', sid, (success, socketData) => {
            if (success) {
                dispatchUserData({ type: 'invitation-accepted', payload: { socketData, activeConnection: true } })
            }
        })
    }

    function rejectInvitation(sid) {
        socket.emit('reject-invitation', sid, () => {
            // dispatchUserData({ type: 'reject-invitation', payload: { invitation } })
        })
    }

    function showInvitationInfo(site) {
        console.log(site)
    }

    function cancelRequest(sid) {
        socket.emit('cancel-request', sid, () => {
            // dispatchUserData({ type: 'cancel-request', payload: { request } })
        })
    }

    function showRequestInfo(site) {
        console.log(site)
    }

    // if (!userData.invitations && !userData.requests) return null

    return (
        <div>
            {userData.invitations && userData.invitations.length > 0 && (
                <div>
                    <h3>Invitations</h3>
                    <small>A list of projects you have been invited to join</small><br />
                    <small>You must accept an invitation to become part of the project</small>
                    <ul className={styles.invitations}>
                        {userData.invitations.map(site => {
                            return (
                                <li className={styles.row} key={site._id}>
                                    <span className={styles.name}>{site.name}</span>
                                    <div className={styles.buttons}>
                                        <MenuButton 
                                            onClick={() => acceptInvitation(site._id)} 
                                            title='Accept'
                                            btnType='submit'
                                            btnSize='small'
                                            icon='accept'
                                        />
                                        <MenuButton 
                                            onClick={() => rejectInvitation(site._id)} 
                                            title='Reject'
                                            btnType='cancel'
                                            btnSize='small'
                                            icon='cancel'
                                            style={{ marginLeft: '0.5rem' }} 
                                        />
                                        <MenuButton 
                                            onClick={() => showInvitationInfo(site._id)} 
                                            title='Info' 
                                            icon='info'
                                            btnSize='small'
                                            style={{ marginLeft: '0.5rem' }}
                                        />
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}

            {userData.requests && userData.requests.length > 0 && (
                <div>
                    <h3>Requests</h3>
                    <small>A list of projects for which you have sent a request to join</small><br />
                    <small>Project administrator must accept your request for you to become a member</small>
                    <ul>
                        {userData.requests.map(site => {
                            return (
                                <li className={styles.row} key={site._id}>
                                    <span>{site.name}</span>
                                    <div className={styles.buttons}>
                                        <MenuButton 
                                            onClick={() => cancelRequest(site._id)} 
                                            title='Cancel'
                                            btnType='cancel'
                                            btnSize='small'
                                            icon='cancel'
                                        />
                                        <MenuButton 
                                            onClick={() => showRequestInfo(site._id)} 
                                            title='Info'
                                            icon='info'
                                            btnSize='small'
                                            style={{ marginLeft: '0.5rem' }} 
                                        />
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default PendingProjects
