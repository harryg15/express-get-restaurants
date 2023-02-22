const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");

const port = 3000;

//TODO: Create your GET Request Route Below: 

app.use(express.json())

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})

app.get('/restaurants', async (req, res) => {
    const getRestaurants = await Restaurant.findAll()
    res.json(getRestaurants)
})

app.get('/restaurants/:id', async (req, res) => {
    const getSpecific = await Restaurant.findByPk(req.params.id)
    res.json(getSpecific)
})

//create
app.post('/restaurants', async (req, res) => {
    await Restaurant.create(req.body)
    res.send(await Restaurant.findAll())
})

//update
app.put('/restaurants/:id', async (req, res) => {
    await Restaurant.update(req.body, {where: {id: req.params.id}})
    res.send(await Restaurant.findAll())
})

//delete
app.delete('/restaurants/:id', async (req, res) => {
    await Restaurant.destroy({where: {id: req.params.id}})
    res.send(await Restaurant.findAll())
})