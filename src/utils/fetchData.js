const {VITE_DB_HOST} = import.meta.env

async function fetchData(endpoint, body) {
    try {
        const response = await fetch(`http://${VITE_DB_HOST}${endpoint}`,{
            method: body? 'POST' : 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: body? JSON.stringify(body) : null
        })
        const data = await response.json()
        return data
    }catch(error) {
        console.log(error)
    }
}

export default fetchData