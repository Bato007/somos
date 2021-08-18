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
