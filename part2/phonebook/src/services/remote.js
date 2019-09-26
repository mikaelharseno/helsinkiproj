import axios from 'axios'

let baseURL = 'http://localhost:3001/persons'

const postPerson = (newPerson) => {
	return axios.post(baseURL, newPerson)
}

const getPersons = () => {
	return axios.get(baseURL)
}

const deletePerson = (personId) => {
	return axios.delete(baseURL + '/' + personId)
}

const putPerson = (personId, newPerson) => {
	return axios.put(baseURL + '/' + personId, newPerson)
}

export default { postPerson, getPersons, deletePerson, putPerson }