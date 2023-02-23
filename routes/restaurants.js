const express = require("express")
const router = express.Router()
const {Restaurant} = require("../models/index")
const {check, validationResult} = require('express-validator')

router.use(express.json())

//get all
router.get('/', async (req, res) => {
    const getRestaurants = await Restaurant.findAll()
    res.json(getRestaurants)
})

//get specific
router.get('/:id', async (req, res) => {
    const getSpecific = await Restaurant.findByPk(req.params.id)
    res.json(getSpecific)
})

//create
router.post('/', [
    check("name").not().isEmpty().trim().isLength({min: 10, max: 30}),
    check("location").not().isEmpty().trim().isLength({min: 10, max: 30}),
    check("cuisine").not().isEmpty().trim().isLength({min: 10, max: 30}),

], async (req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.send({error: errors.array()})
    } else {
        await Restaurant.create(req.body)
        res.send(await Restaurant.findAll())
    }
})

//update
router.put('/:id', async (req, res) => {
    await Restaurant.update(req.body, {where: {id: req.params.id}})
    res.send(await Restaurant.findAll())
})

//delete
router.delete('/:id', async (req, res) => {
    await Restaurant.destroy({where: {id: req.params.id}})
    res.send(await Restaurant.findAll())
})

module.exports = router