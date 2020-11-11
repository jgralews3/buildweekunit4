const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Plants = require('./plants-model')
const {restrict} = require('../middleware')

router.get('/', restrict(), async(req, res, next) => {
    try {
        const plants = await Plants.find()
        return res.status(201).json(plants)
    } catch(err){
        next(err)
    }
})

router.get('/:id', restrict(), async(req, res, next) => {
    try {
        const plant = await Plants.findById(req.params.id)
        if(!plant) {return res.status(404).json({message: "No plant with given ID exists"})}
        return res.status(201).json(plant)
    } catch(err) {
        next(err)
    }
})

router.post('/', restrict(), async(req, res, next) => {
    try {
        const {nickname, species, h2oFrequency} = req.body
        if(!nickname){return res.status(400).json({message: "Please input nickname"})}
        if(!species){return res.status(400).json({message: "Please input species"})}
        if(!h2oFrequency){return res.status(400).json({message: "Please input watering frequency"})}
        const plant = await Plants.findBy({nickname}).first()
        if (plant) {return res.status(400).json({message: "Plant with that nickname already exists"})}
        const newPlant = await Plants.add({nickname, species, h2oFrequency})
        return res.status(201).json(newPlant)
    } catch(err) {
        next(err)
    }
})

router.put('/:id', restrict(), async(req, res, next) => {
    try{
        const plant = await req.body
        const updater = await Plants.findById(req.params.id)
        if (plant){Plants.update(plant, req.params.id).then(updatedPlant => {res.status(200).json({message:"Update Successful"})})}
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', restrict(), async(req, res, next) => {
    try{
        const plant = await Plants.findById(req.params.id)
        if(!plant) {res.status(400).json({message: "No plant with given ID exists"})}
        if (plant) {Plants.remove(req.params.id).then(res.status(201).json({message: "Plant has been deleted"}))}
    } catch(err) {
        next(err)
    }
})


module.exports = router;
