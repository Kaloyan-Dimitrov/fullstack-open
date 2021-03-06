import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = idToDelete => {
    const request = axios.delete(`${baseUrl}/${idToDelete}`)
    return request
}

const update = updateObject => {
    const request = axios.put(`${baseUrl}/${updateObject.id}`, updateObject)
    return request.then(response => response.data)
}

const personsService = {
    getAll,
    create,
    deletePerson,
    update
}

export default personsService