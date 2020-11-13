const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('./users-model')
const {restrict} = require('../middleware')

router.get('/', async(req, res, next) => {
    try {
        const users = await Users.find()
        return res.status(201).json(users)
    } catch(err){
        next(err)
    }
})

router.get('/:id', async(req, res, next) => {
    try{
        const user = await Users.findById(req.params.id)
        if(!user){return res.status(404).json({message: "No user with given ID exists"})}
        return res.status(201).json(user)
    } catch(err) {
        next(err)
    }
})

router.post('/register', async (req, res, next) => {
  try {
    const {username, password, phoneNumber} = req.body
    if(!username){return res.status(401).json({message: "Please input username"})}
    if(!password){return res.status(401).json({message: "Please input password"})}
    if(!phoneNumber || phoneNumber.length !== 10){return res.status(401).json({message: "Please input valid 10 digit phone number"})}
    const user = await Users.findBy({username}).first()
    if (user){return res.status(409).json({message: "Username already taken"})}
    const newUser = await Users.add({username, password: await bcrypt.hash(password, 14), phoneNumber})
    return res.status(201).json(newUser)
  } catch(err) {
    console.log('Error from BackEnd')
    return res.status(404).json({message: "Error from backend ", err})
  }
});

router.post('/login', async (req, res, next) => {
  try{
    const {username, password} = req.body
    const user = await Users.findBy({username}).first()
    if (!user) {return res.status(401).json({message: "Invalid Credentials"})}
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid){return res.status(409).json({message: "Invalid Credentials"})}
    const token = jwt.sign({userId: user.id, username: user.username}, "process.env.JWT_SECRET")
    res.cookie('token', token)
    res.json({message: `Welcome ${user.username}!`, token})
  } catch(err) {
      next(err)
  }
});

router.put('/:id', restrict(), async(req, res, next) => {
    try{
        const user = await req.body
        if(user.password){user.password = await bcrypt.hash(user.password, 14)}
        const updater = await Users.findById(req.params.id)
        if (user){Users.update(user, req.params.id).then(updatedUser => {res.status(200).json({message:"Update Successful"})})}
    } catch(err) {
        next(err)
    }
})

module.exports = router;
