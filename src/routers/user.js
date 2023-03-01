const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send({error:"be sure to add correct email and password with min 7 char."})
    }
})



router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        console.log('the user',user);
        const token = await user.generateAuthToken()

        res.status(200).send({ user, token })
    } catch (e) {
        console.log(e);
        res.status(400).send({error:"the email or password is wrong"})
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send('logout successfully')
    } catch (e) {
        res.status(500).send()
    }
})







module.exports = router