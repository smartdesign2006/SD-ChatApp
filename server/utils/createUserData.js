const createUserData = (userData, messagePool) => {
    const siteCache = {}
    const clientData = {
        sites: {},
        chats: {},
        personal: {
            _id: userData._id,
            name: userData.name,
            email: userData.email,
            mobile: userData.mobile,
            username: userData.username,
            company: userData.company,
            position: userData.position,
            picture: userData.picture
        },
        associatedUsers: {
            [userData._id]: {
                username: userData.username,
                name: userData.name,
                picture: userData.picture,
                online: true
            }
        }
    }
    if (userData.invitations) clientData.invitations = userData.invitations
    if (userData.requests) clientData.requests = userData.requests

    userData.chats.forEach(chat => {
        clientData.associatedUsers[chat._id] = {
            username: chat.username,
            name: chat.name,
            picture: chat.picture,
            online: false
        }
    })

    userData.groups.forEach(({ _id, name, site, members }) => {
        let groupMembers = []
        members.map(member => {
            groupMembers.push(member._id)
            if (!clientData.associatedUsers[member._id]) {
                clientData.associatedUsers[member._id] = {
                    username: member.username,
                    name: member.name,
                    picture: member.picture,
                    online: false
                }
            }
        })
        siteCache[_id] = site._id
        if (!clientData.sites[site._id]) {
            clientData.sites[site._id] = {
                name: site.name,
                creator: site.creator,
                groups: {}
            }
            if (site.creator.toString() === userData._id.toString()) {
                clientData.sites[site._id].invitations = []
                clientData.sites[site._id].requests = []
                site.invitations.map(invitation => {
                    clientData.sites[site._id].invitations.push(invitation._id)
                    if (!clientData.associatedUsers[invitation._id]) {
                        clientData.associatedUsers[invitation._id] = {
                            username: invitation.username,
                            name: invitation.name,
                            picture: invitation.picture,
                            online: false
                        }
                    }
                })
                site.requests.map(request => {
                    clientData.sites[site._id].requests.push(request._id)
                    if (!clientData.associatedUsers[request._id]) {
                        clientData.associatedUsers[request._id] = {
                            username: request.username,
                            name: request.name,
                            picture: request.picture,
                            online: false
                        }
                    }
                })
            }
        }
        clientData.sites[site._id].groups[_id] = {
            name,
            members: groupMembers,
            messages: []
        }
    })

    messagePool.forEach(msg => {
        let own = msg.source._id.toString() === userData._id.toString() // boolean
        switch (msg.onModel) {
            case "User":
                // determine who is the other party in conversation
                let partyID = own ? msg.destination._id.toString() : msg.source._id.toString()
                let partyName = own ? msg.destination.name : msg.source.name
                if (!clientData.chats[partyID]) {
                    clientData.chats[partyID] = {
                        username: partyName,
                        messages: []
                    }
                }
                clientData.chats[partyID].messages.push({
                    user: msg.source.name,
                    // added because username is unique, could be replaced by id
                    // purpose is to map profile pics to user who created message
                    username: msg.source.username,
                    msg: msg.content,
                    timestamp: msg.createdAt,
                    own
                })
                break;

            case "Group":
                clientData.sites[siteCache[msg.destination._id]].groups[msg.destination._id].messages.push({
                    user: msg.source.name,
                    // added because username is unique, could be replaced by id
                    // purpose is to map profile pics to user who created message
                    username: msg.source.username,
                    msg: msg.content,
                    timestamp: msg.createdAt,
                    own
                })
                break;

            default:
                break;
        }
    })

    return { clientData, siteCache }
}

module.exports = createUserData