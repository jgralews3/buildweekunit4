const server = require('../server')
const db = require('../config')
const { intersect } = require('../config')
const supertest = require('supertest')

let token;

beforeAll((done) => {
    supertest(server)
        .post('/api/users/login').send({username:"jesttest", password: "test"})
        .end((err, res) => {
            token = res.body.token;
            done();
        })
})

describe('plant tests', ()=>{
    it ('tests the test', ()=> {
        expect(2+2).toBe(4)
    })

    it('gets plant list', ()=> {
        return supertest(server).get('/api/plants').set('Authorization', `Bearer ${token}`)
            .then((res) => {
                console.log(res.body)
                expect(res.body.length).toBeGreaterThan(1)
            })
    })
})