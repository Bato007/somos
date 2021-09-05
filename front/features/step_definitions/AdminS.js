/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('assert')

let email
let phone
let restricted
let manage
let first

Given('El usuario no este en la lista negra {string} y {int}', function (mail, num) {
  email = mail
  phone = num
})

When('El usuario le da submit', function () {
  if (email !== '' && phone !== 0) {
    console.log(email, 'cumple ambos')
    restricted = 'restringido'
  } else if (email !== '' && phone === 0) {
    console.log(email, 'cumple email')
    restricted = 'restringido'
  } else if (email === '' && phone !== 0) {
    console.log(phone, 'cumple telefono')
    restricted = 'restringido'
  } else {
    console.log('No cumple')
    restricted = 'irrestricto'
  }
})

Then('Debe ser tratado por medio del {string}', function (validacion) {
  assert.strictEqual(restricted, validacion)
})

Given('Un usuario ha subido un recurso', function () {
  console.log('recurso subido')
})

When('El administrador {string} el anuncio', function (maneja) {
  if (maneja === 'acepta') {
    manage = 'si'
  } else {
    manage = 'no'
  }
})

Then('El anuncio {string} se muestra en pantalla', function (result) {
  assert.strictEqual(manage, result)
})

Given('Hay multiples anuncios aceptados', function () {
  console.log('Multiples anuncios')
})

When('Hay uno con {string} y otro con {string}', function (date1, date2) {
  const arrDate1 = date1.split('-')
  const arrDate2 = date2.split('-')
  const dateOne = new Date(arrDate1[0], arrDate1[1], arrDate1[2])
  const dateTwo = new Date(arrDate2[0], arrDate2[1], arrDate2[2])
  if (dateOne > dateTwo) {
    first = 2
  } else {
    first = 1
  }
})

Then('{int} se muestra como primer anuncio', function (result) {
  assert.strictEqual(first, result)
})
