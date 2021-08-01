import axios from 'axios'

// const baseUrl = "http://localhost:3001/api/persons"
const baseUrl = "/api/persons"

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const del = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

const update = (note) => {
    return axios.put(`${baseUrl}/${note.id}`, note).then(response => response.data)
}

export default {getAll, create, del, update}
