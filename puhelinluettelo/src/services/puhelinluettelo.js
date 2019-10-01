import axios from 'axios'  
const baseUrl = 'http://localhost:3001/persons'

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


export default { getAll, create, update }