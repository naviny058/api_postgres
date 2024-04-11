const Pool = require('pg').Pool

const pool = new Pool({
    user: 'chaiaurcode',
    host: 'localhost',
    database: 'api',
    password: 'chaiaurcode',
    port: 5432,
})

const getUsers = (req, res) => {
    pool.query("SELECT * FROM users", (error, results) => {
        if (error) {
            console.log('error ❌', error.message)
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const createUser = (request, respond) => {
    const { name, email } = request.body

    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
        if (error) {
            throw err
        }
        console.log(results)
        respond.status(201).send(`User added with id:${results.insertId}`)
    })
}

const deleteUser = (req, res) => {
    const { id } = req.params; // Assuming id is provided as a parameter in the request
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.rowCount === 0) {
            // No user was deleted, likely because the user with the given id doesn't exist
            res.status(404).json({ error: 'User not found' });
            return;
        }
        // User successfully deleted
        res.status(200).json({ message: 'User deleted successfully' });
    });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUser
}