const express = require('express')
const {
  getAllUsers,
  desactivateUser,
  activateUser,
  deleteUser,
} = require('../Controller/user')

const router = express.Router()

/**
 * Devuelve a todos los usuarios
 */
router.get('', async (req, res) => getAllUsers(req, res))

/*
  Esta funcion recibe un Json con el siguiente formato:
  {
    username: 'ejemplo',
  }
*/
router.put('/desactivate', async (req, res) => desactivateUser(req, res))

/*
  Esta funcion recibe un Json con el siguiente formato:
  {
    username: 'ejemplo',
  }
*/
router.put('/activate', async (req, res) => activateUser(req, res))

/*
  Esta funcion recibe el username de la que se quiere borrar
  se remplaza el :username
*/
router.delete('/:username', async (req, res) => deleteUser(req, res))

module.exports = router
