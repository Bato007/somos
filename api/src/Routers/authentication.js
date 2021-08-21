const express = require('express')
const { signIn, signUp } = require('../Controller/user')

const router = express.Router()

/*
  Esta funcion recibe un Json con el siguiente formato:
  {
    username: 'ejemplo',
    password: 'ejemplo'
  }
  Al recibirlo verifica si esta en la base de datos si no esta
  manda manda ERROR 101 y si las contraseñas no coinciden manda
  ERROR 102 la siguiente manera:
  {
    username: 'ERROR 102',
    name: '',
    isSOMOS: false,
    somoskey: '',
  }
  Si no hay errores entonces manda la información con el mismo formato.
*/
router.post('/signin', async (req, res) => signIn(req, res))

/*
  Esta funcion recibe un Json con el siguiente formato:
  {
    username: 'ejemplo',
    password: 'ejemplo',
    confirm: 'ejemplo',
    email: 'ejemplo',
    name: 'ejemplo',
    phone: 01234567
    workplace: 'ejemplo',
    residence: 'ejemplo',
    church: 'ejemplo',
    categories: ['categoria1', 'categoria2', ..., 'categorian']
  }
  Si el usuario ya existe manda ERROR 103
  Si las contraseñas no coinciden ERROR 104
  Si el email, name, phone, workplace o residence son null
  entonces tira ERROR 105 o ERROR 106 o ERROR 107 o ERROR 108
  o ERROR 109 respectivamente.
  Si alguna categoria no existe da ERROR 110

  El sistema responde de la siguiente manera:
  {
    status: 'ERROR 103'
  }
  Si no hay errores entonces manda la información con el mismo formato
  con la palabra DONE
*/
router.post('/admin/signup', async (req, res) => signUp(req, res))

module.exports = router
