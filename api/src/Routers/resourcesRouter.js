const express = require('express')
const { cResources, cUsers } = require('../DataBase/firebase')

const router = express.Router()

/**
 * Se encarga de obtener un recurso con base a su
 * id
 * Lo que devuelve es un objeto con la informacion del
 * recurso de la siguiente manera
 * {
 *  id: 'XKJR-KJ23-JE24-JKRE',
 *  title: 'prueba',
 *  description: 'Ejemplo',
 *  availabe: '2021-01-01',
 *  type: 'pdf',
 *  url: 'ejemplo'
 *  tags: ['tag1', 'tag2', 'tag3']
 * }
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const resources = await cResources.doc(id).get()

    const resource = resources.data()
    // Ahora se regresa el recurso
    res.status(200).json(resource)
  } catch (error) {
    res.status(400).json({ message: 'No se encontro' })
  }
})

/**
 * Se encarga de obtener todos los recursos que
 * le correspondan a un usuario
 * {
 *  id: 'XKJR-KJ23-JE24-JKRE',
 *  title: 'prueba',
 *  type: 'pdf'
 * }
 */
router.get('/files/:username', async (req, res) => {
  const { username } = req.params

  try {
    const accepted = []
    // Se obtienen los recursos
    const userSnapshot = await cUsers.doc(username).get()
    const { categories } = userSnapshot.data()
    const resourcesSnapshot = await cResources.get()

    // Se verifica si son somos o no
    if (!categories.includes('somos')) {
      resourcesSnapshot.forEach((resource) => {
        // Obtenemos la data por usuario
        let added = false
        const data = resource.data()
        data.users.forEach((user) => {
          if (user === username) { // Verificando si esta el usuario
            added = true
            const { id, title, type } = data
            accepted.push({
              id,
              title,
              resource: type,
            })
          }
        })

        // Obtenemos la data por categoria
        if (!added) {
          data.categories.forEach((category) => {
            if (categories.includes(category) && !added) { // Verificando si esta el usuario
              const { id, title, type } = data
              accepted.push({
                id,
                title,
                resource: type,
              })
              added = true
            }
          })
        }
      })
    } else {
      resourcesSnapshot.forEach((resource) => {
        const { id, title, type } = resource.data()
        accepted.push({
          id,
          title,
          resource: type,
        })
      })
    }

    // Ahora se regresan los recursos
    res.statusCode = 200
    res.json(accepted)
  } catch (error) {
    res.statusCode = 404
    res.end()
  }
})

module.exports = router
