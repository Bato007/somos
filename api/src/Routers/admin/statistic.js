const express = require('express')
const { cViews, cResources, cUsers } = require('../../DataBase/firebase')

const router = express.Router()


/**
 * Devuelve a todos los recursos en funcion de las vistas
 */
router.get('/', async (req, res) => {
    try{
        const tempResources = await cResources.get()
        const resViewed = []
        tempResources.forEach((auxResource) =>{
            const data = auxResource.data()
            let { resource,views } = data
            resViewed.push({ resource, views })
        })
        res.status(200).json(resViewed)
    } catch (error) {
        res.status(400).json({ message: 'Unexpected' })
    }
})


/**
 * Devuelve a todos los paises en funcion de las vistas
 * 
 */

 router.get('/countries', async (req, res) => {
    try{
        const tempViews = await cViews.get()
        const views = []
        const countries = []
        tempViews.forEach((viewID) =>{
            let username = viewID.user
            const aux = cUsers.where('user', '==', username).get()
            aux.forEach((userID) =>{
                if (!countries.includes(userID.residence)) {
                    countries.push(userID.residence)
                    views.push({
                    country: userID.residence,
                    views: 1
                    })
                } else {
                    objIndex = views.findIndex((obj => obj.country == userID.residence))
                    views[objIndex].views += 1
                }
            })
        })
        res.status(200).json(views)
    } catch (error) {
        res.status(400).json({ message: 'Unexpected' })
    }
})


module.exports = router
