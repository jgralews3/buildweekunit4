const express = require("express")
const Food = require("./food-model")

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        res.status(200).json(await Food.find())
    } catch(err) {
        next(err)
    }
    
})

router.get('/:id', async(req, res, next) => {
    try {
        const id = req.params.id
        res.status(200).json(await Food.findById(id))
    } catch (err){
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const food = await Food.create(req.body)
        res.status(201).json(food)
    } catch(err) {
        next(err)
    }
})

router.put('/:id', async(req, res, next) => {
    try {
        const update = await Food.update(req.params.id, req.body)
        res.status(202).json(update)
    } catch (err){
        next(err)
    }
})

router.delete('/:id', async(req, res, next) => {
    try {
        await Food.remove(req.params.id)
        res.status(204).end()
    } catch(err) {
        next(err)
    }
})
module.exports = router