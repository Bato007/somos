const express = require('express')
const { cResources } = require('../../DataBase/firebase')

const router = express.Router()


/**
 * Devuelve a todos los recursos en funcion de las vistas
 */
router.get('/', async (req, res) => {
    try{
        const tempResources = await cResources.get()
        const resources = []
        tempResources.forEach((resource) =>{
          const data = resource.data()
          let { filename, views } = data
          filename = filename.toString()
          views = parseInt(views)
          resources.push({
             filename, 
             views 
          })
        })
        res.status(200).json(resources)
    } catch (error) {
        res.status(400).json({ message: 'Unexpected' })
    }
})


/**
 * Devuelve a todos los paises en funcion de las vistas
 * 
 * router.get('/countries', async (req, res) => {
    try{
        const countries = []
        res.status(200).json(countries)
    } catch (error) {
        res.status(400).json({ message: 'Unexpected' })
    }
})
 */


module.exports = router