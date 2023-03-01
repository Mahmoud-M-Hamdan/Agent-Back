const express = require('express')
const Item = require('../models/item')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/items', auth, async (req, res) => {
    const item = new Item({
        ...req.body,
        owner: req.user._id
    })

    try {
        await item.save()
        res.status(201).send(item)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/item',async(req,res)=>{

  const  items = await Item.find({}) 
  console.log('here');
  console.log(items);
  res.status(200).send(items)
})



router.get('/items/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const item = await Item.findOne({ _id})

        if (!item) {
            return res.status(404).send()
        }

        res.send(item)
    } catch (e) {
        res.status(500).send()
    }
})



router.patch('/items/:id', auth, async (req, res) => {
    console.log('whyy');
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'name','price']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const item = await Item.findOne({ _id: req.params.id, owner: req.user._id})

        if (!item) {
            return res.status(404).send()
        }

        updates.forEach((update) => item[update] = req.body[update])
        await item.save()
        res.send(item)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/items/:id', auth, async (req, res) => {
    try {
        console.log('done!!');
        const item = await Item.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!item) {
            res.status(404).send()
        }

        res.send(item)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router