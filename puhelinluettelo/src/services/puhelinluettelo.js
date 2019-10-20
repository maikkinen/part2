import axios from 'axios'  
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    const persons = request.then(response => response.data)
    return persons
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    const updatedPerson = request.then(response => response.data)
    return updatedPerson
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, update, deletePerson }