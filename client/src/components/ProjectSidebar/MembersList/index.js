import { useContext } from 'react'
import styles from './index.module.css'
import Member from '../Member'
import { MessagesContext } from '../../../context/MessagesContext'

const MembersList = () => {
    const { userData } = useContext(MessagesContext)

    let owner = userData.sites[userData.activeSite].creator
    let members = userData.sites[userData.activeSite].groups[userData.activeGroup].members.sort((a, b) => {
        // SORT: owner on top, then online members alphabetical, then offline members alphabetical
        let A = userData.associatedUsers[a]
        let B = userData.associatedUsers[b]
        return (b === owner) - (a === owner) || B.online - A.online || A.name.localeCompare(B.name)
    })
    let membersCount = members.length

    return (
        <div className={styles.container}>
            <div className={styles.header}>{membersCount} MEMBER{membersCount > 1 && 'S'}</div>
            <ul>
                {members.map(member => {
                    return (
                    <li key={member}>
                        <Member
                            name={userData.associatedUsers[member].name}
                            id={member}
                            picturePath={userData.associatedUsers[member].picture}
                            isOnline={userData.associatedUsers[member].online}
                        />
                    </li>
                )})}
            </ul>
        </div>
    )
}

export default MembersList
