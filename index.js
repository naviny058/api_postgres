const express = require('express')
const bodyParser = require('body-parser')
const Pool = require('pg').Pool
const app = express()
const port = 3000
const { getUsers, getUserById, createUser, deleteUser } = require('./querires')

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', getUsers)
app.get('/users/:id', getUserById)
app.post('/users', createUser)
app.delete('/users/:id', deleteUser)

app.listen(port, () => {
    console.log(`App running on port http://localhost:${port}.`)
})