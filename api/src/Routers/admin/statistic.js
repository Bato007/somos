const express = require('express')
const { cResources, cViews, cUsers } = require('../../DataBase/firebase')

const router = express.Router()


/**
 * Devuelve a todos los recursos en funcion de las vistas
 */
router.get('/', async (req, res) => {
    try{
        const tempViews = await cViews.get()
        const views = []
        const resources = []
        tempViews.forEach((viewID) =>{
            if (!resources.includes(viewID.resource)) {
                resources.push(viewID.resource)
                views.push({
                resource: viewID.resource,
                views: 1
                })
            } else {
                objIndex = views.findIndex((obj => obj.resource == viewID.resource))
                views[objIndex].views += 1
            }
        })
        res.status(200).json(views)
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

        /**const tempViews = await cViews.get()
         * const tempUsers = await cUsers.get()
         *
         * const views = []
         * tempViews.forEach((viewID)=>{
         *  const viewData = viewID.data()
         *  let { resource } = viewData
         *  
         *  
         *  
         * })
         */
        const countries = []
        res.status(200).json(countries)
    } catch (error) {
        res.status(400).json({ message: 'Unexpected' })
    }
})


module.exports = router