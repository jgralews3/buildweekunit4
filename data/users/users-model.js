const db = require('../../config')

async function add(user) {
    const [id] = await db('users').insert(user)
    return findById(id)
}

function find() {
    return db('users').select('id', 'username', 'phoneNumber')
}

function findBy(filter) {
    return db('users').where(filter).select('id', 'username', 'password')
}

function findById(id) {
    return db('users').where('id', id).first()
}

function update(changes, id) {
    return db('users').where('id', id).update(changes)
}

module.exports = {find, findBy, findById, add, update}