const authenticate = async (url, body, onSuccess, onFailure) => {
    try {
        const promise = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // console.log("Promise:", promise)

        const authToken = promise.headers.get("Authorization")

        if (authToken) document.cookie = `x-auth-token=${authToken}`

        const response = await promise.json()
        // console.log("Response", response)

        if (response.username && authToken) {
            onSuccess({
                username: response.username,
                id: response._id
            })
        } else {
            onFailure(response.error)
        }
    } catch (error) {
        // Server or connection down
        onFailure(['Connection to server failed'])
    }
}

export default authenticate