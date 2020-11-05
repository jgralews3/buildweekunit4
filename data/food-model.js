const db = require('../config')

function find() {
    return db('food')
}

function findById(id) {
    return db('food').where({id}).first()
}

async function create(data) {
    const [id] = await db('food').insert(data)
    return findById(id)
}

async function update(id, data) {
    await db('food').where({id}).update(data)
    return findById(id)
}

function remove(id) {
    return db('food').where({id}).delete()
}

module.exports = {find, findById, create, update, remove}