const supertest = require('supertest')
const server = require('../server')
const db = require('../config')
const { intersect } = require('../config')

describe('user tests', ()=>{
    it ('tests the test', ()=> {
        expect(2+2).toBe(4)
    })

    it ('gets user list', async () => {
        const res = await supertest(server).get('/api/users')
        expect(res.body.length).toBeGreaterThan(1)
    })

    it ('gets user by id', async ()=> {
        const res = await supertest(server).get('/api/users/1')
        expect(res.body.username).toBe('test')
        expect(res.body.phoneNumber).toBe(2199890258)
    })

    // it ('registers new user', async ()=> {
    //     const res = await supertest(server).post('/api/users/register').send({username: "jesttest", phoneNumber: "1231234123", password: "test"})
    //     expect(res.statusCode).toBe(201)
    // })

    // it ('logs in', async () => {
    //     const res = await supertest(server).post('/api/users/login').send({username: "jesttest", password: "test"})
    //     expect(res.body.token).toBeDefined()
    // })
})