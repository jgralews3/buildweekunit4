const db = require('../../config')

async function add(plant) {
    const [id] = await db('plants').insert(plant)
    return findById(id)
}

function find() {
    return db('plants').select('id', 'nickname', 'species', 'h2oFrequency')
}

function findBy(filter) {
    return db('plants').where(filter).select('id', 'nickname')
}

function findById(id) {
    return db('plants').where('id', id).first()
}

function update(changes, id) {
    return db('plants').where('id', id).update(changes)
}

function remove(id){
    return db('plants').where('id', id).del()
}

module.exports = {find, findBy, findById, add, update, remove}